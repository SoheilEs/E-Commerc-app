from django.urls import path
from base.views import user_views


urlpatterns = [
    path('login/', user_views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('register/', user_views.register_user, name='userRegister'),
    path('profile/', user_views.get_userprofile, name='getUserProfile'),
    path('profile/update/', user_views.userprofile, name='UserUpdate'),
    path('', user_views.get_users, name='getUsers'),

    path('update/<int:pk>/', user_views.updateUser, name='user-update'),
    path('<int:pk>/', user_views.getUserById, name='user'),
    path('delete/<int:pk>/', user_views.deleteUser, name='user-delete'),

]
