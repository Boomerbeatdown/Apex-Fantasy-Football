# tests.py

from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from ..backend.fantasy.models import League, Team, Invitation


# Auth Tests
class AuthTests(APITestCase):
    def test_registration(self):
        url = reverse('rest_register')
        data = {
            "email": "user@example.com",
            "password1": "password123",
            "password2": "password123",
            "first_name": "John",
            "last_name": "Doe"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('key', response.data)  # Token in response

    def test_login(self):
        # Register a user first
        self.test_registration()

        # Login
        url = reverse('rest_login')
        data = {
            "email": "user@example.com",
            "password": "password123"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('key', response.data)  # Token in response

    def test_logout(self):
        self.test_login()
        url = reverse('rest_logout')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.client.session['key'])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# Model Tests
class LeagueModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username="testuser")
        self.league = League.objects.create(
            name="Test League",
            description="A test league",
            created_by=self.user,
            scoring_system="Custom",
            max_teams=8
        )

    def test_league_creation(self):
        self.assertEqual(self.league.name, "Test League")
        self.assertEqual(self.league.created_by, self.user)
        self.assertEqual(self.league.max_teams, 8)

    def test_league_str_method(self):
        self.assertEqual(str(self.league), "Test League")


class TeamModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username="testuser")
        self.league = League.objects.create(name="Test League", created_by=self.user)
        self.team = Team.objects.create(
            name="Test Team",
            league=self.league,
            user=self.user,
            roster={"players": ["Player1", "Player2"]}
        )

    def test_team_creation(self):
        self.assertEqual(self.team.name, "Test Team")
        self.assertEqual(self.team.league, self.league)
        self.assertEqual(self.team.user, self.user)

    def test_team_roster(self):
        self.assertIn("Player1", self.team.roster["players"])


