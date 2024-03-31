# Class Imports
from database.data.model.payment import Payment


# Example data - Can delete
def example():
    Payment(1, 1, 1, 20, 0),  # id, patient_id, doctor_id, price, isPaid
    print(Payment.getInfo)


# Dataset 1
# - Must be synced with appointment dataset
# isPaid by default is 0


def dataset1():
    dataset = [
        # Payment(1, 1, 1, 20.0, 0),
        # Payment(5, 1, 1, 30.0, 0),
        # Payment(8, 1, 1, 19.5, 0),
        # Payment(10, 1, 1, 27.5, 0),
        # Payment(12, 1, 1, 58.3, 0),
        # Payment(16, 1, 1, 70.2, 0),
        # Payment(19, 1, 1, 48.6, 0),
        # Payment(21, 1, 1, 136.8, 0),
    ]

    return dataset
