#!/usr/bin/env python3
# The above shebang (#!) operator tells Unix-like environments
# to run this file as a python3 script

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import datetime

# import database actions
from database.db_timeslot import request_reset_db
from database.db_timeslot import get_all_timeslots
from database.db_timeslot_actions import create_timeslot
from database.db_timeslot_actions import get_timeslot_by_data
from database.db_timeslot_actions import update_timeslot_isAccepted
from database.db_timeslot_actions import delete_timeslot_by_id

app = Flask(__name__)
CORS(app)  

# Reset Database
@app.route("/timeslot/reset/<string:dataset>", methods=['POST'])
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

# Get Timeslots history
@app.route("/timeslot/get/history", methods=['GET'])
def get_all_timeslots_history():
    """
    Get Timeslots history

    Returns:
    - 200: All timeslots
    - 404: No timeslots found

    Example Response:
    - {"code": 200, "data": [[...], [...], [...]]}
    - {"code": 404, "message": "No timeslots found"}
    """
    # (1) Get All Timeslots
    data = get_all_timeslots()

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
            "message": "No timeslots found"
        }
    ), 404

# Get All Timeslots, with time range
@app.route("/timeslot/get/all", methods=['GET'])
def get_all_timeslots_timerange():
    """
    Get All Timeslots

    Returns:
    - 200: All timeslots
    - 404: No timeslots found

    Example Request Payload:
    - { "data": {...}, "start_date": "2024-03-01", "end_date": "2024-03-31"}
    - {"start_date": "2024-03-01", "end_date": "2024-03-31"}

    Example Response:
    - {"code": 200, "data": [[...], [...], [...]]}
    - {"code": 404, "message": "No timeslots found"}
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

    # (2) Get Timeslots
    data = get_timeslot_by_data(data, start_date, end_date)

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
            "message": "No timeslots found"
        }
    ), 404

# Create time slot
@app.route("/timeslot/create", methods=['POST'])
def create_timeslot_api():
    """
    Create time slot

    Returns:
    - 201: Time slot created
    - 400: Invalid POST payload
    - 400: Invalid datetime format
    - 400: Time slot already exist for this doctor_id

    Example Request Payload:
    - { "data": { "doctor_id": 1, "timeslot_datetime": "2024-10-27 08:00:00"} }

    Example Response:
    - {"code": 201, "message": "Time slot created", "data": [[...]]}
    - {"code": 400, "message": "Invalid POST payload"}
    - {"code": 400, "message": "Invalid datetime format. Must be 'YYYY-MM-DD HH:MM:SS'"}
    - {"code": 400, "message": "Time slot already exist for this doctor_id"}
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
    # - Missing doctor_id
    # - Missing timeslot_datetime
    if "doctor_id" not in data or "timeslot_datetime" not in data:
        return jsonify(
            {
                "code": 400,
                "message": "Invalid POST payload"
            }
        ), 400
    
    # (2) Invalid Post Payload
    # - Incorrect format for timeslot_datetime
    try:
        datetime.datetime.strptime(data["timeslot_datetime"], '%Y-%m-%d %H:%M:%S')
    except ValueError:
        return jsonify(
            {
                "code": 400,
                "message": "Invalid datetime format. Must be 'YYYY-MM-DD HH:MM:SS'"
            }
        ), 400
    
    # (3) Time slot already exist for this doctor_id
    if len(get_timeslot_by_data(data)):
        return jsonify(
            {
                "code": 400,
                "message": "Time slot already exist for this doctor_id"
            }
        ), 400

    # (4) Create time slot
    # Create time_created as current time
    data["time_created"] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    create_timeslot(data)

    # (5) Return Success
    return jsonify(
        {
            "code": 201,
            "message": "Time slot created",
            "data": get_timeslot_by_data(data)
        }
    ), 201

# Update time slot isAccepted by id
@app.route("/timeslot/update/<int:id>", methods=['PUT'])
def update_timeslot_isAccepted_api(id):
    """
    Update time slot isAccepted by id

    Returns:
    - 200: Time slot isAccepted updated to 1
    - 200: Time slot isAccepted updated to 0
    - 400: Invalid POST payload
    - 400: Invalid isAccepted Value
    - 404: No time slot found

    Example Response:
    - {"code": 200, "message": "Time slot isAccepted updated to 1"}
    - {"code": 200, "message": "Time slot isAccepted updated to 0"}
    - {"code": 400, "message": "Invalid POST payload"}
    - {"code": 400, "message": "Invalid isAccepted Value. Must be 0 or 1"}
    - {"code": 404, "message": "No time slot found"}
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

    # (2) Check isAccepted Value
    # - isAccepted must be 0 or 1
    if "isAccepted" not in data or data["isAccepted"] not in [0, 1]:
        return jsonify(
            {
                "code": 400,
                "message": "Invalid isAccepted Value. Must be 0 or 1"
            }
        ), 400

    # (3) Check Time Slot ID
    # - If time slot does not exist, return 404
    if not len(get_timeslot_by_data({"id": id})):
        return jsonify(
            {
                "code": 404,
                "message": "No time slot found"
            }
        ), 404

    # (4) Update time slot isAccepted by id
    data["id"] = id
    update_timeslot_isAccepted(data)

    # (5) Return Success
    return jsonify(
        {
            "code": 200,
            "message": f"Time slot isAccepted updated to {data['isAccepted']}",
            "data": get_timeslot_by_data({"id": id})
        }
    ), 200

# Delete time slot by id
@app.route("/timeslot/delete/<int:id>", methods=['DELETE'])
def delete_timeslot_api(id):
    """
    Delete time slot by id

    Returns:
    - 200: Time slot deleted
    - 404: No time slot found

    Example Response:
    - {"code": 200, "message": "Time slot deleted"}
    - {"code": 404, "message": "No time slot found"}
    """
    # (1) Check Time Slot ID
    # - If time slot does not exist, return 404
    deleted = get_timeslot_by_data({"id": id})
    if not len(deleted):
        return jsonify(
            {
                "code": 404,
                "message": "No time slot found"
            }
        ), 404

    # (2) Delete time slot by id
    delete_timeslot_by_id({"id": id})
    return jsonify(
        {
            "code": 200,
            "message": "Time slot deleted",
            "deleted": deleted
        }
    ), 200

# # Get All Users
# @app.route("/users/get/<string:usertype>", methods=['GET'])
# def get_all(usertype):
#     """
#     Get All Users

