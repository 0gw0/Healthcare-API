class Delivery_Order:
    def __init__(self, id, product_list, quantity_list):
        self.id = id
        self.product_list = product_list # String concatenated with semicolon
        self.quantity_list = quantity_list # String concatenated with semicolon
        
    @property
    def getInfo(self):
        return self.__dict__
