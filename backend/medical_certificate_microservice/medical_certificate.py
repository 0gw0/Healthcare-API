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

# Email API
import mailtrap as mt

# Please no DDOS me - I lazy configure environment variable
TEAM_MEMBER_ACCOUNT = "Terris Tan Wei Jun"
TEAM_MEMBER_EMAIL = "terristanwei@gmail.com"
API_ENABLED = True # Set to True to enable API (Email and SMS) - Each email and SMS cost $$$

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


# ReportLab is a Python library that allows you to create PDFs
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

app = Flask(__name__)
CORS(app)  

today = date.today().strftime("%d %B, %Y")
styles = getSampleStyleSheet()

@app.route("/medical_certificate/create", methods=["POST"])
def generate_certificate():
    """
    Generate Certificate

    Example Payload:
    - { "data": {
        "appointment_id": 999,
        "timeslot_datetime": "2025-10-25 15:30:00",
        "duration_minutes": 30,
        "mc_start_datetime": "2025-10-25",
        "mc_days": 1
        }
    }

    Returns:
    - 201: MC created
    - 500: Error creating MC

    Constraints:
    - Data is always correct

    Example Response:
    - Actual PDF file
    - {"code": 500, "message": "Failed to send email using Mailtrap!", "error": ...}
    """
    # (1) Get the data from the JSON request body
    data = json.loads(request.data)
    if "data" in data:
        data = data["data"]

    # (2) Extract ONLY relevant data
    # - Convert the string, if necessary
    APPOINTMENT_ID = str(data.get("appointment_id", "1"))
    # PATIENT_ID = str(data.get("patient_id", "1"))
    # DOCTOR_ID = str(data.get("doctor_id", "1"))

    TIMESLOT_DATETIME = str(data.get("timeslot_datetime", today))
    DURATION_MINUTES = str(data.get("duration_minutes", "30"))

    MC_START_DATETIME = str(data.get("mc_start_datetime", today)) # Also the issue date
    MC_DAYS = str(data.get("mc_days", "1"))

    # (3) Then create default values
    # - Default values are used for testing
    # - Defaults: patient_name, 
    PATIENT_NRIC = "T0193742D"
    PATIENT_NAME = "Dwight Schrute"

    DIAGNOSIS = "UNFIT FOR DUTY"
    
    DOCTOR_NRIC = "M982420A"
    DOCTOR_NAME ="Dr. Michael Scott"

    # (4) Create directory if not exists
    PDF_DIR = "medical_pdf"
    if not os.path.exists(PDF_DIR):
        os.makedirs(PDF_DIR)

    # (5) Create a digital PDF document
    FILE_NAME = f"mc_{PATIENT_NRIC}_{PATIENT_NAME}.pdf".replace(". ", " ").replace(" ", "")
    RESOURCE_PATH = f"./{PDF_DIR}/{FILE_NAME}"
    doc = SimpleDocTemplate(RESOURCE_PATH, pagesize=letter)

    # (6.1) Define the elements to be added to the PDF
    elements = []

    # (6.2) Add a title
    title = Paragraph("Medical Certificate", styles["Heading1"])
    elements.append(title)
    elements.append(Spacer(1, 12))

    # (6.3) Add appointment information
    appointment_info = Paragraph(
        f"Appointment id: {APPOINTMENT_ID}", styles["BodyText"]
    )
    elements.append(appointment_info)
    elements.append(Spacer(1, 12))

    # (6.4) Add patient information
    patient_info = [
        Paragraph(f"Patient Name: {PATIENT_NAME}", styles["BodyText"]),
        Paragraph(f"NRIC: {PATIENT_NRIC}", styles["BodyText"]),
    ]
    elements.extend(patient_info)
    elements.append(Spacer(1, 24))

    # (6.5) Add certificate details
    certificate_details = [
        Paragraph(
            f"This is to certify that {PATIENT_NAME} ({PATIENT_NRIC}) is {DIAGNOSIS} for {MC_DAYS} day(s) from {MC_START_DATETIME} inclusive.",
            styles["BodyText"],
        ),
        Spacer(1, 12),
        Paragraph(f"Issued on: {TIMESLOT_DATETIME}", styles["BodyText"]),
        Paragraph(f"Session duration: {DURATION_MINUTES} minutes", styles["BodyText"]),
        Spacer(1, 12),
        Paragraph(DOCTOR_NAME, styles["BodyText"]),
        Paragraph(f"NRIC: {DOCTOR_NRIC}", styles["BodyText"]),
        Spacer(1, 24),
        Paragraph(f"Please Note:", styles["BodyText"]),
        Paragraph(
            "Not Valid for Absence from Court Attendance\nThis Certificate is electronically generated, no signature is required",
            styles["BodyText"],
        ),
    ]
    elements.extend(certificate_details)

    # (6.6) Build the PDF document
    doc.build(elements)
    
    # (7) Send the PDF as an email attachment
    if API_ENABLED:
        try:
            pdf_attachment = Path(__file__).parent.joinpath(RESOURCE_PATH).read_bytes()
            # Send email with the PDF
            mail = mt.Mail(sender=MAILTRAP_SENDER, to=MAILTRAP_TO, category=MAILTRAP_CATEGORY,
                subject="Medical Certificate",
                text="Please find the attached medical certificate.",
                attachments=[
                    mt.Attachment(
                        content=base64.b64encode(pdf_attachment),
                        filename=FILE_NAME,
                        disposition=mt.Disposition.INLINE,
                        mimetype="application/pdf",
                        content_id=FILE_NAME,
                    )
                ],
            )
            Mailtrap_client.send(mail)
        except Exception as e:
            print(e)
            return jsonify(
                {
                    "code": 500,
                    "message": "Failed to send email using Mailtrap!",
                    "error": e,
                }
            ), 500
        
    # (8) Return the PDF as a response
    response = make_response(open(RESOURCE_PATH, "rb").read())
    response.headers.set("Content-Type", "application/pdf")
    response.headers.set(
        "Content-Disposition", "attachment", filename=RESOURCE_PATH
    )
    # print(response)

    return response

    # return jsonify(
    #     {
    #         "code": "test",
    #     }
    # ), 200


if __name__ == "__main__":
    print("This is flask for " + os.path.basename(__file__) + ": manage medical_certificates ...")
    app.run(host='0.0.0.0', port=5008, debug=True)
