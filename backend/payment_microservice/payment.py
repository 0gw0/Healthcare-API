#!/usr/bin/env python3
# The above shebang (#!) operator tells Unix-like environments
# to run this file as a python3 script

import base64
import datetime
import json
import os

import jsons
import requests
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes

# import database actions
from database.db_payment import get_all_payments, request_reset_db
from database.db_payment_actions import (
    create_payment,
    delete_payment_by_id,
    get_exact_payment,
    update_payment_isPaid,
)
from flask import Flask, jsonify, redirect, render_template, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# ****************************************************************
# HELPER FUNCTIONS
# ****************************************************************


def calculate_sha256_string(input_string):
    # Create a hash object using the SHA-256 algorithm
    sha256 = hashes.Hash(hashes.SHA256(), backend=default_backend())
    # Update hash with the encoded string
    sha256.update(input_string.encode("utf-8"))
    # Return the hexadecimal representation of the hash
    return sha256.finalize().hex()


# +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
def base64_encode(input_dict):
    # Convert the dictionary to a JSON string
    json_data = jsons.dumps(input_dict)
    # Encode the JSON string to bytes
    data_bytes = json_data.encode("utf-8")
    # Perform Base64 encoding and return the result as a string
    return base64.b64encode(data_bytes).decode("utf-8")


# ****************************************************************
# END HELPER FUNCTIONS
# ****************************************************************


# Pay API with amount passed into URL (3000 means $30)
@app.route("/payment/pay/<int:amount>", methods=["GET"])
def pay(amount):
    MAINPAYLOAD = {
        "merchantId": "PGTESTPAYUAT",
        "merchantTransactionId": "MT7850590068188104",
        "merchantUserId": "MUID123",
        "amount": amount,
        "redirectUrl": "http://127.0.0.1:5007/payment/return-to-me",
        "redirectMode": "POST",
        "callbackUrl": "http://127.0.0.1:5007/payment/return-to-me",
        "paymentInstrument": {"type": "PAY_PAGE"},
    }

    INDEX = "1"
    ENDPOINT = "/pg/v1/pay"
    SALTKEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"

    base64String = base64_encode(MAINPAYLOAD)
    mainString = base64String + ENDPOINT + SALTKEY
    sha256Val = calculate_sha256_string(mainString)
    checkSum = sha256Val + "###" + INDEX

    # +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    # Payload Send
    # +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    headers = {
        "Content-Type": "application/json",
        "X-VERIFY": checkSum,
        "accept": "application/json",
    }
    json_data = {
        "request": base64String,
    }
    response = requests.post(
        "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
        headers=headers,
        json=json_data,
    )
    responseData = response.json()
    create_payment()
    # return responseData
    return redirect(responseData["data"]["instrumentResponse"]["redirectInfo"]["url"])


# Return to this page after payment
@app.route("/payment/return-to-me", methods=["GET", "POST"])
def payment_return():

    INDEX = "1"
    SALTKEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399"
    form_data = request.form
    form_data_dict = dict(form_data)
    # respond_json_data = jsonify(form_data_dict)
    # ++++++++++++++++++++++++++++++++++++++++++++++++++++++
    # 1.In the live please match the amount you get byamount you send also so that hacker can't pass static value.
    # 2.Don't take Marchent ID directly validate it with yoir Marchent ID
    # ++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if request.form.get("transactionId"):
        request_url = (
            "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/PGTESTPAYUAT/"
            + request.form.get("transactionId")
        )
        sha256_Pay_load_String = (
            "/pg/v1/status/PGTESTPAYUAT/" + request.form.get("transactionId") + SALTKEY
        )
        sha256_val = calculate_sha256_string(sha256_Pay_load_String)
        checksum = sha256_val + "###" + INDEX
        # +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        # Payload Send
        # +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        headers = {
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
            "X-MERCHANT-ID": request.form.get("transactionId"),
            "accept": "application/json",
        }
        response = requests.get(request_url, headers=headers)
    return response.json()


# Reset Database
@app.route("/payment/reset/<string:dataset>", methods=["POST"])
def reset_db(dataset):
    """
    Reset Database
    - Reset the database to its original state
    - If a dataset is provided, reset the database with the dataset

    Returns:
    - 205: Database reset
    - 400: Invalid Dataset

    Valid Datasets:
    - "empty": No dataset
    - "dataset1": Dataset 1

    Example Response:
    - {"code": 205, "message": "Database reset! No Dataset was used"}
    - {"code": 205, "data_created": [[...], [...], [...]]}
    - {"code": 400, "message": "Database was not reset. Invalid Dataset: ..."}
    """
    # (1) Reset Database
    response = request_reset_db(dataset)

    # (2) Check Response
    code = response[0]
    data = response[1]

    # (3) Return Response
    # - If data is a string, return a message
    if type(data) == str:
        return jsonify({"code": code, "message": data}), code

    # - If data is a list, return a list of users
    return jsonify({"code": code, "data_created": data}), code


# Get Payments history
@app.route("/payment/get/history", methods=["GET"])
def get_all_payments_history():
    """
    Get Payments history

    Returns:
    - 200: All payments
    - 404: No payments found

    Example Response:
    - {"code": 200, "data": [[...], [...], [...]]}
    - {"code": 404, "message": "No payments found"}
    """
    # (1) Get All Timeslots
    data = get_all_payments()

    # (2) Check Response
    if len(data):
        return jsonify({"code": 200, "data": data}), 200
    return jsonify({"code": 404, "message": "No payments found"}), 404


