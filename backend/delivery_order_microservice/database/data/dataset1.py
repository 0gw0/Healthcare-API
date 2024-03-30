# Class Imports
from database.data.model.delivery_order import Delivery_Order

# Example data - Can delete
def example():
    # Timeslot cancelled
    delivery_order1 = Delivery_Order(1, "Amoxicillin;Levothyroxine", "5;10")
    # Appointment cancelled
    delivery_order1 = Delivery_Order(8, "Amoxicillin;Levothyroxine", "1;3")
    print(delivery_order1.getInfo)
    print(delivery_order1.getInfo)

# Dataset 1
# - Must be synced with payment dataset
#   - Payment must be made before delivery
# - Must be synced with MC dataset
#   - MC must be issued while creating delivery
# - Must be synced with inventory dataset
#   - Inventory data must be synced when delivery
# - Must be synced with appointment dataset
#   - Appointment ID must exists
def dataset1():
    # Empty Dataset
    dataset = {}
    return dataset

