#!/usr/bin/env python3
# The above shebang (#!) operator tells Unix-like environments
# to run this file as a python3 script

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

# import database actions
from database.db_delivery_order import create_delivery_order
from database.db_delivery_order import get_all_delivery_order


app = Flask(__name__)
CORS(app)  

# # Reset Database
# @app.route("/timeslot/reset/<string:dataset>", methods=['POST'])
# def reset_db(dataset):
#     """
#     Reset Database
#     - Reset the database to its original state
#     - If a dataset is provided, reset the database with the dataset

#     Returns:
#     - 205: Database reset
#     - 400: Invalid Dataset

#     Valid Datasets:
#     - "empty": No dataset
#     - "dataset1": Dataset 1

#     Example Response:
#     - {"code": 205, "message": "Database reset! No Dataset was used"}
#     - {"code": 205, "data_created": [[...], [...], [...]]}
#     - {"code": 400, "message": "Database was not reset. Invalid Dataset: ..."}
#     """
#     # (1) Reset Database
#     response = request_reset_db(dataset)

#     # (2) Check Response
#     code = response[0]
#     data = response[1]

#     # (3) Return Response
#     # - If data is a string, return a message
#     if type(data) == str:
#         return jsonify(
#             {
#                 "code": code,
#                 "message": data
#             }
#         ), code
    
#     # - If data is a list, return a list of users
#     return jsonify(
#         {
#             "code": code,
#             "data_created": data
#         }
#     ), code


# Get All delivery order
@app.route("/delivery_order/get/all", methods=['GET'])
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
        return jsonify(
            {
                "code": 200,
                "data": data
            }
        ), 200
    return jsonify(
        {
            "code": 404,
            "message": "No delivery order found"
        }
    ), 404

# Create delivery order
@app.route("/delivery_order/create", methods=['POST'])
def create_delivery_order_api():
    """
    Create delivery order

    Returns:
    - 201: Delivery order created
    - 400: Invalid POST payload

    Example Request Payload:
    -{"id": 4, "product_list": "amoxolin", "quantity_list": 5}
    
    Example Response:
    - {"code": 201, "message": "Delivery order created", "data": [[...]]}
    - {"code": 400, "message": "Invalid POST payload"}
    """
    # (1) Get POST payload
    try:
        data = request.get_json()
    except Exception as e:
        return jsonify(
            {
                "code": 400,
                "message": "Invalid POST payload"
            }
        ), 400

    # (2) Invalid Post Payload
    # - Missing product_list
    # - Missing quantity_list
    if "product_list" not in data or "quantity_list" not in data:
        return jsonify(
            {
                "code": 401,
                "message": "Invalid POST payload"
            }
        ), 400
    
    create_delivery_order(data)

    # (4) Return Success
    return jsonify(
        {
            "code": 201,
            "message": "Delivery order created"
        }
    ), 201


if __name__ == '__main__':
    print("This is flask for " + os.path.basename(__file__) + ": delivery order...")
    app.run(host='0.0.0.0', port=5002, debug=True)
