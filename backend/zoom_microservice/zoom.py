#!/usr/bin/env python3
# The above shebang (#!) operator tells Unix-like environments
# to run this file as a python3 script

import os
from flask import Flask, make_response, request, jsonify
from flask_cors import CORS
import json

from datetime import date

import base64
from pathlib import Path

# Zoom Settings
ZOOM_INVITE = "https://smu-sg.zoom.us/j/6346697940?pwd=VDdLSllTV1RyOE5TVU8zeUhNRHlvdz09"
ZOOM_OWNER = "https://smu-sg.zoom.us/meeting#/pmi/6346697940"

# Email API
import mailtrap as mt
#  SMS API
from twilio.rest import Client

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

app = Flask(__name__)
CORS(app)  

DEFAULT_MSG = f"Thank you for choosing Yata!\n\nPlease join the Zoom meeting at:\n{ZOOM_INVITE}."
def send_email():
    try:
        mail = mt.Mail(sender=MAILTRAP_SENDER, to=MAILTRAP_TO, category=MAILTRAP_CATEGORY,
            subject = "Teleconsult Zoom Meeting Link",
            text = DEFAULT_MSG
        )
        Mailtrap_client.send(mail)
        return True
    except Exception as e:
        return False
    
def send_sms():
    try:
        TWILIO_BODY = DEFAULT_MSG
        message = Twilio_client.messages.create(from_=TWILIO_FROM, body=TWILIO_BODY, to=TWILIO_TO)
        # print(message.sid)
        return True
    except Exception as e:
        return False
        


@app.route("/zoom/start", methods=["POST"])
def zoom_api():
    if send_email():
        if send_sms():
            return jsonify(
                {
                    "code": 200,
                    "message": "Successfully sent email using Mailtrap and SMS using Twilio Each email cost $$$!",
                    "data": {
                        "zoom_owner_link": ZOOM_OWNER,
                        "zoom_invite_link": ZOOM_OWNER,

                        "sender_email": MAILTRAP_SENDER_EMAIL,
                        "recipient_email": MAILTRAP_TO_EMAIL,

                        "sender_sms": TWILIO_FROM,
                        "recipient_sms": TWILIO_TO,
                        
                        "team_member_account": TEAM_MEMBER_ACCOUNT
                    }
                }
            ), 200
        else:
            return jsonify(
                {
                    "code": 400,
                    "message": "Successfully sent email using Mailtrap but failed to send SMS using Twilio!",
                    "error": "Failed to send SMS using Twilio!",
                    "data": {
                        "sender_email": MAILTRAP_SENDER_EMAIL,
                        "recipient_email": MAILTRAP_TO_EMAIL,
                        "team_member_account": TEAM_MEMBER_ACCOUNT
                    }
                }
            ), 400
    else:
        return jsonify(
            {
                "code": 400,
                "message": "Failed to send email using Mailtrap! Unable to proceed with sending SMS using Twilio!",
                "error": "Failed to send email using Mailtrap!",
            }
        ), 400

if __name__ == "__main__":
    print("This is flask for " + os.path.basename(__file__) + ": manage zoom ...")
    app.run(host='0.0.0.0', port=5009, debug=True)
