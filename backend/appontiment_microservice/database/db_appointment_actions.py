# Database Connection
from database.db_config import connect_db

# Create Appointment
def create_appointment(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Create Timeslot
    # print(data)
    c.execute("""INSERT INTO appointments VALUES (
              :id,
              :doctor_id,
              :time_created,
              :timeslot_datetime,
              :duration_minutes,
              :patient_id,
              :time_accepted,
              :isCompleted
            )""", data)

    # (3) Commit and Close
    conn.commit()
    conn.close()

# Get All Appointments
def get_all_appointments():
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Retrieve results
    c.execute("SELECT * FROM appointments")
    results = c.fetchall()

    # (3) Close Connection
    conn.close()
    return results

# Get Timeslot by data and date range
def get_appointment_by_data(data, start_date=None, end_date=None):
    # print(data, start_date, end_date)
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Retrieve results
    keys = ["id", "doctor_id", "time_created", "timeslot_datetime", "duration_minutes", "patient_id", "isCompleted"]
    query = "SELECT * FROM appointments WHERE "
    for key in keys:
        if key in data:
            query += f"{key}=:{key} AND "
    
    # Time range
    if start_date and end_date:
        query += f"timeslot_datetime BETWEEN :start_date AND :end_date"
        data["start_date"] = start_date
        data["end_date"] = end_date
    # Only start_date
    elif start_date:
        query += f"timeslot_datetime>=:start_date"
        data["start_date"] = start_date
    # Only end_date
    elif end_date:
        query += f"timeslot_datetime<=:end_date"
        data["end_date"] = end_date
    # No time range: Remove last "AND"
    else:
        query = query[:-5]
    
    # print(query, data, start_date, end_date)
    c.execute(query, data)
    results = c.fetchall()

    # (3) Close Connection
    conn.close()
    return results

# Delete appointment by id
def delete_appointment_by_id(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Delete Timeslot
    c.execute("""DELETE FROM appointments
              WHERE id=:id"""
            , data)

    # (3) Commit and Close
    conn.commit()
    conn.close()

# Update appointment isCompleted by id
def update_appointment_isCompleted(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Update Timeslot
    c.execute("""UPDATE appointments
              SET isCompleted=:isCompleted
              WHERE id=:id"""
            , data)

    # (3) Commit and Close
    conn.commit()
    conn.close()