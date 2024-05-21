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
        extra_kwargs = {
            'likes': {'required': False},
        }

    def create(self, validated_data):
        likes_data = validated_data.pop('likes', [])
        post = Post.objects.create(**validated_data)
        post.likes.set(likes_data)
        return post

    def update(self, instance, validated_data):
        likes_data = validated_data.pop('likes', [])
        instance = super().update(instance, validated_data)
        instance.likes.set(likes_data)
        return instance

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