#     Returns:
#     - 200: All users
#     - 200: Patients, Nurses, or Doctors
#     - 400: Invalid User Type
#     - 404: No users found

#     Valid UserTypes:
#     - "all"
#     - "patients"
#     - "nurses"
#     - "doctors"

#     Example Response:
#     - {"code": 200, "data": [[...], [...], [...]]}
#     - {"code": 400, "message": "Invalid User Type"}
#     - {"code": 404, "message": "No users found"}
#     """
#     # (1) Get All Users
#     response = get_all_user(usertype)
#     code = response[0]
#     data = response[1]

#     # (2) Check Response
#     if code == 200:
#         if len(data):
#             return jsonify(
#                 {
#                     "code": 200,
#                     "data": data
#                 }
#             ), 200
#         return jsonify(
#             {
#                 "code": 404,
#                 "message": "No users found"
#             }
#         ), 404
#     return jsonify(
#         {
#             "code": code,
#             "message": "Invalid User Type"
#         }
#     ), code

# # Get User by ID
# @app.route("/user/get/<string:usertype>/<int:id>", methods=['GET'])
# def get_by_id(usertype, id):
#     """
#     Get User by ID

#     Returns:
#     - 200: User found
#     - 400: Invalid User Type
#     - 404: No user found

#     Valid UserTypes:
#     - "patients"
#     - "nurses"
#     - "doctors"

#     Example Response:
#     - {"code": 200, "data": [[...]]}
#     - {"code": 400, "message": "Invalid User Type"}
#     - {"code": 404, "message": "No user found"}
#     """
#     # (1) Get User by ID
#     response = get_user_by_id(usertype, id)

#     # (2) Check Response
#     if type(response) == str:
#         return jsonify(
#             {
#                 "code": 400,
#                 "message": response
#             }
#         ), 400
#     if response:
#         return jsonify(
#             {
#                 "code": 200,
#                 "data": response
#             }
#         ), 200
#     return jsonify(
#         {
#             "code": 404,
#             "message": "No user found"
#         }
#     ), 404

# # Insert User
# @app.route("/user/create/<string:usertype>", methods=['POST'])
# def insert(usertype):
#     """
#     Insert User

#     Returns:
#     - 201: User created
#     - 400: Invalid User Type
#     - 500: An error occurred while creating the user

#     Valid UserTypes:
#     - "patients"
#     - "nurses"
#     - "doctors"

#     Example Response:
#     - {"code": 201, "message": "User created", "data": [[...]]}
#     - {"code": 400, "message": "Username is taken"}
#     - {"code": 400, "message": "Invalid User Type"}
#     - {"code": 400, "message": "Invalid POST payload"}
#     """
#     # (1) Get POST payload
#     data = request.get_json()    

#     # (2) Check User Type
#     if usertype not in ["patients", "nurses", "doctors"]:
#         return jsonify(
#             {
#                 "code": 400,
#                 "message": "Invalid User Type"
#             }
#         ), 400

#     # (3) Check if User Exists
#     if get_user_by_username(usertype, data["username"]):
#         return jsonify(
#             {
#                 "code": 400,
#                 "message": "Username is taken"
#             }
#         ), 400

#     # (4) Create User
#     try:
#         create_user(usertype, data)
#     except Exception as e:
#         return jsonify(
#             {
#                 "code": 400,
#                 "message": "Invalid POST payload."
#             }
#         ), 400

#     # (5) Get User by Username
#     response = get_user_by_username(usertype, data["username"])
#     return jsonify(
#         {
#             "code": 201,
#             "message": "User created",
#             "data": response
#         }
#     ), 201

# # Login User
# @app.route("/user/login/<string:usertype>", methods=['POST'])
# def login(usertype):
#     """
#     Login User

#     Returns:
#     - 200: User logged in
#     - 400: Invalid User Type
#     - 400: Invalid Credentials

#     Valid UserTypes:
#     - "patients"
#     - "nurses"
#     - "doctors"

#     Example Response:
#     - {"code": 200, "message": "User logged in", "data": [[ "id": INTEGER ]]}
#     - {"code": 400, "message": "Invalid User Type"}
#     - {"code": 400, "message": "Invalid Credentials"}
#     """
#     # (1) Get POST payload
#     data = request.get_json()

#     # (2) Check User Type
#     if usertype not in ["patients", "nurses", "doctors"]:
#         return jsonify(
#             {
#                 "code": 400,
#                 "message": "Invalid User Type"
#             }
#         ), 400

#     # (3) Login User
#     response = login_user(usertype, data["username"], data["password"])
#     if type(response) == str:
#         return jsonify(
#             {
#                 "code": 400,
#                 "message": response
#             }
#         ), 400
#     return jsonify(
#         {
#             "code": 200,
#             "message": f"{usertype[:-1].capitalize()} Credentials are Valid",
#             "data": response
#         }
#     ), 200

if __name__ == '__main__':
    print("This is flask for " + os.path.basename(__file__) + ": manage timeslots ...")
    app.run(host='0.0.0.0', port=5002, debug=True)
