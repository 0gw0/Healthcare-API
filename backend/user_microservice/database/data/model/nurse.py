class Nurse:
    def __init__(self, username, password, fname, lname, gender, salutation, position, salary, email, contactNo):
        self.username = username
        self.password = password

        self.fname = fname
        self.lname = lname
        
        self.gender = gender
        self.salutation = salutation

        self.position = position
        self.salary = salary

        self.email = email
        self.contactNo = contactNo

    @property
    def getInfo(self):
        return self.__dict__
