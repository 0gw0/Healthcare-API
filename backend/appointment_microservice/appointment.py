#!/usr/bin/env python3
# The above shebang (#!) operator tells Unix-like environments
# to run this file as a python3 script

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import datetime

# import database actions
from database.db_appointment import request_reset_db
from database.db_appointment import get_all_appointments
from database.db_appointment_actions import create_appointment
from database.db_appointment_actions import get_appointment_by_data
from database.db_appointment_actions import update_appointment_isCompleted
from database.db_appointment_actions import delete_appointment_by_id

app = Flask(__name__)
CORS(app)  

# Reset Database
@app.route("/appointment/reset/<string:dataset>", methods=['POST'])
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
        return jsonify(
            {
                "code": code,
                "message": data
            }
        ), code
    
    # - If data is a list, return a list of users
    return jsonify(
        {
            "code": code,
            "data_created": data
        }
    ), code

# Get Appointments history
@app.route("/appointment/get/history", methods=['GET'])
def get_all_appointments_history():
    """
    Get Appointments history

    Returns:
    - 200: All appointments
    - 404: No appointments found

    Example Response:
    - {"code": 200, "data": [[...], [...], [...]]}
    - {"code": 404, "message": "No appointments found"}
    """
    # (1) Get All Appointments
    data = get_all_appointments()

    # (2) Check Response
    if len(data):
        return jsonify(
            {
                "code": 200,
                "data": data
            }
        ), 200
    return jsonify(
        {
            "code": 404,
            "message": "No appointments found"
        }
    ), 404

# Create Appointment
@app.route("/appointment/create", methods=['POST'])
def create_appointment_api():
    """
    Create Appointment

    Constraints:
    - Given timeslot_datetime will always be in the format 'YYYY-MM-DD HH:MM:SS'
    - There will never be an API call with an existing id

    Returns:
    - 201: Appointment created
    - 400: Invalid POST payload
    - 400: Existing id

    Example Request Payload:
    - { "data": { "id": 999, "doctor_id": 1, "time_created": "2024-03-01 08:37:00",
            "timeslot_datetime": "2024-03-20 12:00:00", "duration_minutes": 30,
            "patient_id": 1 }
        }

    Example Response:
    - {"code": 201, "message": "Appointment created", "data": [[...]]}
    - {"code": 400, "message": "Invalid POST payload"}
    - {"code": 400, "message": "Existing id. Note: There will never be an API call with an existing id."}
    """
    # (1) Get POST payload
    try:
        data = request.get_json()["data"]
    except Exception as e:
        return jsonify(
            {
                "code": 400,
                "message": "Invalid POST payload"
            }
        ), 400

    # (2) Invalid Post Payload
    # - Missing any of the following:
    #   - id, doctor_id, time_created, timeslot_datetime, duration_minutes, patient_id
    keys = ["id", "doctor_id", "time_created", "timeslot_datetime", "duration_minutes", "patient_id"]
    for key in keys:
        if key not in data:
            return jsonify(
                {
                    "code": 400,
                    "message": "Invalid POST payload"
                }
            ), 400
        
    # (3) Existing id
    # - If id already exists, return 400
    if len(get_appointment_by_data({"id": data["id"]})):
        return jsonify(
            {
                "code": 400,
                "message": "Existing id. Note: There will never be an API call with an existing id."
            }
        ), 400
        
    # (4) Create appointment slot
    # - Create time_accepted as current time
    # - isCompleted is default 0
    data["time_accepted"] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    data["isCompleted"] = 0
    create_appointment(data)

    # (5) Return Success
    return jsonify(
        {
            "code": 201,
            "message": "Appointment created",
            "data": get_appointment_by_data(data)
        }
    ), 201

