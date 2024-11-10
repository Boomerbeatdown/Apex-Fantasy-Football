# tests/test_helpers.py
import jwt
import datetime
from config import SECRET_KEY, ALGORITHM  # Import configuration

def get_valid_token():
    payload = {
        "user_id": 1,  # Replace with actual data if needed
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def get_expired_token():
    payload = {
        "user_id": 1,
        "exp": datetime.datetime.utcnow() - datetime.timedelta(minutes=15)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
