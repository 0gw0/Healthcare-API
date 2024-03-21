class Item:
    def __init__(self,name,quantity):
        self.name = name
        self.quantity = quantity

    @property
    def getInfo(self):
        return self.__dict__
