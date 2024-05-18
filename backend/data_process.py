
import json
import os
import django
import openai
from django.conf import settings
from openai import OpenAI

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
client = OpenAI(
    # This is the default and can be omitted
    api_key=settings.OPENAI_API_KEY,
)
django.setup()

from movie.models import Genre, Movie, Person

def translate_to_korean(text):
    try:
        chat_completion = client.chat.completions.create(
        messages=[
            {
            "role": "user",
            "content": f"Translate the following text to Korean. If text is already Korean, please return korean text: '{text}'"
            }
        ],
        model="gpt-3.5-turbo",
        )
        print(chat_completion)
        # 수정된 부분: 응답 구조에 맞게 접근
        translated_text = chat_completion.choices[0].message.content.strip()
        
        if translated_text:
            return translated_text
        else:
            return text
    except Exception as e:
        print(f"Translation failed: {e}")
        return text


def load_and_process_data(json_file_path):
    with open(json_file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
        
        # `data`가 리스트라고 가정하면, `movie_data`를 순회합니다.
        # 만약 `data`가 단일 객체라면, 반복문 대신 직접 참조해야 합니다.
        movie, created = Movie.objects.get_or_create(
            movie_id=data["movie-id"], # 수정된 필드 이름
            defaults={
                'title': data['title'],
                'release_date': data['released_date'],
                'popularity': data['popularity'],
                'vote_avg': data['vote_avg'],
                'overview': data['overview'],
                'poster_path': data['poster_path'],
            }
        )

        genre_instances = []
        for genre_id in data['genres']:
            genre, _ = Genre.objects.get_or_create(id=genre_id)
            genre_instances.append(genre)

            # Movie 인스턴스와 Genre 인스턴스 연결
            # 만약 영화가 새로 생성된 경우 또는 장르를 업데이트하고 싶은 경우
            movie.genres.set(genre_instances)
        print('hi')
        
        for director in data['directors']:
            Person.objects.create(
                movie=movie,
                type='director',
                name_en=director,
                name_kr=translate_to_korean(director)  # 영어 이름을 한글로 변환, `translate_to_korean` 함수 구현 필요
            )
            
        for actor in data['actors']:
            Person.objects.create(
                movie=movie,
                type='actor',
                name_en=actor['name'],
                name_kr=translate_to_korean(actor['name'])  # 영어 이름을 한글로 변환, `translate_to_korean` 함수 구현 필요
            )

if __name__ == "__main__":
    json_file_path = 'example.json'
    load_and_process_data(json_file_path)