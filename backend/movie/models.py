from django.db import models

# Create your models here.
class Movie(models.Model):
    movie_id = models.IntegerField()
    title = models.CharField(max_length=100)
    poster_path = models.CharField(max_length=200)
    overview = models.TextField()
    release_date = models.CharField(max_length=100)
    vote_avg = models.DecimalField(max_digits=3, decimal_places=1)
    popularity = models.DecimalField(max_digits=3, decimal_places=1)
    genre = models.CharField(max_length=100)


class Person(models.Model):
    TYPE_CHOICES = [
        ('actor', '배우'),
        ('director', '감독')
    ]
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    name_kr = models.CharField(max_length=100)
    name_en = models.CharField(max_length=100)