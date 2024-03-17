# Class Imports
from database.data.model.notification import Notification

# Example data - Can delete
def example():
    # Timeslot cancelled
    notification1 = Notification(1, "2024-03-03 08:30:00", 1, "new", 1)
    # Appointment cancelled
    notification2 = Notification(2, "2024-03-03 08:30:00", 1, "new")
    print(notification1.getInfo)
    print(notification2.getInfo)

# Dataset 1
# - Must be synced with timeslot dataset
# - Must be synced with appointment dataset
def dataset1():
    dataset = {
        Notification(1, "2024-03-03 08:30:00", 1, "new", 1),
        Notification(2, "2024-03-03 09:30:00", 1, "new"),
        Notification(3, "2024-03-03 10:30:00", 1, "new"),
        Notification(4, "2024-03-03 11:30:00", 1, "new"),
        Notification(8, "2024-03-03 15:30:00", 1, "new", 1)
    }
    return dataset

