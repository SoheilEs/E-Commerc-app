from django.urls import path
from base.views import product_views


urlpatterns = [

    path('', product_views.get_products, name="getProducts"),
    path('create/', product_views.create_product, name='create-product'),
    path('upload/',product_views.uploadImage,name='image-upload'),
    path('<int:pk>/reviews/', product_views.createProductReview, name="product-review"),
    path('top/',product_views.getTopProducts,name='top-product'),
    path('<int:pk>/', product_views.get_product, name="getProduct"),
    path('update/<int:pk>/', product_views.update_product, name='product-update'),
    path('delete/<int:pk>/', product_views.delete_product, name='product-delete')

]
