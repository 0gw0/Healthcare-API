# Database Connection
from database.db_config import connect_db

# Get All User by Type
def get_all_user(type="all"):
    if type in ["patients", "nurses", "doctors"]:
        # (1) Database Connection
        conn = connect_db()
        c = conn.cursor()

        # (2) Retrieve results
        c.execute(f"SELECT * FROM {type}")
        results = c.fetchall()
        
        # (3) Commit and Close
        conn.commit()
        conn.close()
    elif type == "all":
        # (1) Database Connection
        conn = connect_db()
        c = conn.cursor()

        # (2) Retrieve results
        c.execute("SELECT * FROM patients")
        results = c.fetchall()
        c.execute("SELECT * FROM nurses")
        results += c.fetchall()
        c.execute("SELECT * FROM doctors")
        results += c.fetchall()

        # (3) Commit and Close
        conn.commit()
        conn.close()
    else:
        return (400, "Invalid User Type")
    return (200, results)

# Get User by ID
def get_user_by_id(type, id):
    if type in ["patients", "nurses", "doctors"]:
        # (1) Database Connection
        conn = connect_db()
        c = conn.cursor()

        # (2) Retrieve results
        c.execute(f"SELECT * FROM {type} WHERE id=:id",
                   {"id": id})
        results = c.fetchone()

        # (3) Commit and Close
        conn.commit()
        conn.close()
    else:
        return "Invalid User Type"
    return results

# Get User by Username
def get_user_by_username(type, username):
    if type in ["patients", "nurses", "doctors"]:
        # (1) Database Connection
        conn = connect_db()
        c = conn.cursor()

        # (2) Retrieve results
        c.execute(f"SELECT * FROM {type} WHERE username=:username",
                   {"username": username})
        results = c.fetchone()
        
        # (3) Commit and Close
        conn.commit()
        conn.close()
    else:
        return "Invalid User Type"
    return results

# Login User
def login_user(type, username, password):
    if type in ["patients", "nurses", "doctors"]:
        # (1) Database Connection
        conn = connect_db()
        c = conn.cursor()

        # (2) Retrieve results
        c.execute(f"SELECT id FROM {type} WHERE username=:username AND password=:password",
                   {"username": username, "password": password})
        results = c.fetchone()
        
        # (3) Commit and Close
        conn.commit()
        conn.close()
    else:
        return "Invalid User Type"
    return results if results else "Invalid Credentials"

# Create User
def create_user(type, data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Create User
    if type == "patients":
        c.execute("""INSERT INTO patients VALUES (
                    NULL,
                    :username,
                    :password,
                    :fname,
                    :lname,
                    :age,
                    :gender,
                    :salutation,
                    :email,
                    :contactNo
        )""", data)
    elif type == "nurses":
        c.execute("""INSERT INTO nurses VALUES (
                NULL,
                :username,
                :password,
                :fname,
                :lname,
                :gender,
                :salutation,
                :position,
                :salary,
                :email,
                :contactNo
        )""", data)
    elif type == "doctors":
        c.execute("""INSERT INTO doctors VALUES (
                NULL,
                :username,
                :password,
                :fname,
                :lname,
                :gender,
                :salutation,
                :position,
                :salary,
                :email,
                :contactNo
        )""", data)
    
    # (3) Commit and Close
    conn.commit()
    conn.close()