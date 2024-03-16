from os.path import join, dirname, abspath
import sqlite3

# Database Config
db_name = 'appointments.db'
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