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

    def validate(self, data):
        user = self.context['request'].user
        category = data.get('category')

        # 공지글 카테고리의 ID가 1이라고 가정
        if category.id == 1 and not user.is_staff:
            raise serializers.ValidationError("공지글은 관리자만 작성할 수 있습니다.")
        
        return data
    

class CommentSerializer(serializers.ModelSerializer):

    
    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ('user', 'post',)