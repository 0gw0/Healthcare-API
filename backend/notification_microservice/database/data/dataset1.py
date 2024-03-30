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
        Notification(1, "2024-04-04 08:30:00", 1, "new", 1),
        Notification(2, "2024-04-04 09:30:00", 1, "new"),
        Notification(3, "2024-04-04 10:30:00", 1, "new"),
        Notification(4, "2024-04-04 11:30:00", 1, "new"),
        Notification(5, "2024-04-04 12:30:00", 1, "new", 1),
        Notification(6, "2024-04-04 13:30:00", 1, "new"),
        Notification(7, "2024-04-04 14:30:00", 1, "new"),
        Notification(8, "2024-04-04 15:30:00", 1, "new", 1),
        Notification(9, "2024-04-04 15:30:00", 1, "new"),
        Notification(10, "2024-04-04 15:30:00", 1, "new", 1),
    }
    return dataset