# Get Payment by ID
@app.route("/payment/get/<int:id>", methods=["GET"])
def get_specific_payment(id):
    """
    Get Payment by ID

    Returns:
    - 200: Exact Payment
    - 404: No payment found

    Example Response:
    - {"code": 200, "message": "Exact Payment found"}
    - {"code": 404, "message": "No payment found"}
    """
    # (1) Check Payment ID
    # - If payment does not exist, return 404
    payment = get_exact_payment({"id": id})
    if not len(payment):
        return jsonify({"code": 404, "message": "No payment found"}), 404

    # (2) Get payment by ID
    get_exact_payment({"id": id})
    return (
        jsonify({"code": 200, "message": "Exact Payment found", "payment": payment}),
        200,
    )


# Create payment
@app.route("/payment/create", methods=["POST"])
def create_payment_api():
    """
    Create payment

    Returns:
    - 201: Payment created
    - 400: Invalid POST payload
    - 400: Existing id

    Example Request Payload:
    - { "data": { "id": 999, "patient_id": 1, "doctor_id": 1, "price": 67.4, "isPaid": 0} }

    Example Response:
    - {"code": 201, "message": "Payment created", "data": [[...]]}
    - {"code": 400, "message": "Invalid POST payload"}
    - {"code": 400, "message": "Payment already exist for this id"}
    """
    # (1) Get POST payload
    try:
        data = request.get_json()["data"]
    except Exception as e:
        return jsonify({"code": 400, "message": "Invalid POST payload"}), 400

    # (2) Invalid Post Payload
    # - Missing id
    # - Missing patient_id
    # - Missing doctor_id
    # - Missing price
    # - Missing isPaid
    if (
        "id" not in data
        or "patient_id" not in data
        or "doctor_id" not in data
        or "price" not in data
        or "isPaid" not in data
    ):
        return jsonify({"code": 400, "message": "Invalid POST payload"}), 400

    # (3) Payment already exist for this id
    if len(get_exact_payment(data)):
        return (
            jsonify(
                {"code": 400, "message": "Payment already exist for this doctor_id"}
            ),
            400,
        )

    # (4) Create Payment
    create_payment(data)

    # (5) Return Success
    return (
        jsonify(
            {
                "code": 201,
                "message": "Payment created",
                "data": get_exact_payment(data),
            }
        ),
        201,
    )


# Update payment isPaid by id
@app.route("/payment/update/<int:id>", methods=["PUT"])
def update_payment_isPaid_api(id):
    """
    Update Payment isPaid by id

    Returns:
    - 200: Payment isPaid updated to 1
    - 200: Payment isPaid updated to 0
    - 400: Invalid POST payload
    - 400: Invalid isPaid Value
    - 404: No payment found

    Example Response:
    - {"code": 200, "message": "Payment isPaid updated to 1"}
    - {"code": 200, "message": "Payment isPaid updated to 0"}
    - {"code": 400, "message": "Invalid POST payload"}
    - {"code": 400, "message": "Invalid isPaid Value. Must be 0 or 1"}
    - {"code": 404, "message": "No payment found"}
    """
    # (1) Get POST payload
    try:
        data = request.get_json()["data"]
    except Exception as e:
        return jsonify({"code": 400, "message": "Invalid POST payload"}), 400

    # (2) Check isPaid Value
    # - isPaid must be 0 or 1
    if "isPaid" not in data or data["isPaid"] not in [0, 1]:
        return (
            jsonify({"code": 400, "message": "Invalid isPaid Value. Must be 0 or 1"}),
            400,
        )

    # (3) Check Payment ID
    # - If payment does not exist, return 404
    if not len(get_exact_payment({"id": id})):
        return jsonify({"code": 404, "message": "No payment found"}), 404

    # (4) Update payment isPaid by id
    data["id"] = id
    update_payment_isPaid(data)

    # (5) Return Success
    return (
        jsonify(
            {
                "code": 200,
                "message": f"Payment isPaid updated to {data['isPaid']}",
                "data": get_exact_payment({"id": id}),
            }
        ),
        200,
    )


# Delete payment by id
@app.route("/payment/delete/<int:id>", methods=["DELETE"])
def delete_timeslot_api(id):
    """
    Delete payment by id

    Returns:
    - 200: Payment deleted
    - 404: No payment found

    Example Response:
    - {"code": 200, "message": "Payment deleted"}
    - {"code": 404, "message": "No payment found"}
    """
    # (1) Check Payment ID
    # - If Payment does not exist, return 404
    deleted = get_exact_payment({"id": id})
    if not len(deleted):
        return jsonify({"code": 404, "message": "No payment found"}), 404

    # (2) Delete Payment by id
    delete_payment_by_id({"id": id})
    return (
        jsonify({"code": 200, "message": "Payment deleted", "deleted": deleted}),
        200,
    )


if __name__ == "__main__":
    print("This is flask for " + os.path.basename(__file__) + ": manage payments ...")
    app.run(host="0.0.0.0", port=5007, debug=True)
