#!/usr/bin/env python3
# The above shebang (#!) operator tells Unix-like environments
# to run this file as a python3 script


import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

# Email API
import mailtrap as mt
#  SMS API
from twilio.rest import Client

# # import database
from database.db_notification import request_reset_db
from database.db_notification import get_exact_notification
from database.db_notification import get_all_notifications
from database.db_notification_actions import create_notification
from database.db_notification_actions import update_notification_status_by_session_id
from database.db_notification_actions import get_all_completed_notifications_by_patient_id

app = Flask(__name__)
CORS(app)  


#start amqp
import amqp_connection 
import json
import pika
#end amqp


a_queue_name = 'Notif_Log'

def receiveOrderLog(channel):
    try:
        # set up a consumer and start to wait for coming messages
        channel.basic_consume(queue=a_queue_name, on_message_callback=callback, auto_ack=True)
        print('activity_log: Consuming from queue:', a_queue_name)
        channel.start_consuming()  # an implicit loop waiting to receive messages;
             #it doesn't exit by default. Use Ctrl+C in the command window to terminate it.
    
    except pika.exceptions.AMQPError as e:
        print(f"activity_log: Failed to connect: {e}") # might encounter error if the exchange or the queue is not created

    except KeyboardInterrupt:
        print("activity_log: Program interrupted by user.") 
    except json.decoder.JSONDecodeError:
        print("activity_log: Received an empty or invalid JSON message")


def callback(channel, method, properties, body): # required signature for the callback; no return
    print("\nactivity_log: Received an order log by " + __file__)
    processOrderLog(json.loads(body))
    print()

def processOrderLog(order):
    print("activity_log: Recording an order log:")
    print(order)

#end

# Please no DDOS me - I lazy configure environment variable
TEAM_MEMBER_ACCOUNT = "Terris Tan Wei Jun"
TEAM_MEMBER_EMAIL = "terristanwei@gmail.com"
TEAM_MEMBER_PHONE = "+6596867171"

API_ENABLED = False # Set to True to enable API (Email and SMS) - Each email and SMS cost $$$

###### MailTrap configuration (Email API) START ####################################################################################
MAILTRAP_TOKEN = "24e53d222"+"761fba31630c"+"8896608b09b"
Mailtrap_client = mt.MailtrapClient(token=MAILTRAP_TOKEN)

MAILTRAP_SENDER_EMAIL = "mailtrap@demomailtrap.com"
MAILTRAP_SENDER = mt.Address(email=MAILTRAP_SENDER_EMAIL, name="Mailtrap Test")
MAILTRAP_TO_EMAIL = TEAM_MEMBER_EMAIL
MAILTRAP_TO = [mt.Address(email=MAILTRAP_TO_EMAIL)]
MAILTRAP_CATEGORY = "Integration Test"

# To use MailTrap, send an email using the send method
# mail = mt.Mail(sender=MAILTRAP_SENDER, to=MAILTRAP_TO, category=MAILTRAP_CATEGORY,
#         subject="You are awesome!",
#         text="Congrats for sending test email with Mailtrap!"
#     )
# Mailtrap_client.send(mail)

####### MailTrap configuration (Email API) END #####################################################################################


###### Twilio configuration (SMS API) START ########################################################################################
TWILIO_ACCOUNT_SID_1 = 'AC11fe7a'
TWILIO_ACCOUNT_SID_2 = '0d60d8906e79'
TWILIO_ACCOUNT_SID_3 = '2c540b0488669d'
TWILIO_ACCOUNT_SID = TWILIO_ACCOUNT_SID_1+TWILIO_ACCOUNT_SID_2+TWILIO_ACCOUNT_SID_3

TWILIO_AUTH_TOKEN_1 = 'cd8c1e2c0'
TWILIO_AUTH_TOKEN_2 = '7bc3c7788307'
TWILIO_AUTH_TOKEN_3 = '67e010d9721'
TWILIO_AUTH_TOKEN = TWILIO_AUTH_TOKEN_1+TWILIO_AUTH_TOKEN_2+TWILIO_AUTH_TOKEN_3
Twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

TWILIO_FROM = '+15184994110'
TWILIO_TO = TEAM_MEMBER_PHONE

# To use Twilio, send an SMS using the send method
# TWILIO_BODY = 'Message from Twilio. Hi!'
# message = Twilio_client.messages.create(from_=TWILIO_FROM, body=TWILIO_BODY, to=TWILIO_TO)
# print(message.sid)

####### Twilio configuration (SMS API) END #########################################################################################

