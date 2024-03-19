# Database Connection
from database.db_config import connect_db

# Create Delivery order for testing
def create_delivery_order(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Create Delivery order
    # print(data)
    c.execute("""
    INSERT INTO delivery_order 
    (id, product_list, quantity_list) 
    VALUES (:id, :product_list, :quantity_list)
    """, data)

    # (3) Commit and Close
    conn.commit()
    conn.close()

# Get All Delivery order
def get_all_delivery_order():
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Retrieve results
    c.execute("SELECT * FROM delivery_order")
    results = c.fetchall()

    # (3) Close Connection
    conn.close()
    return results
