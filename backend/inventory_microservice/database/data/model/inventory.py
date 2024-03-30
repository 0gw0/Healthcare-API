class Timeslot:
    def __init__(self, doctor_id, time_created, timeslot_datetime, duration_minutes=30, isAccepted=0):
        self.doctor_id = doctor_id
        self.time_created = time_created

        self.timeslot_datetime = timeslot_datetime
        self.duration_minutes = duration_minutes
        
        self.isAccepted = isAccepted

    @property
    def getInfo(self):
        return self.__dict__
