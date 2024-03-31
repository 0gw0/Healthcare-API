# Datasets
from database.data.dataset1 import dataset1

# Database Connection
from database.db_config import connect_db
from database.db_delivery_order_actions import create_delivery_order, get_all_delivery_order

# Get Tables Names
def get_tables():
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Retrieve results
    c.execute("SELECT name FROM sqlite_schema")
    table_names = c.fetchall()

    # (3) Close Connection
    conn.close()
    return table_names

# Create Database Tables
def create_db():
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Create Table
    c.execute("""CREATE TABLE IF NOT EXISTS delivery_order (
              id INTEGER PRIMARY KEY,
              item_list TEXT,
              quantity_list INTEGER
            )""")

    # (3) Commit and Close
    conn.commit()
    conn.close()

# Delete Database Tables
def delete_db():
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Drop Table
    c.execute("DROP TABLE IF EXISTS delivery_order")

    # (3) Commit and Close
    conn.commit()
    conn.close()

# Add Dataset 
def add_dataset(dataset):
    # (1) Create Data
    if dataset == "dataset1":
        delivery_orders = dataset1()

    # (2) Insert Data
    for delivery_order in delivery_orders:
        create_delivery_order(delivery_order.getInfo)

# Reset Database Tables
def reset_db():
    print("Resetting Database ...")
    delete_db()
    create_db()
    print("Database Reset Complete!")
    print("Current Tables:", get_tables())

# Reset Database Tables
def request_reset_db(dataset="empty"):
    if dataset == "dataset1":
    # if type in ["dataset1", "dataset2"]:
        reset_db()

        print("\nAdding Dataset 1 ...")
        add_dataset(dataset)
        print("Dataset 1 Added!")

        data = get_all_delivery_order()
        print("Current Database:", data)
        return (205, data)
    elif dataset != "empty":
        msg = f"Database was not reset. Invalid Dataset: {dataset}"
        print(msg)
        return (400, msg)

    reset_db()
    msg = "Database reset! No Dataset was used"
    print(msg)
    return (205, msg)