# Test mailtrap email
@app.route("/notification/mailtrap/test", methods=['POST'])
def test_mailtrap():
    try:
        mail = mt.Mail(sender=MAILTRAP_SENDER, to=MAILTRAP_TO, category=MAILTRAP_CATEGORY,
                subject="You are awesome!",
                text="Congrats for sending test email with Mailtrap!"
            )
        Mailtrap_client.send(mail)
        return jsonify(
            {
                "code": 200,
                "message": "Successfully sent email using Mailtrap! Each email cost $$$!",
                "data": {
                    "sender": MAILTRAP_SENDER_EMAIL,
                    "recipient": MAILTRAP_TO_EMAIL,
                    "team_member_account": TEAM_MEMBER_ACCOUNT
                }
            }
        ), 200
    except Exception as e:
        return jsonify(
            {
                "code": 400,
                "message": "Failed to send email using Mailtrap!",
                "error": str(e)
            }
        ), 400

# Test Twilio SMS
@app.route("/notification/twilio/test", methods=['POST'])
def test_twilio():
    try:
        TWILIO_BODY = 'Message from Twilio. Hi!'
        message = Twilio_client.messages.create(from_=TWILIO_FROM, body=TWILIO_BODY, to=TWILIO_TO)
        # print(message.sid)
        return jsonify(
            {
                "code": 200,
                "message": "Successfully sent SMS using Twilio! Each SMS cost $$$!",
                "data": {
                    "sender": TWILIO_FROM,
                    "recipient": TWILIO_TO,
                    "team_member_account": TEAM_MEMBER_ACCOUNT
                }
            }
        ), 200
    except Exception as e:
        return jsonify(
            {
                "code": 400,
                "message": "Failed to send SMS using Twilio!",
                "error": str(e)
            }
        ), 400

# Email and SMS function
def execute_email_and_sms(affected_datetime):
    # Email and SMS sent status
    email_sent=False
    sms_sent=False

    # Send email using Mailtrap
    print("\n")
    try:
        mail = mt.MailFromTemplate(sender=MAILTRAP_SENDER, to=MAILTRAP_TO,
            template_uuid="e35a6117-813b-4040-b4a3-31b62102fac2",
            template_variables={ "datetime": affected_datetime }
        )

        Mailtrap_client.send(mail)

        print("Successfully sent email using Mailtrap!")
        email_sent = True
    except Exception as e:
        print("Failed to send email using Mailtrap!")
        print(str(e))

    # Send SMS using Twilio
    try:
        # Inform patient that appointment is cancelled
        TWILIO_BODY = f'''
Dear patient, 

We regret to inform you that your appointment on {affected_datetime} has been cancelled.

Unfortunately, the doctor is on urgent leave. Please make a new appointment. Thank you.

Regards,
Clinic Administrator at YATA'''
        message = Twilio_client.messages.create(from_=TWILIO_FROM, body=TWILIO_BODY, to=TWILIO_TO)
        # print(message.sid)

        print("Successfully sent SMS using Twilio!")
        sms_sent = True
    except Exception as e:
        print("Failed to send SMS using Twilio!")
        print(str(e))
    print("\n")

    if email_sent and sms_sent:
        return (f"Email and SMS sent! Sent to {TEAM_MEMBER_ACCOUNT} at {TEAM_MEMBER_EMAIL} and {TEAM_MEMBER_PHONE}", email_sent, sms_sent)
    elif email_sent:
        return ("Email sent but SMS not sent! Sent to {TEAM_MEMBER_ACCOUNT} at {TEAM_MEMBER_EMAIL}", email_sent, sms_sent)
    elif sms_sent:
        return ("SMS sent but Email not sent! Sent to {TEAM_MEMBER_ACCOUNT} at {TEAM_MEMBER_PHONE}", email_sent, sms_sent)
    else:
        return ("Email and SMS not sent! The API is not working, ask {TEAM_MEMBER_ACCOUNT} to debug.", email_sent, sms_sent)

# Reset Database
@app.route("/notification/reset/<string:dataset>", methods=['POST'])
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

# Get Notification history
@app.route("/notification/get/history", methods=['GET'])
def get_all_notifications_history():
    """
    Get Notification history

    Returns:
    - 200: All notifications
    - 404: No notifications found

    Example Response:
    - {"code": 200, "data": [[...], [...], [...]]}
    - {"code": 404, "message": "No notifications found"}
    """
    # (1) Get All Notifications
    data = get_all_notifications()

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
            "message": "No notifications found"
        }
    ), 404

