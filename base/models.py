from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(blank=True, null=True)
    brand = models.CharField(max_length=100, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Reviews(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    comment = models.TextField(max_length=400, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    peymentMethod = models.CharField(
        max_length=100, blank=True, null=True)
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True)
    isDeliverd = models.BooleanField(default=False)
    deliverAt = models.DateTimeField(auto_now_add=False, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.createdAt)


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.SET_DEFAULT, null=True, blank=True, default=None)
    product = models.ForeignKey(
        Product, on_delete=models.SET_DEFAULT, null=True, default=None)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(blank=True, null=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    image = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.name


class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    city = models.CharField(max_length=200, blank=True, null=True)
    postalCode = models.CharField(max_length=200, blank=True, null=True)
    country = models.CharField(max_length=200, blank=True, null=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.address
