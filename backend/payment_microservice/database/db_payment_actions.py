# Database Connection
from database.db_config import connect_db


# Create Timeslot for testing
def create_payment_test(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Create Timeslot
    # print(data)
    c.execute(
        """INSERT INTO payments VALUES (
              :id,
              :patient_id,
              :doctor_id,
              :price,
              :isPaid
            )""",
        data,
    )

    # (3) Commit and Close
    conn.commit()
    conn.close()


# Get All Timeslots
def get_all_payments():
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Retrieve results
    c.execute("SELECT * FROM payments")
    results = c.fetchall()

    # (3) Close Connection
    conn.close()
    return results


# Create payment
def create_payment(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Create Payment
    c.execute(
        """INSERT INTO payments VALUES (
              :id,
              :patient_id,
              :doctor_id,
              :price,
              0
            )""",
        data,
    )

    # (3) Commit and Close
    conn.commit()
    conn.close()


# Get exact Payment
def get_exact_payment(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Retrieve results
    c.execute(
        """SELECT * FROM payments
              WHERE id=:id""",
        data,
    )
    results = c.fetchall()

    # (3) Close Connection
    conn.close()
    return results


# Update payment isPaid by appointment_id
def update_payment_isPaid(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Update Timeslot
    c.execute(
        """UPDATE payments
              SET isPaid=:isPaid
              WHERE id=:id""",
        data,
    )

    # (3) Commit and Close
    conn.commit()
    conn.close()


# Delete payment by appointment_id
def delete_payment_by_id(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Delete Timeslot
    c.execute(
        """DELETE FROM payments
              WHERE id=:id""",
        data,
    )

    # (3) Commit and Close
    conn.commit()
    conn.close()
