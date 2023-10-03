from rest_framework import serializers, response, status
from base.models import Note, User
from django.db import IntegrityError


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'owner', 'body']


class Userserializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

    def create(self, cd):
        user = User.objects.create_user(username=cd['username'].lower(),
            email=cd['email'], password=cd['password'])
        user.save()
        return user