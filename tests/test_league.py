# test_league.py
def test_create_league_success(client, auth_token):
    response = client.post(
        '/leagues',
        json={'name': 'My League'},
        headers={'Authorization': f'Bearer {auth_token}'}
    )
    assert response.status_code == 201

def test_create_league_invalid_data(client, auth_token):
    response = client.post(
        '/leagues',
        json={},  # Missing 'name'
        headers={'Authorization': f'Bearer {auth_token}'}
    )
    assert response.status_code == 400
