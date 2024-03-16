class Appointment:
    def __init__(self, id, doctor_id, time_created, timeslot_datetime, duration_minutes, patient_id, time_accepted, isCompleted=0):
        self.id = id
        self.doctor_id = doctor_id
        self.time_created = time_created

        self.timeslot_datetime = timeslot_datetime
        self.duration_minutes = duration_minutes
        
        self.patient_id = patient_id
        self.time_accepted = time_accepted
        self.isCompleted = isCompleted

    @property
    def getInfo(self):
        return self.__dict__
