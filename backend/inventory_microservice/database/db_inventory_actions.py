# Database Connection
from database.db_config import connect_db

# Create Item for testing
def create_item_test(data):
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
def update_item(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()
    
    #(2) Update Item Quantity
    c.execute("""UPDATE inventory
              SET quantity = 
              WHERE id = :id"""
            , data)
    
    
    # (3) Close Connection
    conn.commit()
    conn.close()
    
# Get exact Item
def get_exact_item(data):
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Retrieve results
    c.execute("""SELECT * FROM inventory
              WHERE name=:name"""
            , data)
    # fetches a list of items
    results = c.fetchall() 

    # (3) Close Connection
    conn.close()
    return results

# # Get Timeslot by data and date range
# def get_timeslot_by_data(data, start_date=None, end_date=None):
#     # print(data, start_date, end_date)
#     # (1) Database Connection
#     conn = connect_db()
#     c = conn.cursor()

#     # (2) Retrieve results
#     keys = ["id", "doctor_id", "timeslot_datetime", "isAccepted"]
#     query = "SELECT * FROM timeslots WHERE "
#     for key in keys:
#         if key in data:
#             query += f"{key}=:{key} AND "
    
#     # Time range
#     if start_date and end_date:
#         query += f"timeslot_datetime BETWEEN :start_date AND :end_date"
#         data["start_date"] = start_date
#         data["end_date"] = end_date
#     # Only start_date
#     elif start_date:
#         query += f"timeslot_datetime>=:start_date"
#         data["start_date"] = start_date
#     # Only end_date
#     elif end_date:
#         query += f"timeslot_datetime<=:end_date"
#         data["end_date"] = end_date
#     # No time range: Remove last "AND"
#     else:
#         query = query[:-5]
    
#     print(query, data, start_date, end_date)
#     c.execute(query, data)
#     results = c.fetchall()

#     # (3) Close Connection
#     conn.close()
#     return results

# Create time slot
# def create_timeslot(data):
#     # (1) Database Connection
#     conn = connect_db()
#     c = conn.cursor()

#     # (2) Create Timeslot
#     c.execute("""INSERT INTO timeslots VALUES (
#               NULL,
#               :doctor_id,
#               :time_created,
#               :timeslot_datetime,
#               30,
#               0
#             )""", data)

#     # (3) Commit and Close
#     conn.commit()
#     conn.close()

# # Update time slot isAccepted by id
# def update_timeslot_isAccepted(data):
#     # (1) Database Connection
#     conn = connect_db()
#     c = conn.cursor()

#     # (2) Update Timeslot
#     c.execute("""UPDATE timeslots
#               SET isAccepted=:isAccepted
#               WHERE id=:id"""
#             , data)

#     # (3) Commit and Close
#     conn.commit()
#     conn.close()

# # Delete time slot by id
# def delete_timeslot_by_id(data):
#     # (1) Database Connection
#     conn = connect_db()
#     c = conn.cursor()

#     # (2) Delete Timeslot
#     c.execute("""DELETE FROM timeslots
#               WHERE id=:id"""
#             , data)

    # (3) Commit and Close
    conn.commit()
    conn.close()