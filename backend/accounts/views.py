from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_list_or_404, get_object_or_404
from django.contrib.auth import get_user_model
# Create your views here.

User = get_user_model()


@api_view(['GET'])
@login_required
def profile(request, username):
    person = get_object_or_404(User, username=username)
    context = {
        'person': person,
    }
    return Response(context)


@api_view(['POST'])
@login_required
def follow(request, user_pk):
    person = get_object_or_404(User, pk=user_pk)
    if person != request.user:
        if person.followers.filter(pk=request.user.pk).exists():
            person.followers.remove(request.user)
            is_followed = False
        else:
            person.followers.add(request.user)
            is_followed = True
        context = {
            'is_followed': is_followed,
            'follower_count': person.followers.count(),
            'following_count': person.followings.count(),
        }
        return Response(context)
    

