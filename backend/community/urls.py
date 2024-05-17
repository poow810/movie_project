from django.urls import path
from . import views

urlpatterns = [
    path('/', views.post),
    path('create/', views.post),
    path('edit/<int:post_id>/', views.editPost),
    path('comments/', views.comment),
    path('comments/<int:post_id>/<int:comment_id>/', views.commentUpdate),
    path('comments/<int:post_id>/', views.commentDelete),
]
