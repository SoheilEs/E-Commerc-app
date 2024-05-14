from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('',views.getOrders, name='orders'),
    path('add/', views.add_order_items, name='Orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),

    path('<int:pk>/deliver/',views.updateOrderToDelivered, name='order-delivered'),
    path('<int:pk>/', views.getOrderById, name='user-order'),
    path('<int:pk>/pay/', views.updateOrderToPaid, name='pay'),
]
