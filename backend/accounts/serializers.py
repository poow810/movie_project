from rest_framework import serializers
from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer

from community.models import Comment, Post
from movie.models import Movie


User = get_user_model()


class UserDetailsSerializer(serializers.ModelSerializer):
    followings_count = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'  # 필요한 경우 '__all__' 대신 실제 필드 목록을 명시하고 'followings_count', 'followers_count'를 추가

    def get_followings_count(self, obj):
        return obj.followings.count()

    def get_followers_count(self, obj):
        return obj.followers.count()


class CustomRegisterSerializer(RegisterSerializer):
    nickname = serializers.CharField(
      required=False,
      allow_blank=True,
      max_length=255
    )

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'nickname': self.validated_data.get('nickname', ''),
            'email': self.validated_data.get('email', ''),
        }
    

class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta:
        extra_fields = []
        # see https://github.com/iMerica/dj-rest-auth/issues/181
        # UserModel.XYZ causing attribute error while importing other
        # classes from `serializers.py`. So, we need to check whether the auth model has
        # the attribute or not
        if hasattr(User, 'USERNAME_FIELD'):
            extra_fields.append(User.USERNAME_FIELD)
        if hasattr(User, 'EMAIL_FIELD'):
            extra_fields.append(User.EMAIL_FIELD)
        if hasattr(User, 'first_name'):
            extra_fields.append('first_name')
        if hasattr(User, 'last_name'):
            extra_fields.append('last_name')
        if hasattr(User, 'nickname'):
            extra_fields.append('nickname')    
        model = User
        fields = ('pk', *extra_fields)
        read_only_fields = ('email',)


class FindUserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

# 프로필 페이지에서 작성한 게시글 조회
class UserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'created_at', 'updated_at', 'category', 'like_count']

# 프로필 페이지에서 좋아요 누른 영화 조회
class UserMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['movie_id', 'title', 'poster_path', 'overview', 'release_date', 'vote_avg', 'popularity', 'genres']

    
# 프로필 페이지에서 작성한 댓글 조회
class UserCommentSerializer(serializers.ModelSerializer):
    class PostSerializer(serializers.ModelSerializer):
        class Meta:
            model = Post
            fields = '__all__'
    
    post = PostSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'
