from flask import Flask, make_response, request
import json
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from datetime import date

today = date.today().strftime("%d %B, %Y")

app = Flask(__name__)

styles = getSampleStyleSheet()


@app.route("/medical_certificate/create/<string:appointment_id>", methods=["POST"])
def generate_certificate(appointment_id):
    # Get the data from the JSON request body w/ default values
    data = json.loads(request.data)
    patient_name = data.get("patient_name", "John Doe")
    patient_id = data.get("patient_id", "T0193742D")
    diagnosis = data.get("diagnosis", "UNFIT FOR DUTY")
    issue_date = data.get("issue_date", today)
    mc_days = data.get("mc_days", "1")
    mc_start_date = data.get("mc_start_date", today)
    doctor_name = data.get("doctor_name", "Dr. Jane Smith")
    doctor_id = data.get("doctor_id", "M982420A")

    # Create a PDF document
    doc = SimpleDocTemplate("medical_certificate.pdf", pagesize=letter)

    # Define the elements to be added to the PDF
    elements = []

    # Add a title
    title = Paragraph("Medical Certificate", styles["Heading1"])
    elements.append(title)
    elements.append(Spacer(1, 12))

    # Add appointment information
    appointment_info = Paragraph(
        f"Appointment id: {appointment_id}", styles["BodyText"]
    )
    elements.append(appointment_info)
    elements.append(Spacer(1, 12))

    # Add patient information
    patient_info = Paragraph(f"Patient Name: {patient_name}", styles["BodyText"])
    elements.append(patient_info)
    elements.append(Spacer(1, 24))

    # Add certificate details
    certificate_details = [
        Paragraph(
            f"This is to certify that {patient_name} ({patient_id}) is {diagnosis} for {mc_days} day(s) from {mc_start_date} inclusive.",
            styles["BodyText"],
        ),
        Spacer(1, 12),
        Paragraph(f"Issued on: {issue_date}", styles["BodyText"]),
        Spacer(1, 12),
        Paragraph(doctor_name, styles["BodyText"]),
        Paragraph(f"({doctor_id})", styles["BodyText"]),
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
    response = make_response(open("medical_certificate.pdf", "rb").read())
    response.headers.set("Content-Type", "application/pdf")
    response.headers.set(
        "Content-Disposition", "attachment", filename="medical_certificate.pdf"
    )
    return response


if __name__ == "__main__":
    app.run(debug=True)
