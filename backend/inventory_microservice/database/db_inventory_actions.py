# Database Connection
from database.db_config import connect_db

# Create Item for testing
def create_item(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Create Item
    # print(data)
    c.execute("""INSERT INTO inventory VALUES (
              NULL,
              :name,
              :quantity
            )""", data)

    # (3) Commit and Close
    conn.commit()
    conn.close()

# Get All Items
def get_all_items():
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Retrieve results
    c.execute("SELECT * FROM inventory")
    results = c.fetchall()

    # (3) Close Connection
    conn.close()
    return results

#Update Item Quantity
def update_item_quantity(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()
    
    #(2) Update Item Quantity
    c.execute("""UPDATE inventory
              SET quantity = :quantity
              WHERE id = :id"""
            , data)
    
    # (3) Close Connection
    conn.commit()
    conn.close()
    
# Get Item by ID
def get_item_by_id(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Retrieve results
    print(data)
    c.execute("""SELECT * FROM inventory
              WHERE id=:id"""
                , data)

    # fetches an item
    item = c.fetchone()
    print(item)
    # (3) Close Connection
    conn.close()
    if item:
        return item
    else:   
        return None