# Datasets
from database.data.dataset1 import dataset1

# Database Connection
from database.db_config import connect_db

# Database Actions
from database.db_user_actions import get_all_user, get_user_by_id, get_user_by_username, login_user, create_user

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
    c.execute("""CREATE TABLE IF NOT EXISTS patients (
              id INTEGER PRIMARY KEY,
              username TEXT,
              password TEXT,
              fname TEXT,
              lname TEXT,
              age INTEGER,
              gender TEXT,
              salutation TEXT,
              email TEXT,
              contactNo TEXT
            )""")
    c.execute("""CREATE TABLE IF NOT EXISTS nurses (
              id INTEGER PRIMARY KEY,
              username TEXT,
              password TEXT,
              fname TEXT,
              lname TEXT,
              gender TEXT,
              salutation TEXT,
              position TEXT,
              salary REAL,
              email TEXT,
              contactNo TEXT
            )""")
    c.execute("""CREATE TABLE IF NOT EXISTS doctors (
              id INTEGER PRIMARY KEY,
              username TEXT,
              password TEXT,
              fname TEXT,
              lname TEXT,
              gender TEXT,
              salutation TEXT,
              position TEXT,
              salary REAL,
              email TEXT,
              contactNo TEXT
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
    c.execute("DROP TABLE IF EXISTS patients")
    c.execute("DROP TABLE IF EXISTS nurses")
    c.execute("DROP TABLE IF EXISTS doctors")

    # (3) Commit and Close
    conn.commit()
    conn.close()

# Add Dataset 
def add_dataset(dataset):
    # (1) Create Data
    if dataset == "dataset1":
        patients = dataset1("patients")
        nurses = dataset1("nurses")
        doctors = dataset1("doctors")

    # (2) Insert Data
    for patient in patients:
        check_and_insert_user("patients", patient.getInfo)
    for nurse in nurses:
        check_and_insert_user("nurses", nurse.getInfo)
    for doctor in doctors:
        check_and_insert_user("doctors", doctor.getInfo)

# Check if User Exists, then Insert User
def check_and_insert_user(type, data):
    if get_user_by_username(type, data["username"]):
        return "User Already Exists"
    create_user(type, data)

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

        data = get_all_user()[1]
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

# Not to be called directly
# - These are example usages
def test_cases():
    request_reset_db() # Returns 'Database reset! No Dataset was used'
    request_reset_db("dataset1")
    request_reset_db("dataset2") # Database was not reset. Invalid Dataset: {dataset}
    request_reset_db("yo") # Database was not reset. Invalid Dataset: {dataset}

    # db_user_actions.py
    print(get_all_user())
    print(get_all_user("patients"))
    print(get_all_user("nurses"))
    print(get_all_user("doctors"))
    print(get_all_user("yo")) # Returns 'Invalid User Type'

    # db_user_actions.py
    print(get_user_by_id("patients", 0)) # Returns 'No User Found'
    print(get_user_by_id("patients", 1))
    print(get_user_by_id("nurses", 1))
    print(get_user_by_id("doctors", 1))
    print(get_user_by_id("yo", 1)) # Returns 'Invalid User Type'

    # db_user_actions.py
    print(login_user("patients", "pat1", "pass123"))
    print(login_user("nurses", "nur1", "pass123"))
    print(login_user("doctors", "doc1", "pass123"))
    print(login_user("patients", "obviously wrong", "pass123")) # Returns 'Invalid Credentials'