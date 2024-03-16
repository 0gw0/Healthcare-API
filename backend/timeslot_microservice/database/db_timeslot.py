# Datasets
from database.data.dataset1 import dataset1

# Database Connection
from database.db_config import connect_db

# Database Actions
from database.db_timeslot_actions import create_timeslot_test, get_all_timeslots, get_exact_timeslot

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
    c.execute("""CREATE TABLE IF NOT EXISTS timeslots (
              id INTEGER PRIMARY KEY,
              doctor_id INTEGER,
              time_created TIMESTAMP,
              timeslot_datetime TIMESTAMP,
              duration_minutes INTEGER DEFAULT 30,
              isAccepted INTEGER DEFAULT 0
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
    c.execute("DROP TABLE IF EXISTS timeslots")

    # (3) Commit and Close
    conn.commit()
    conn.close()

# Add Dataset 
def add_dataset(dataset):
    # (1) Create Data
    if dataset == "dataset1":
        timeslots = dataset1()

    # (2) Insert Data
    for timeslot in timeslots:
        check_and_insert_timeslot(timeslot.getInfo)

# Check if doctor_id and timeslot_datetime Exists, then Insert User
def check_and_insert_timeslot(data):
    if len(get_exact_timeslot(data)) > 0:
        return "Timeslot Already Exists"
    create_timeslot_test(data)

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

        data = get_all_timeslots()
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