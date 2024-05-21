import random
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from accounts.models import Review
from .models import Movie, Genre
from django.shortcuts import get_list_or_404, get_object_or_404
from django.contrib.auth.decorators import login_required
from .serializers import MovieSerializer, GenreSerializer, ReviewSerializer
from django.db.models import Count, Q


@api_view(['GET'])
def getMovies(request, movie_id):
    if request.method == 'GET':
        movie = get_object_or_404(Movie, id=movie_id)
        serializer = MovieSerializer(movie)
        return Response(serializer.data, status=status.HTTP_200_OK)


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
        genreIds = request.GET.getlist('genre[]')
        movies = Movie.objects.annotate(num_genres=Count('genres', filter=Q(genres__id__in=genreIds))
        ).filter(num_genres__gt=0).order_by('-num_genres', '-popularity')[:20]
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

@api_view(['POST'])
@login_required
def movie_like(request, movie_id):
    if request.method == 'POST':
        movie = get_object_or_404(Movie, movie_id=movie_id)
        if request.user in movie.likes.all():
            movie.likes.remove(request.user)
            is_liked = False
            context = {
                'is_liked': is_liked,
                'like_count': movie.likes.count(),
            }
        
        else:
            movie.likes.add(request.user)
            is_liked = True
            context = {
                'is_liked': is_liked,
                'like_count': movie.likes.count(),
            }
        return Response(context, status=status.HTTP_200_OK)
    

@api_view(['GET', 'POST'])
@login_required
def review(request, movie_id):
    if request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)
        movie = get_object_or_404(Movie, movie_id=movie_id)
        if serializer.is_valid():
            serializer.save(user=request.user, movie=movie)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        movie = get_object_or_404(Movie, movie_id=movie_id)
        reviews = Review.objects.filter(movie=movie, user=request.user)
        if reviews.exists():
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "리뷰가 없습니다."}, status=status.HTTP_404_NOT_FOUND)
        
        
@api_view(['GET'])
@login_required
def weather(request, genre_id):
    if request.method == 'GET':
        genre = get_object_or_404(Genre, id=genre_id)
        
        movies = Movie.objects.filter(genres=genre)        
        if movies:
            random_movie = random.choice(movies)
            
            movie_data = {
                'movie_id': random_movie.movie_id,
                'title': random_movie.title,
                'poster_path': random_movie.poster_path,
                'overview': random_movie.overview,
                'release_date': random_movie.release_date,
                'vote_avg': float(random_movie.vote_avg),
                'popularity': float(random_movie.popularity),
            }
            
            return JsonResponse(movie_data)
        else:
            return JsonResponse({'message': '해당 장르의 영화가 없습니다.'}, status=404)
        

@api_view(['GET'])
def search(request):
    print(request.data)
    if request.method == 'GET':
        text = request.GET.get('text')
        movies = Movie.objects.filter(title__icontains=text)
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)