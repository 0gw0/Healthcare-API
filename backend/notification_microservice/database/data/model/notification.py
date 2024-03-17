class Notification:
    def __init__(self, session_id, timeslot_datetime, doctor_id, status, patient_id=None):
        self.session_id = session_id
        self.timeslot_datetime = timeslot_datetime
        
        self.doctor_id = doctor_id
        self.status = status # new, completed, received

        self.patient_id = patient_id # Only for when session_id belongs to appointment_id

    @property
    def getInfo(self):
        return self.__dict__
