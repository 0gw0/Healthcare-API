from os.path import join, dirname, abspath
import sqlite3

# Database Config
db_name = 'delivery_order.db'
path = dirname(abspath(__file__))
full_path = join(path, db_name)

# Connect to Database
def connect_db():
    conn = sqlite3.connect(full_path)
    conn.row_factory = dict_factory
    return conn

# Set Row Factory
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

# Create Database Tables
def create_db():
    # (1) Database Connection
    conn = connect_db()
    c = conn.cursor()

    # (2) Create Table
    c.execute("""CREATE TABLE IF NOT EXISTS delivery_order (
              id INTEGER PRIMARY KEY,
              product_list TEXT,
              quantity_list INTEGER
            )""")

    # (3) Commit and Close
    conn.commit()
    conn.close()
create_db()