# League and Team API Tests
class LeagueViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.client.login(username="testuser", password="testpass")

    def test_create_league(self):
        response = self.client.post("/api/leagues/", {
            "name": "Test League",
            "description": "A description",
            "scoring_system": "Custom",
            "max_teams": 10
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Test League")

    def test_list_leagues(self):
        League.objects.create(name="League 1", created_by=self.user)
        League.objects.create(name="League 2", created_by=self.user)
        response = self.client.get("/api/leagues/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)


class TeamViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.league = League.objects.create(name="Test League", created_by=self.user)
        self.client.login(username="testuser", password="testpass")

    def test_create_team(self):
        response = self.client.post("/api/teams/", {
            "name": "Test Team",
            "league": self.league.id,
            "roster": {"players": ["Player1"]}
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Test Team")

    def test_update_roster(self):
        team = Team.objects.create(name="Team A", league=self.league, user=self.user, roster={"players": ["Player1"]})
        response = self.client.patch(f"/api/teams/{team.id}/", {
            "roster": {"players": ["Player1", "Player2"]}
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["roster"]["players"], ["Player1", "Player2"])


# Invitation Flow Tests
class LeagueInvitationFlowTest(APITestCase):
    def setUp(self):
        self.owner = User.objects.create_user(username="owner", password="pass")
        self.invited_user = User.objects.create_user(username="invitee", password="pass")
        self.league = League.objects.create(name="Invite League", created_by=self.owner)
        self.client.login(username="owner", password="pass")

    def test_invitation_flow(self):
        # Step 1: Send an invitation
        response = self.client.post("/api/invitations/", {
            "league": self.league.id,
            "email": self.invited_user.email
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Step 2: Invitee accepts the invitation
        invitation = Invitation.objects.get(email=self.invited_user.email)
        self.client.logout()
        self.client.login(username="invitee", password="pass")
        response = self.client.patch(f"/api/invitations/{invitation.id}/accept/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Step 3: Verify invitee is part of the league
        league_response = self.client.get(f"/api/leagues/{self.league.id}/")
        self.assertEqual(league_response.status_code, status.HTTP_200_OK)
        self.assertIn(self.invited_user.username, [member['username'] for member in league_response.data["members"]])


# Roster Management Flow Test
class TeamRosterManagementFlowTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="teamuser", password="pass")
        self.league = League.objects.create(name="Team League", created_by=self.user)
        self.team = Team.objects.create(name="Test Team", league=self.league, user=self.user, roster={"players": []})
        self.client.login(username="teamuser", password="pass")

    def test_add_and_remove_player_from_roster(self):
        # Add player to roster
        response = self.client.patch(f"/api/teams/{self.team.id}/", {
            "roster": {"players": ["Player1"]}
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Player1", response.data["roster"]["players"])
        
        # Remove player from roster
        response = self.client.patch(f"/api/teams/{self.team.id}/", {
            "roster": {"players": []}
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotIn("Player1", response.data["roster"]["players"])
# tests.py
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class JWTAuthTests(APITestCase):
    def test_login(self):
        response = self.client.post(reverse('token_obtain_pair'), {"username": "user", "password": "password"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_refresh_token(self):
        response = self.client.post(reverse('token_refresh'), {"refresh": "some_refresh_token"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
# tests.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from ..backend.fantasy.models import League  # Import your League model

# Profile Update View Tests
class ProfileUpdateViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    def test_profile_update_successful(self):
        url = reverse('profile-update')  # Replace with actual URL name
        data = {"email": "newemail@example.com"}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], "newemail@example.com")

    def test_profile_update_unauthorized(self):
        self.client.credentials()  # Remove token
        url = reverse('profile-update')
        data = {"email": "unauthorized@example.com"}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_profile_update_missing_field(self):
        url = reverse('profile-update')
        data = {}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_profile_update_invalid_email(self):
        url = reverse('profile-update')
        data = {"email": "invalid-email-format"}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


# League List View Tests
class LeagueListViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    def test_league_list_successful(self):
        League.objects.create(name="League 1", created_by=self.user)
        League.objects.create(name="League 2", created_by=self.user)
        
        url = reverse('league-list')  # Replace with actual URL name
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_league_list_unauthorized(self):
        self.client.credentials()  # Remove token
        url = reverse('league-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_league_list_empty(self):
        url = reverse('league-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)


# Token Edge Case Tests
class TokenEdgeCaseTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        self.token = Token.objects.create(user=self.user)

    def test_access_with_invalid_token(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + "invalidtoken123")
        url = reverse('profile-update')
        response = self.client.put(url, {"email": "new@example.com"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_access_without_token(self):
        url = reverse('profile-update')
        response = self.client.put(url, {"email": "new@example.com"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
# tests/views_tests.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class ProfileUpdateViewTests(APITestCase):
    def setUp(self):
        # Create a test user and token for authentication
        self.user = User.objects.create_user(username="testuser", password="password")
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    def test_profile_update_successful(self):
        # Update the profile with valid data
        url = reverse('profile-update')  # Replace with actual URL name
        data = {"email": "newemail@example.com"}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], "newemail@example.com")

    def test_profile_update_unauthorized(self):
        # Clear authentication and attempt to update the profile
        self.client.credentials()  # Remove token
        url = reverse('profile-update')
        data = {"email": "unauthorized@example.com"}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_profile_update_missing_field(self):
        # Missing email field in the request
        url = reverse('profile-update')
        data = {}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_profile_update_invalid_email(self):
        # Invalid email format
        url = reverse('profile-update')
        data = {"email": "invalid-email-format"}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
# tests/views_tests.py
class LeagueListViewTests(APITestCase):
    def setUp(self):
        # Create test user and authenticate
        self.user = User.objects.create_user(username="testuser", password="password")
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    def test_league_list_successful(self):
        # Create a few leagues and retrieve the list
        League.objects.create(name="League 1", created_by=self.user)
        League.objects.create(name="League 2", created_by=self.user)
        
        url = reverse('league-list')  # Replace with actual URL name
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Expecting 2 leagues

    def test_league_list_unauthorized(self):
        # Attempt to retrieve leagues without authentication
        self.client.credentials()  # Remove token
        url = reverse('league-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_league_list_empty(self):
        # Test league listing with no leagues in the database
        url = reverse('league-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)  # Expecting an empty list
class TokenEdgeCaseTests(APITestCase):
    def setUp(self):
        # Create test user and token
        self.user = User.objects.create_user(username="testuser", password="password")
        self.token = Token.objects.create(user=self.user)

    def test_access_with_invalid_token(self):
        # Set an invalid token in the header
        self.client.credentials(HTTP_AUTHORIZATION="Token " + "invalidtoken123")
        url = reverse('profile-update')
        response = self.client.put(url, {"email": "new@example.com"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_access_without_token(self):
        # Attempt to access without setting a token
        url = reverse('profile-update')
        response = self.client.put(url, {"email": "new@example.com"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
