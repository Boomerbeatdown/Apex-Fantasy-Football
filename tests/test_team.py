# test_team.py
def test_create_team_success(client, auth_token):
    response = client.post(
        '/teams',
        json={'name': 'Team A', 'league_id': 1},
        headers={'Authorization': f'Bearer {auth_token}'}
    )
    assert response.status_code == 201

def test_create_team_unauthorized(client):
    response = client.post('/teams', json={'name': 'Team B', 'league_id': 1})
    assert response.status_code == 403  # Expecting Forbidden without token
