# Class Imports
from database.data.model.appointment import Appointment


# Example data - Can delete
def example():
    Appointment(
        1,  # id
        1,  # doctor_id
        "2024-02-28 13:00:00",  # time_created
        "2024-03-03 08:30:00",  # timeslot_datetime
        30,  # duration_minutes
        1,  # patient_id
        "2024-02-28 19:00:00",  # time_accepted
        1,  # isCompleted - Default=0
    ),
    print(Appointment.getInfo)


# Dataset 1
# - Must be synced with timeslot dataset
# - timeslot must be isAccepted=1
def dataset1():
    dataset = [
<<<<<<< Updated upstream
        # Appointments for 2024-03-03
        Appointment(
            1,
            1,
            "2024-02-28 13:00:00",
            "2024-03-03 08:30:00",
            30,
            1,
            "2024-02-28 19:00:00",
        ),
        Appointment(
            5,
            1,
            "2024-02-28 13:04:00",
            "2024-03-03 12:30:00",
            30,
            1,
            "2024-02-28 19:04:00",
        ),
        Appointment(
            8,
            1,
            "2024-02-28 13:07:00",
            "2024-03-03 15:30:00",
            30,
            1,
            "2024-02-28 19:07:00",
            1,
        ),
        Appointment(
            10,
            1,
            "2024-02-28 13:09:00",
            "2024-03-03 17:30:00",
            30,
            1,
            "2024-02-28 19:09:00",
        ),
        # Appointments for 2024-03-06
        Appointment(
            12,
            1,
            "2024-02-28 13:11:00",
            "2024-03-06 08:30:00",
            30,
            1,
            "2024-03-4 10:11:00",
        ),
        Appointment(
            16,
            1,
            "2024-02-28 13:15:00",
            "2024-03-06 12:30:00",
            30,
            1,
            "2024-03-4 10:15:00",
            1,
        ),
        # Appointments for 2024-03-07
        Appointment(
            19,
            1,
            "2024-02-28 13:18:00",
            "2024-03-07 15:30:00",
            30,
            1,
            "2024-03-4 10:18:00",
        ),
        Appointment(
            21,
            1,
            "2024-02-28 13:20:00",
            "2024-03-07 17:30:00",
            30,
            1,
            "2024-03-4 10:20:00",
        ),
    ]

=======
            # Appointments for 2024-04-04 (Thurs)
            Appointment(1, 1, '2024-02-28 13:00:00', '2024-04-04 08:30:00', 30, 1, '2024-04-01 19:00:00'),
            Appointment(5, 1, '2024-02-28 13:00:00', '2024-04-04 12:30:00', 30, 1, '2024-04-01 19:04:00'),
            Appointment(8, 1, '2024-02-28 13:00:00', '2024-04-04 15:30:00', 30, 1, '2024-04-01 19:07:00', 1),
            Appointment(10, 1, '2024-02-28 13:00:00', '2024-04-04 17:30:00', 30, 1, '2024-04-01 19:09:00'),
            
            # Appointments for 2024-04-08 (Mon)
            Appointment(11, 1, '2024-02-28 13:01:00', '2024-04-08 08:30:00', 30, 1, '2024-04-02 10:11:00'),
            Appointment(15, 1, '2024-02-28 13:01:00', '2024-04-08 12:30:00', 30, 1, '2024-04-02 10:15:00', 1),

            # Appointments for 2024-04-09 (Tue)
            Appointment(28, 1, '2024-02-28 13:02:00', '2024-04-09 15:30:00', 30, 1, '2024-04-02 10:18:00'),
            Appointment(30, 1, '2024-02-28 13:02:00', '2024-04-09 17:30:00', 30, 1, '2024-04-02 10:20:00'),
        ]
    
>>>>>>> Stashed changes
    return dataset
