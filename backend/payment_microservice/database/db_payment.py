# Datasets
from database.data.dataset1 import dataset1

# Database Connection
from database.db_config import connect_db

# Database Actions
from database.db_payment_actions import (
    create_payment_test,
    get_all_payments,
    get_exact_payment,
)


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
    c.execute(
        """CREATE TABLE IF NOT EXISTS payments (
              id INTEGER PRIMARY KEY,
              patient_id INTEGER,
              doctor_id INTEGER,
              price REAL,
              isPaid INTEGER DEFAULT 0
            )"""
    )

    # (3) Commit and Close
    conn.commit()
    conn.close()


# Delete Database Tables
def delete_db():
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Drop Table
    c.execute("DROP TABLE IF EXISTS payments")

    # (3) Commit and Close
    conn.commit()
    conn.close()


# Add Dataset
def add_dataset(dataset):
    # (1) Create Data
    if dataset == "dataset1":
        payments = dataset1()

    # (2) Insert Data
    for payment in payments:
        check_and_insert_payment(payment.getInfo)


# Check if doctor_id and timeslot_datetime Exists, then Insert User
def check_and_insert_payment(data):
    if len(get_exact_payment(data)) > 0:
        return "Payment Already Exists"
    create_payment_test(data)


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

        data = get_all_payments()
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
