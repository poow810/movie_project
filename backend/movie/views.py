from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Movie, Genre
from django.shortcuts import get_list_or_404, get_object_or_404
from django.contrib.auth.decorators import login_required
from .serializers import MovieSerializer, GenreSerializer
from django.db.models import Count, Q


@api_view(['GET'])
def get_genre(request):
    if request.method == 'GET':
        movies = get_list_or_404(Movie)
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@login_required
def genre_select(request):
    if request.method == 'GET':
        print(request.GET)
        genreIds = request.GET.getlist('genre[]')
        print(genreIds)
        movies = Movie.objects.annotate(num_genres=Count('genres', filter=Q(genres__id__in=genreIds))
        ).filter(num_genres__gt=0).order_by('-num_genres', '-popularity')
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)