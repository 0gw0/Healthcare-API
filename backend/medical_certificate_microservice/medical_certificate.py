#!/usr/bin/env python3
# The above shebang (#!) operator tells Unix-like environments
# to run this file as a python3 script

import os
from flask import Flask, make_response, request, jsonify
from flask_cors import CORS
import json

from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from datetime import date

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
            "appointment_id": 1, 
            "timeslot_datetime": "2024-03-03 15:30:00", 
            "duration_minutes": 30,
            "mc_start_datetime": "2024-03-03",
            "mc_days": 1
        } 
    }

    Returns:
    - 201: MC created

    Constraints:
    - Data is always correct

    Example Response:
    - Actual PDF file
    """
    # (1) Get the data from the JSON request body
    data = json.loads(request.data)

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
    PATIENT_NAME = "Mr. Dwight Schrute"

    DIAGNOSIS = "UNFIT FOR DUTY"
    
    DOCTOR_NRIC = "M982420A"
    DOCTOR_NAME ="Dr. Michael Scott"

    # Create a digital PDF document
    RESOURCE_PATH = f"./medical_pdf/mc_{PATIENT_NRIC}_{PATIENT_NAME}.pdf".replace(". ", " ").replace(" ", "")
    doc = SimpleDocTemplate(RESOURCE_PATH, pagesize=letter)

    # Define the elements to be added to the PDF
    elements = []

    # Add a title
    title = Paragraph("Medical Certificate", styles["Heading1"])
    elements.append(title)
    elements.append(Spacer(1, 12))

    # Add appointment information
    appointment_info = Paragraph(
        f"Appointment id: {APPOINTMENT_ID}", styles["BodyText"]
    )
    elements.append(appointment_info)
    elements.append(Spacer(1, 12))

    # Add patient information
    patient_info = [
        Paragraph(f"Patient Name: {PATIENT_NAME}", styles["BodyText"]),
        Paragraph(f"NRIC: {PATIENT_NRIC}", styles["BodyText"]),
    ]
    elements.extend(patient_info)
    elements.append(Spacer(1, 24))

    # Add certificate details
    certificate_details = [
        Paragraph(
            f"This is to certify that {PATIENT_NAME} ({PATIENT_NRIC}) is {DIAGNOSIS} for {MC_DAYS} day(s) from {MC_START_DATETIME} inclusive.",
            styles["BodyText"],
        ),
        Spacer(1, 12),
        Paragraph(f"Issued on: {TIMESLOT_DATETIME}", styles["BodyText"]),
        Paragraph(f"Duration: {DURATION_MINUTES} minutes", styles["BodyText"]),
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

    # Build the PDF document
    doc.build(elements)

    # Return the PDF as a response
    response = make_response(open(RESOURCE_PATH, "rb").read())
    response.headers.set("Content-Type", "application/pdf")
    response.headers.set(
        "Content-Disposition", "attachment", filename=RESOURCE_PATH
    )

    print(response)

    return response

    # return jsonify(
    #     {
    #         "code": "test",
    #     }
    # ), 200


if __name__ == "__main__":
    print("This is flask for " + os.path.basename(__file__) + ": manage medical_certificates ...")
    app.run(host='0.0.0.0', port=5008, debug=True)
