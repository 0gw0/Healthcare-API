#!/usr/bin/env python3
# The above shebang (#!) operator tells Unix-like environments
# to run this file as a python3 script

import os
from flask import Flask, request, jsonify
from flask_cors import CORS

from invokes import invoke_http

app = Flask(__name__)
CORS(app)

inventory_URL = "http://host.docker.internal:5005/inventory/"
delivery_order_URL = "http://host.docker.internal:5006/delivery_order"


#Create delivery complex microservice

"""
    Create delivery
    1. Update inventory
    2. Create delivery order

    Assumptions:
    - items exist in inventory
    - delivery_id will always exist

    Returns:
    - 200: Successful
    - 400/404: Unsuccessful

    Example Response:
    - {"code": 200, "message": "success"}
    - {"code": 400/404, "message": "fail", "error_message": "..."}
    """
    
    
# Create delivery with appointment ID
@app.route("/delivery/create/<int:appointment_id>", methods=["POST"])
def create_delivery(appointment_id):
    #(1) Check status of payload 
    try:
        order_details = request.get_json()
    except Exception as e:
        return jsonify({"code": 400, "message": "Invalid POST payload"}), 400
        
        
    # Reformatting data to match delivery_order service expected payload
    delivery_data = {
        #as mentioned, delivery_order id is appointment_id
        "id": appointment_id,
        "items": {item["name"]: item["quantity"] for item in order_details["items"]}
    }    
    
    #(2) Update inventory
    for item in order_details["items"]:
        inventory_response = invoke_http(
            f"{inventory_URL}/update/{item['id']}",
            method="PUT",
            json={"quantity_to_add": -item['quantity']}
        )
        if inventory_response["code"] not in range(200, 300):
            # Handle error
            print(f"Update failed!")
            print(f"Error: {inventory_response['message']}")
            return (
                jsonify(
                    {
                        "code": inventory_response["code"],
                        "message": "Failed to update inventory",
                        "error_message": inventory_response["message"],
                    }
                ), inventory_response["code"]
                
            )
            
    print(f"Inventory Update completed!")
    print(f"Response: {inventory_response}")
    print() 
            
#(3) Create delivery order
    delivery_order_response = invoke_http(
        f"{delivery_order_URL}/create",
        method="POST",
        json=delivery_data
    )
    if delivery_order_response["code"] not in range(200, 300):
        # Handle error
        print(f"Creation failed!")
        print(f"Error: {delivery_order_response['message']}")
        return (
                jsonify(
                    {
                        "code": delivery_order_response["code"],
                        "message": "Failed. Delivery Order not created.",
                        "error_message": delivery_order_response["message"],
                    }
                ),
                delivery_order_response,
            )

    print(f"Delivery Order Creation completed!")
    print(f"Response: {delivery_order_response}")
    print() 
    
    return jsonify({"code": 200, "message": "Delivery created successfully"})


if __name__ == "__main__":
    print(
        "This is flask for "
        + os.path.basename(__file__)
        + ": create_delivery_complex microservice ..."
    )
    app.run(host="0.0.0.0", port=5103, debug=True)
