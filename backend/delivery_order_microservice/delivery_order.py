#!/usr/bin/env python3
# The above shebang (#!) operator tells Unix-like environments
# to run this file as a python3 script

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

# import database actions
from database.db_delivery_order import request_reset_db
from database.db_delivery_order import create_delivery_order
from database.db_delivery_order import get_all_delivery_order


app = Flask(__name__)
CORS(app)


# Reset Database
@app.route("/delivery_order/reset/<string:dataset>", methods=["POST"])
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

    # - If data is a list, return a list of delivery orders
    return jsonify({"code": code, "data_created": data}), code


# Get All delivery order
@app.route("/delivery_order/get/all", methods=["GET"])
def get_all_delivery_orders_api():
    """
    Get All delivery order

    Returns:
    - 200: All delivery order
    - 404: No delivery order found

    Example Response:
    - {"code": 200, "data": [[...], [...], [...]]}
    - {"code": 404, "message": "No delivery order found"}
    """
    # (1) Get All Delivery Orders
    data = get_all_delivery_order()

    # (2) Check Response
    if len(data):
        return jsonify({"code": 200, "data": data}), 200
    return jsonify({"code": 404, "message": "No delivery order found"}), 404


# Create delivery order
@app.route("/delivery_order/create", methods=["POST"])
def create_delivery_order_api():
    """
    Create delivery order

    Returns:
    - 201: Delivery order created
    - 400: Invalid POST payload
    - 400: Data already exists

    Constraints:
    - Data format will always be correct
    - id is appointment_id AND appointment_id will always exists
    - Product will always exists inventory_microservice database
    - Others:
        - Payment must be made before delivery
        - MC must be issued while creating delivery
        - Inventory data must be synced when delivery

    Example Request Payload:
    - { "id": 1, "products": { "Amoxicillin": 5, "Levothyroxine": 10 } }

    Example Response:
    - {"code": 201, "message": "Delivery order created", "created_data": [...]}
    - {"code": 400, "message": "Invalid POST payload"}
    - {"code": 400, "message": "Delivery order already exists", "given_payload": {...}}
    """
    # (1) Get POST payload
    try:
        data = request.get_json()
    except Exception as e:
        return jsonify({"code": 400, "message": "Invalid POST payload"}), 400

    # (2) Invalid Post Payload
    # - Missing products
    if "products" not in data:
        return jsonify({"code": 400, "message": "Invalid POST payload"}), 400

    # (3) Reformat the data
    # E.g. { "id": 1, "products": { "Amoxicillin": 5, "Levothyroxine":10 } }
    # into { "id": 1, "product_list": "Amoxicillin;Levothyroxine", "quantity_list": "5;10" }
    product_list = ""
    quantity_list = ""
    for product, quantity in data["products"].items():
        product_list += product + ";"
        quantity_list += str(quantity) + ";"
    data["product_list"] = product_list[:-1]
    data["quantity_list"] = quantity_list[:-1]
    del data["products"]

    # (4) Create Delivery Order
    try:
        create_delivery_order(data)
    except Exception as e:
        # Data already exists or no inventory left
        return (
            jsonify(
                {
                    "code": 400,
                    "message": "Failed to create delivery order",
                    "given_payload": data,
                }
            ),
            400,
        )

    # (5) Return Success
    return (
        jsonify(
            {"code": 201, "message": "Delivery order created", "created_data": data}
        ),
        201,
    )


if __name__ == "__main__":
    print("This is flask for " + os.path.basename(__file__) + ": delivery order...")
    app.run(host="0.0.0.0", port=5006, debug=True)
