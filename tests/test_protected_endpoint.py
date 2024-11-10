def test_protected_endpoint_access(client):
    # Without token
    response = client.get('/protected-endpoint')
    assert response.status_code == 401  # Unauthorized

    # With valid token
    valid_token = get_valid_token()  # Implement token generation for testing
    response = client.get('/protected-endpoint', headers={'Authorization': f'Bearer {valid_token}'})
    assert response.status_code == 200

    # With expired token
    expired_token = get_expired_token()
    response = client.get('/protected-endpoint', headers={'Authorization': f'Bearer {expired_token}'})
    assert response.status_code == 401