# Create notification
@app.route("/notification/create", methods=['POST'])
def create_notification_api():
    """
    Create notification

    Constraints:
    - The payload will always be formatted correctly
    - status must be 'new' or 'completed' or 'received'
    - patient_id is optional

    Payload:
    - { data: { doctor_id, session_id, timeslot_datetime, status, patient_id(Optional) } }

    Returns:
    - 201: Notification created
    - 400: Notification already exists
    - 400: Invalid request

    Example Response:
    - {"code": 201, "message": "Notification created! ... ", "new_data": [...]}
    - {"code": 400, "message": "Notification Already Exists"}
    - {"code": 400, "message": "Invalid request. Payload must be in the format: {data: {doctor_id, session_id, timeslot_datetime, status, patient_id(optional)}}"}
    """
    try:
        # (1) Get Data
        payload = request.get_json()["data"]

        # (2) Check for patient_id
        msg_extension = "(Appointment Notification)"
        if "patient_id" not in payload:
            payload["patient_id"] = None
            msg_extension = "(Timeslot Notification)"

        # (3) Check if notification with session_id exists
        if len(get_exact_notification(payload)):
            return jsonify(
                {
                    "code": 400,
                    "message": "Notification Already Exists"
                }
            ), 400

        # (3) Create Notification into database
        create_notification(payload)

        return jsonify(
            {
                "code": 201,
                "message": f"Notification created! {msg_extension}",
                "new_data": get_exact_notification(payload)[0]
            }
        ), 201
    except Exception as e:
        return jsonify(
            {
                "code": 400,
                "message": "Invalid request. Payload must be in the format: {data: {doctor_id, session_id, timeslot_datetime, status, patient_id(optional)}}",
                "error": str(e)
            }
        ), 400

# Get all 'new' notifications
@app.route("/notification/get/new/all", methods=['GET'])
def get_all_new_notifications_api():
    """
    Get all 'new' notifications

    Returns:
    - 200: All 'new' notifications
    - 404: No 'new' notifications found

    Example Response:
    - {"code": 200, "count": ..., "data": [[...], [...], [...]]}
    - {"code": 404, "message": "No 'new' notifications found"}
    """
    # (1) Get All Notifications
    data = get_all_notifications(status="new")

    # (2) Check Response
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
            "message": "No 'new' notifications found"
        }
    ), 404
    
# Update notification to ‘completed’
@app.route("/notification/update/<int:session_id>", methods=['PUT'])
def update_notification_to_completed_api(session_id):
    """
    Update notification to ‘completed’

    Constraints:
    - session_id may be invalid
    - status of session_id is always initially 'new'

    Returns:
    - 200: Notification updated to completed
    - 400: Invalid request
    - 404: No notification found

    Example Response:
    - {"code": 200, "message": "Notification updated to completed! ...", "updated_data": [...]}
    - {"code": 400, "message": "Invalid request. Notification status must be 'new'"}
    - {"code": 404, "message": "No notification found"}
    """
    # (1) Prepare data
    payload = {
        "status": "completed",
        "session_id": session_id
    }

    # (2) Check if notification exists
    data = get_exact_notification(payload)
    if len(data):

        # (3) Check if data status is 'new'
        # - To prevent redundant updates
        if data[0]["status"] != "new":
            return jsonify(
                {
                    "code": 400,
                    "message": "Invalid request. Notification status must be 'new'"
                }
            ), 400
        
        # (4) Update Notification
        update_notification_status_by_session_id(payload)

        # (5) Get updated data
        updated_data = get_exact_notification(payload)[0]

        # (6) Execute Email and SMS
        # - Each email and SMS cost $$$
        if API_ENABLED:
            result = execute_email_and_sms(updated_data["timeslot_datetime"])

        # (7) Return Response
        return jsonify(
            {
                "code": 200,
                "message": f"Notification updated to completed! {result[0] if API_ENABLED else 'Email and SMS API is currently disabled, to enable please modify API_ENABLED'}",
                "updated_data": updated_data
            }
        ), 200
    
    # (8) Return Error
    return jsonify(
        {
            "code": 404,
            "message": "No notification found"
        }
    ), 404

# Update ‘completed’ to ‘received’ based on patient_id, then GET
@app.route("/notification/update/completed/<int:patient_id>", methods=['PUT'])
def update_completed_to_received_api(patient_id):
    """
    Get & update 'completed' to 'received' based on patient_id

    Constraints:
    - patient_id may be invalid

    Returns:
    - 200: Notification updated to received!
    - 404: No notification found

    Example Response:
    - {"code": 200, "message": "Notification updated to received!", "updated_data": [...]}
    - {"code": 404, "message": "No notification found"}
    """
    # (1) Prepare data
    payload = {
        "status": "received",
        "patient_id": patient_id
    }

    # (2) Check if any notification exists
    # - For this patient_id
    # - For this status="completed"
    all_data = get_all_completed_notifications_by_patient_id(payload)
    if len(all_data):

        # (3) For each data, update status to 'received'
        for datum in all_data:
            datum["status"] = "received"
            update_notification_status_by_session_id(datum)

        # (4) Return Response
        return jsonify(
            {
                "code": 200,
                "message": "Notification updated to received!",
                "count": len(all_data),
                "updated_data": all_data
            }
        ), 200
    
    # (4) Return Error
    return jsonify(
        {
            "code": 404,
            "message": "No notification found"
        }
    ), 404

if __name__ == '__main__':
    print("This is flask for " + os.path.basename(__file__) + ": manage notifications ...")
    # print("activity_log: Getting Connection")
    # connection = amqp_connection.create_connection() #get the connection to the broker
    # print("activity_log: Connection established successfully")
    # channel = connection.channel()
    # receiveOrderLog(channel)
    app.run(host='0.0.0.0', port=5004, debug=True)

