#!/usr/bin/env python3
# The above shebang (#!) operator tells Unix-like environments
# to run this file as a python3 script

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

# import database
from database.db_user import request_reset_db
from database.db_user import get_all_user, get_user_by_id, get_user_by_username
from database.db_user import create_user, login_user

app = Flask(__name__)
CORS(app)  

# Reset Database
@app.route("/user/reset/<string:dataset>", methods=['POST'])
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

# Get All Users
@app.route("/users/get/<string:usertype>", methods=['GET'])
def get_all(usertype):
    """
    Get All Users

    Returns:
    - 200: All users
    - 200: Patients, Nurses, or Doctors
    - 400: Invalid User Type
    - 404: No users found

    Valid UserTypes:
    - "all"
    - "patients"
    - "nurses"
    - "doctors"

    Example Response:
    - {"code": 200, "data": [[...], [...], [...]]}
    - {"code": 400, "message": "Invalid User Type"}
    - {"code": 404, "message": "No users found"}
    """
    # (1) Get All Users
    response = get_all_user(usertype)
    code = response[0]
    data = response[1]

    # (2) Check Response
    if code == 200:
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
                "message": "No users found"
            }
        ), 404
    return jsonify(
        {
            "code": code,
            "message": "Invalid User Type"
        }
    ), code

# Get User by ID
@app.route("/user/get/<string:usertype>/<int:id>", methods=['GET'])
def get_by_id(usertype, id):
    """
    Get User by ID

    Returns:
    - 200: User found
    - 400: Invalid User Type
    - 404: No user found

    Valid UserTypes:
    - "patients"
    - "nurses"
    - "doctors"

    Example Response:
    - {"code": 200, "data": [[...]]}
    - {"code": 400, "message": "Invalid User Type"}
    - {"code": 404, "message": "No user found"}
    """
    # (1) Get User by ID
    response = get_user_by_id(usertype, id)

    # (2) Check Response
    if type(response) == str:
        return jsonify(
            {
                "code": 400,
                "message": response
            }
        ), 400
    if response:
        return jsonify(
            {
                "code": 200,
                "data": response
            }
        ), 200
    return jsonify(
        {
            "code": 404,
            "message": "No user found"
        }
    ), 404

# Insert User
@app.route("/user/create/<string:usertype>", methods=['POST'])
def insert(usertype):
    """
    Insert User

    Returns:
    - 201: User created
    - 400: Invalid User Type
    - 500: An error occurred while creating the user

    Valid UserTypes:
    - "patients"
    - "nurses"
    - "doctors"

    Example Response:
    - {"code": 201, "message": "User created", "data": [[...]]}
    - {"code": 400, "message": "Username is taken"}
    - {"code": 400, "message": "Invalid User Type"}
    - {"code": 400, "message": "Invalid POST payload"}
    """
    # (1) Get POST payload
    data = request.get_json()    

    # (2) Check User Type
    if usertype not in ["patients", "nurses", "doctors"]:
        return jsonify(
            {
                "code": 400,
                "message": "Invalid User Type"
            }
        ), 400

    # (3) Check if User Exists
    if get_user_by_username(usertype, data["username"]):
        return jsonify(
            {
                "code": 400,
                "message": "Username is taken"
            }
        ), 400

    # (4) Create User
    try:
        create_user(usertype, data)
    except Exception as e:
        return jsonify(
            {
                "code": 400,
                "message": "Invalid POST payload."
            }
        ), 400

    # (5) Get User by Username
    response = get_user_by_username(usertype, data["username"])
    return jsonify(
        {
            "code": 201,
            "message": "User created",
            "data": response
        }
    ), 201

# Login User
@app.route("/user/login/<string:usertype>", methods=['POST'])
def login(usertype):
    """
    Login User

    Returns:
    - 200: User logged in
    - 400: Invalid User Type
    - 400: Invalid Credentials

    Valid UserTypes:
    - "patients"
    - "nurses"
    - "doctors"

    Example Response:
    - {"code": 200, "message": "User logged in", "data": [[ "id": INTEGER ]]}
    - {"code": 400, "message": "Invalid User Type"}
    - {"code": 400, "message": "Invalid Credentials"}
    """
    # (1) Get POST payload
    data = request.get_json()

    # (2) Check User Type
    if usertype not in ["patients", "nurses", "doctors"]:
        return jsonify(
            {
                "code": 400,
                "message": "Invalid User Type"
            }
        ), 400

    # (3) Login User
    response = login_user(usertype, data["username"], data["password"])
    if type(response) == str:
        return jsonify(
            {
                "code": 400,
                "message": response
            }
        ), 400
    return jsonify(
        {
            "code": 200,
            "message": f"{usertype[:-1].capitalize()} Credentials are Valid",
            "data": response
        }
    ), 200

if __name__ == '__main__':
    print("This is flask for " + os.path.basename(__file__) + ": manage users ...")
    app.run(host='0.0.0.0', port=5001, debug=True)
