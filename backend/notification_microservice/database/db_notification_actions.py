# Database Connection
from database.db_config import connect_db

# Get exact notification by session_id
def get_exact_notification(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Retrieve results
    c.execute("""SELECT * FROM notifications
              WHERE session_id=:session_id"""
            , data)
    results = c.fetchall()

    # (3) Close Connection
    conn.close()
    return results

# Create Notification for testing
def create_notification_test(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Create Notification
    c.execute("""INSERT INTO notifications VALUES (
                :session_id,
                :timeslot_datetime,
                :doctor_id,
                :status,
                :patient_id
            )""", data)

    # (3) Commit and Close
    conn.commit()
    conn.close()

# Get All Notifications
def get_all_notifications(status=None):
    # status: new, completed, received

    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Retrieve results
    if status is None:
        c.execute("SELECT * FROM notifications")
    else:
        c.execute(f"SELECT * FROM notifications WHERE status=:status",
                    {"status": status})
    results = c.fetchall()

    # (3) Close Connection
    conn.close()
    return results

# Create Notification
def create_notification(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Create Notification
    c.execute("""INSERT INTO notifications VALUES (
                :session_id,
                :timeslot_datetime,
                :doctor_id,
                :status,
                :patient_id
            )""", data)

    # (3) Commit and Close
    conn.commit()
    conn.close()

# Update Notification to 'completed' or 'received' by session_id
def update_notification_status_by_session_id(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Update Notification
    c.execute("""UPDATE notifications
              SET status=:status
              WHERE session_id=:session_id
            """, data)

    # (3) Commit and Close
    conn.commit()
    conn.close()

# Get All Notifications by status=completed and by patient_id
def get_all_completed_notifications_by_patient_id(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Retrieve results
    c.execute("""SELECT * FROM notifications
              WHERE status='completed' AND patient_id=:patient_id
            """, data)
    results = c.fetchall()

    # (3) Close Connection
    conn.close()
    return results

# Delete Notification by session_id
def delete_notification_by_session_id(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Delete Notification
    c.execute("""DELETE FROM notifications
              WHERE session_id=:session_id
            """, data)

    # (3) Commit and Close
    conn.commit()
    conn.close()