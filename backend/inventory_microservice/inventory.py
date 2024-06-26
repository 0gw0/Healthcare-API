#!/usr/bin/env python3
# The above shebang (#!) operator tells Unix-like environments
# to run this file as a python3 script

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import datetime

# import database actions
from database.db_inventory import request_reset_db
from database.db_inventory_actions import get_all_items
from database.db_inventory_actions import get_item_by_id
from database.db_inventory_actions import get_item_quantity
from database.db_inventory_actions import update_item_quantity


app = Flask(__name__)
CORS(app)  

# Reset Database
@app.route("/inventory/reset/<string:dataset>", methods=['POST'])
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
    
    
    
 #Get all items    
@app.route("/inventory/get/all", methods=['GET'])
def get_all():
    data = get_all_items()
    
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
            "message": "No items found"
        }
    ), 404
    
 #Update item quantity by id   
@app.route("/inventory/update/<int:id>", methods=['PUT'])
def update_quantity(id):
    """
    Update item quantity by id
    - Get a number
    - Update quantity by that number

    Returns:
    - 200: Item updated
    - 400: Invalid PUT payload

    Example Payload:
    - {"quantity_change": 5}

    Example Response:
    - {"code": 200, "message": "Inventory item quantity updated", "data": {...}}
    - {"code": 400, "message": "Invalid PUT payload", "error": ...}
    """
    # (1) Get PUT payload
    try:
        data = request.get_json()
        quantity_change = data["quantity_change"]
        
        # If error here, item not found
        current_quantity = get_item_quantity({"id": id})
        
        # (2) Update inventory item quantity by id
        data["id"] = id
        data["quantity"] = current_quantity + quantity_change

        #IF quantity less than 0, return insufficient stock
        if data["quantity"] < 0:
                return jsonify({"code": 400, "message": "Insufficient stock"}), 400
    
        #sufficient stock, update quantity
        update_item_quantity(data)
        
        # (3) Return Success
        updated_item = get_item_by_id(data)
        return jsonify(
            {
                "code": 200,
                "message": f"Inventory item quantity updated",
                "quantity_change": quantity_change,
                "updated_data": updated_item
            }
        ), 200

    except Exception as e:
        return jsonify({"code": 404, "message": "Item not found"}), 404

if __name__ == '__main__':
    print("This is flask for " + os.path.basename(__file__) + ": inventory management ...")
    app.run(host='0.0.0.0', port=5005, debug=True)
