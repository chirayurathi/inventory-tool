from django.db import models
from datetime import date
from django.utils.timezone import now
# Create your models here.
class Product(models.Model):
    product_id = models.IntegerField(primary_key=True)
    product_name = models.CharField(max_length=100)
    product_price = models.FloatField()

class ProductUnit(models.Model):
    barcode = models.BigIntegerField(primary_key=True)
    Product = models.ForeignKey('Product',on_delete=models.CASCADE)
    STATUS_CHOICES = [
        ('IMPORTED','IMPORTED'),
        ('EXPORTED','EXPORTED'),
        ('HYDRABAD','HYDRABAD'),
        ('BANGLORE','BANGLORE'),
        ('CHENNAI','CHENNAI'),
        ('MUMBAI','MUMBAI'),
        ('DELHI','DELHI'),
        ('SURAT','SURAT'),
        ('GOA','GOA')
    ]
    status = models.CharField(choices=STATUS_CHOICES,max_length=50)
    added_on = models.DateField(default=now)
    shipped_on = models.DateField(blank=True,null=True)

class StatusUpdate(models.Model):
    ProductUnit = models.ForeignKey('ProductUnit',on_delete=models.CASCADE)
    STATUS_CHOICES = [
        ('IMPORTED','IMPORTED'),
        ('EXPORTED','EXPORTED'),
        ('HYDRABAD','HYDRABAD'),
        ('BANGLORE','BANGLORE'),
        ('CHENNAI','CHENNAI'),
        ('MUMBAI','MUMBAI'),
        ('DELHI','DELHI'),
        ('SURAT','SURAT'),
        ('GOA','GOA')
    ]
    from_location = models.CharField(choices=STATUS_CHOICES,max_length=50)
    to_location = models.CharField(choices=STATUS_CHOICES,max_length=50)
    update_time = models.DateField(default=now)
    remark = models.CharField(max_length=100,null=True,blank=True)
