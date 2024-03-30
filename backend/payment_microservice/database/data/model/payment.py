class Payment:
    def __init__(self, id, patient_id, doctor_id, price, isPaid=0):
        self.id = id
        self.patient_id = patient_id
        self.doctor_id = doctor_id
        self.price = price
        self.isPaid = isPaid

    @property
    def getInfo(self):
        return self.__dict__
