
import json
import os
import django
import openai
from django.conf import settings

openai.api_key = settings.OPENAI_API_KEY
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from movie.models import Movie, Person

def translate_to_korean(text):
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",  # 사용 가능한 최신 엔진으로 업데이트하세요.
            prompt=f"Translate the following English text to Korean: '{text}'",
            temperature=0.5,
            max_tokens=60,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0
        )
        translation = response.choices[0].text.strip()
        return translation
    except Exception as e:
        print(f"Translation failed: {e}")
        return None



def load_and_process_data(json_file_path):
    with open(json_file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
        
        for movie_data in data:
            movie, created = Movie.objects.get_or_create(
                print(type(movie_data)),
                movie_id=movie_data["movie-id"],
                defaults={
                    'movie-id': movie_data["movie-id"],
                    'title': movie_data['title'],
                    'release_date': movie_data['released_date'],
                    'popularity': movie_data['popularity'],
                    'vote_avg': movie_data['vote_avg'],
                    'overview': movie_data['overview'],
                    'poster_path': movie_data['poster_path'],
                    'genre': movie_data['genre']
                }
            )
            
            for director in movie_data['directors']:
                Person.objects.create(
                    movie=movie,
                    type='director',
                    name_en=director,
                    name_kr=translate_to_korean(director)  # 영어 이름을 한글로 변환
                )
                
            for actor in movie_data['actors']:
                Person.objects.create(
                    movie=movie,
                    type='actor',
                    name_en=actor['name'],
                    name_kr=translate_to_korean(actor['name'])  # 영어 이름을 한글로 변환
                )

if __name__ == "__main__":
    json_file_path = 'example.json'
    load_and_process_data(json_file_path)