# Get All Appointments, with time range
@app.route("/appointment/get/all", methods=['GET'])
def get_all_appointments_timerange():
    """
    Get All Appointments

    Returns:
    - 200: All appointments
    - 404: No appointments found

    Example Request Payload:
    - { "data": {...}, "start_date": "2024-03-01", "end_date": "2024-03-31"}
    - {"start_date": "2024-03-01", "end_date": "2024-03-31"}

    Example Response:
    - {"code": 200, "data": [[...], [...], [...]]}
    - {"code": 404, "message": "No appointments found"}
    """
    
    # (1) Check payload for data, start_date and end_date
    try:
        # If payload is empty, make an error
        # Go to Except, to get all data
        payload = request.get_json()
        # print(payload)

        # No data, set to empty
        data = payload["data"] if "data" in payload else {}
        # print(data)

        # Get single day
        # - If timeslot_datetime is in data
        if "timeslot_datetime" in data:
            start_date = data["timeslot_datetime"]
            end_date = data["timeslot_datetime"] + "_"
            del data['timeslot_datetime']

        # Get date range
        else:
            start_date = payload["start_date"] if "start_date" in payload else None
            end_date = payload["end_date"] + "_" if "end_date" in payload else None
    # - If no payload, set to empty
    except Exception as e:
        data = {}
        start_date = None
        end_date = None

    # print(data, start_date, end_date)
    # print()

    # (2) Get Appointments
    data = get_appointment_by_data(data, start_date, end_date)

    # (3) Check Response
    if len(data):
        return jsonify(
            {
                "code": 200,
                "count": len(data),
                "data": data
            }
        ), 200
    return jsonify(
        {
            "code": 404,
            "message": "No appointments found"
        }
    ), 404

# Delete appointment by id
@app.route("/appointment/delete/<int:id>", methods=['DELETE'])
def delete_appointment_api(id):
    """
    Delete appointment by id

    Returns:
    - 200: Appointment deleted
    - 404: No appointment found

    Example Response:
    - {"code": 200, "message": "Appointment deleted"}
    - {"code": 404, "message": "No appointment found"}
    """
    # (1) Check Appointment ID
    # - If appointment does not exist, return 404
    deleted = get_appointment_by_data({"id": id})
    if not len(deleted):
        return jsonify(
            {
                "code": 404,
                "message": "No appointment found"
            }
        ), 404

    # (2) Delete appointment by id
    delete_appointment_by_id({"id": id})
    return jsonify(
        {
            "code": 200,
            "message": "Appointment deleted",
            "deleted": deleted
        }
    ), 200

# Update appointment isCompleted by id
@app.route("/appointment/update/<int:id>", methods=['PUT'])
def update_appointment_isCompleted_api(id):
    """
    Update appointment isCompleted by id

    Returns:
    - 200: Appointment isCompleted updated to 1
    - 200: Appointment isCompleted updated to 0
    - 400: Invalid POST payload
    - 400: Invalid isCompleted Value
    - 404: No appointment found

    Example Response:
    - {"code": 200, "message": "Appointment isCompleted updated to 1"}
    - {"code": 200, "message": "Appointment isCompleted updated to 0"}
    - {"code": 400, "message": "Invalid POST payload"}
    - {"code": 400, "message": "Invalid isCompleted Value. Must be 0 or 1"}
    - {"code": 404, "message": "No appointment found"}
    """
    # (1) Get POST payload
    try:
        data = request.get_json()["data"]
    except Exception as e:
        return jsonify(
            {
                "code": 400,
                "message": "Invalid POST payload"
            }
        ), 400

    # (2) Check isCompleted Value
    # - isCompleted must be 0 or 1
    if "isCompleted" not in data or data["isCompleted"] not in [0, 1]:
        return jsonify(
            {
                "code": 400,
                "message": "Invalid isCompleted Value. Must be 0 or 1"
            }
        ), 400

    # (3) Check Appointment ID
    # - If appointment does not exist, return 404
    if not len(get_appointment_by_data({"id": id})):
        return jsonify(
            {
                "code": 404,
                "message": "No appointment found"
            }
        ), 404

    # (4) Update appointment isCompleted by id
    data["id"] = id
    update_appointment_isCompleted(data)

    # (5) Return Success
    return jsonify(
        {
            "code": 200,
            "message": f"Appointment isCompleted updated to {data['isCompleted']}",
            "data": get_appointment_by_data({"id": id})
        }
    ), 200

if __name__ == '__main__':
    print("This is flask for " + os.path.basename(__file__) + ": manage appointments ...")
    app.run(host='0.0.0.0', port=5003, debug=True)
