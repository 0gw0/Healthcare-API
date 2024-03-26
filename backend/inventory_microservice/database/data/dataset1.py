# Class Imports
from database.data.model.inventory import Item

# Example data - Can delete
def example():
    item = Item()
    print(item.getInfo)

# Dataset 1
def dataset1():
    dataset = [
            Item('Paracetamol',30),
            Item('Hydrocodone',29),
            Item('Metformin',16),
            Item('Losartan',19),
            Item('Antibiotics',12),
            Item('Albuterol',37),
            Item('Antihistamine',23),
            Item('Gabapentin',25),
            Item('Atorvastatin',20),
            Item('Levothyroxine',27),
            Item('Omeprazole',46),
        ]
    return dataset

