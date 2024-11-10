import pytest
from app import create_app  # assuming create_app initializes your Flask app
from flask import json

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_login_success(client):
    response = client.post('/auth/login', json={'username': 'testuser', 'password': 'password'})
    assert response.status_code == 200
    assert 'token' in response.json  # Assuming token is returned on successful login

def test_login_invalid_credentials(client):
    response = client.post('/auth/login', json={'username': 'wronguser', 'password': 'wrongpassword'})
    assert response.status_code == 401

def test_token_expiration(client):
    # Assume we have a function `get_expired_token` for testing expired tokens
    expired_token = get_expired_token()
    response = client.get('/protected-endpoint', headers={'Authorization': f'Bearer {expired_token}'})
    assert response.status_code == 401
