# serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator, UniqueValidator
from dj_rest_auth.registration.serializers import RegisterSerializer
from allauth.account.utils import setup_user_email
from .models import League

# Get the custom User model
User = get_user_model()

# Serializer for League model
class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ['id', 'name', 'commissioner', 'created_at']

# Serializer for detailed League view with commissioner name
class LeagueDetailSerializer(serializers.ModelSerializer):
    commissioner_name = serializers.CharField(source='commissioner.username', read_only=True)

    class Meta:
        model = League
        fields = ['id', 'name', 'commissioner', 'commissioner_name', 'created_at']

# Custom registration serializer to add first and last name fields
class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password1', 'password2']
        validators = [
            UniqueTogetherValidator(
                queryset=User.objects.all(),
                fields=['first_name', 'last_name'],
                message="A user with this first and last name already exists."
            )
        ]

    def validate_email(self, value):
        # Custom email format validation
        if not value.endswith('@example.com'):
            raise serializers.ValidationError("Only emails with '@example.com' are allowed.")
        return value

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['first_name'] = self.validated_data.get('first_name', '')
        data['last_name'] = self.validated_data.get('last_name', '')
        return data

    def save(self, request):
        user = super().save(request)
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        user.save()
        return user

# Serializer for updating user profile
class ProfileSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(source='date_joined', read_only=True)
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'created_at', 'profile_picture')
        read_only_fields = ('email', 'created_at')
        extra_kwargs = {
            'email': {'validators': [UniqueValidator(queryset=User.objects.all())]}
        }

# serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Custom claims
        token['role'] = user.role  # Assuming `role` is a field on your user model
        token['permissions'] = user.get_permissions()  # Assuming a method to get permissions
        return token
