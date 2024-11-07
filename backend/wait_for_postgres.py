import time
import os
import psycopg
from psycopg import OperationalError

host = os.getenv("DB_HOST", "db")
port = os.getenv("DB_PORT", "5432")
user = os.getenv("DB_USER", "boomerbeatdown")
password = os.getenv("DB_PASSWORD", "sooners7")
database = os.getenv("DB_NAME", "apex_fantasy_football_db")

while True:
    try:
        with psycopg.connect(
            f"host={host} port={port} user={user} password={password} dbname={database}"
        ) as conn:
            print("PostgreSQL is available!")
            break
    except OperationalError:
        print("PostgreSQL is unavailable - sleeping")
        time.sleep(2)
