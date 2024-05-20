from rest_framework import serializers
from .models import Category, Post, Comment
from django.contrib.auth import get_user_model

User = get_user_model()

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):

    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('id', 'username')


    user = UserSerializer(read_only=True)
    class Meta:
        model = Post
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('nickname', 'user_image')

    user = UserSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ('user', 'post',)


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"

