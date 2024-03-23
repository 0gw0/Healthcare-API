#!/usr/bin/env python3
# The above shebang (#!) operator tells Unix-like environments
# to run this file as a python3 script

import os
from flask import Flask, request, jsonify
from flask_cors import CORS

from invokes import invoke_http

app = Flask(__name__)
CORS(app)

timeslot_URL = "http://host.docker.internal:5002/timeslot"
appointment_URL = "http://host.docker.internal:5003/appointment"


# Make an appointment by timeslot_id
@app.route("/make_appointment/<int:timeslot_id>", methods=["POST"])
def make_appointment(timeslot_id):
    """
    Make an appointment by timeslot_id

    Constraints:
    - timeslot_id will always exist
    - timeslot_id will always be a timeslot with isAccepted=0
    - patient_id will always exist

    Returns:
    - 200: Successful
    - 400/404: Unsuccessful

    Example Response:
    - {"code": 200, "message": "success"}
    - {"code": 400/404, "message": "fail", "error_message": "..."}
    """
    try:
        # (1.1) Update timeslot isAccepted by id
        print()
        print("-- (1) Calling timeslot microservice --")
        print(
            f"Updating timeslot with timeslot_id={str(timeslot_id)} to isAccepted=1 ..."
        )
        response = invoke_http(
            f"{timeslot_URL}/update/{str(timeslot_id)}",
            method="PUT",
            json={"data": {"isAccepted": 1}},
        )

        # (1.2) Return error response, if any
        if response["code"] not in range(200, 300):
            print(f"Update failed!")
            print(f"Error: {response['message']}")
            return (
                jsonify(
                    {
                        "code": response["code"],
                        "message": "fail",
                        "error_message": response["message"],
                    }
                ),
                400,
            )

        print(f"Update completed!")
        print(f"Response: {response}")
        print()

        # (2) Format the json_payload
        print()
        print("-- (2) Formatting json_payload --")
        patient_id = request.get_json()["patient_id"]
        response = response["data"][0]
        response["patient_id"] = patient_id
        json_payload = {"data": response}
        print(f"Formatted json_payload: {json_payload}")
        print()

        # (3.1) Create an appointment
        print()
        print("-- (3) Calling appointment microservice --")
        print(f"Creating an appointment with current timeslot details ...")
        response = invoke_http(
            f"{appointment_URL}/create", method="POST", json=json_payload
        )

        # (3.2) Return error response, if any
        if response["code"] not in range(200, 300):
            print(f"Creation failed!")
            print(f"Error: {response['message']}")
            return (
                jsonify(
                    {
                        "code": response["code"],
                        "message": "Failed. However, timeslot is updated to isAccepted=1. Please reset the demo dataset1.",
                        "error_message": response["message"],
                    }
                ),
                501,
            )

        print(f"Creation completed!")
        print(f"Response: {response}")
        print()

        # (4) Return the response
        if response["code"] == 201:
            return jsonify({"code": 200, "message": "success"})
        else:
            return (
                jsonify(
                    {
                        "code": response["code"],
                        "message": "fail",
                        "error_message": response["message"],
                    }
                ),
                400,
            )

    except Exception as e:
        print("EXCEPTION: " + str(e))
        return jsonify({"code": 400, "message": "fail", "error_message": str(e)}), 400


# Cancel an appointment by appointment_id
@app.route("/cancel_appointment/<int:appointment_id>", methods=["PUT"])
def cancel_appointment(appointment_id):
    """
    Cancel an appointment by appointment_id

    Constraints:
    - appointment_id will always exist
    - appointment_id will always have a timeslot with timeslot_id=appointment_id and isAccepted=1

    Returns:
    - 200: Successful
    - 400/404: Unsuccessful

    Example Response:
    - {"code": 200, "message": "success"}
    - {"code": 400/404, "message": "fail", "error_message": "..."}
    """
    try:
        # (1) Update timeslot isAccepted by id
        print()
        print("-- (1) Calling timeslot microservice --")
        print(
            f"Updating timeslot with timeslot_id={str(appointment_id)} to isAccepted=0 ..."
        )
        response = invoke_http(
            f"{timeslot_URL}/update/{str(appointment_id)}",
            method="PUT",
            json={"data": {"isAccepted": 0}},
        )
        print(f"Update completed!")
        print(f"Response: {response}")
        print()

        # (2) Return error response, if any
        if response["code"] != 200:
            return (
                jsonify(
                    {
                        "code": response["code"],
                        "message": "fail",
                        "error_message": response["message"],
                    }
                ),
                400,
            )

        # (3) Delete the appointment with appointment_id
        print()
        print("-- (2) Calling appointment microservice --")
        print(f"Deleting an appointment with appointment_id={str(appointment_id)} ...")
        response = invoke_http(
            f"{appointment_URL}/delete/{str(appointment_id)}", method="DELETE"
        )
        print(f"Deletion completed!")
        print(f"Response: {response}")
        print()

        # (4) Return the response
        if response["code"] == 200:
            return jsonify({"code": 200, "message": "success"}), 200
        else:
            return jsonify(
                {
                    "code": response["code"],
                    "message": "fail",
                    "error_message": response["message"],
                }
            )

    except Exception as e:
        print("EXCEPTION: " + str(e))
        return jsonify({"code": 400, "message": "fail", "error_message": str(e)}), 400


if __name__ == "__main__":
    print(
        "This is flask for "
        + os.path.basename(__file__)
        + ": manage_booking_complex ..."
    )
    app.run(host="0.0.0.0", port=5101, debug=True)
