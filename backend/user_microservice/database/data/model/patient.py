class Patient:
    def __init__(self, username, password, fname, lname, age, gender, salutation, email, contactNo):
        self.username = username
        self.password = password

        self.fname = fname
        self.lname = lname
        
        self.age = age
        self.gender = gender
        self.salutation = salutation

        self.email = email
        self.contactNo = contactNo

    @property
    def getInfo(self):
        return self.__dict__
