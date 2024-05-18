from rest_framework import serializers
from .models import Movie, Genre
from django.contrib.auth import get_user_model


# 장르 조회
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = "__all__"


# 영화 조회
class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    liked_count = serializers.IntegerField(source='liked_movies.count', read_only=True)

    class Meta:
        model = Movie
        fields = [
            'movie_id',
            'title',
            'poster_path',
            'overview',
            'release_date',
            'vote_avg',
            'popularity',
            'genres',
            'liked_count', 
        ]