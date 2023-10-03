from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('viewallroutes/', getRoutes),
    path('notes/', Notes),
    path('register/', registerUser),
    path('getnote/<int:pk>', getNote)
]