# Class Imports
from database.data.model.patient import Patient
from database.data.model.doctor import Doctor
from database.data.model.nurse import Nurse

# Example data - Can delete
def example():
    patient = Patient('pat1', 'pass123', 'Dwight', 'Schrute', 38, 'M', 'Mr', 'Pdwight.schrute@gmail.com', '9425 6214')
    nurse = Nurse('nur1', 'pass123', 'Pam', 'Beesly', 'F', 'Ms', 'Intern', 1200, 'pam.beasly@yata.com', '8555 7555')
    doc = Doctor('doc1', 'pass123', 'Michael', 'Scott', 'M', 'Senior Doctor', 10000, 'micheal.scott@yata.com', '8323 5123')
    print(patient.getInfo)
    print(nurse.getInfo)
    print(doc.getInfo)

# Dataset 1
def dataset1(type):
    dataset = {
        "patients": [Patient('pat1', 'pass123', 'Dwight', 'Schrute', 38, 'M', 'Mr', 'Pdwight.schrute@gmail.com', '9425 6214')],
        "nurses": [Nurse('nur1', 'pass123', 'Pam', 'Beesly', 'F', 'Ms', 'Intern', 1200, 'pam.beasly@yata.com', '8555 7555')],
        "doctors": [Doctor('doc1', 'pass123', 'Michael', 'Scott', 'M', 'Senior Doctor', 10000, 'micheal.scott@yata.com', '8323 5123')]
    }
    return dataset[type]

