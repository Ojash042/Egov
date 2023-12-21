from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["user_first_name", "user_last_name", "user_email", "user_contact_info", "password"]
        extra_kwargs = {'password': {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
