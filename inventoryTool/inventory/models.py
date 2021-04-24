from django.db import models
from datetime import date
from random import randint
# Create your models here.
class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=100)
    processor = models.CharField(max_length=100,null=True,blank=True)
    operating_system = models.CharField(max_length=100,null=True,blank=True)
    ram = models.CharField(max_length=3,null=True,blank=True)
    TYPE_CHOICES = [
        ('laptop','laptop'),
        ('charger','charger'),
        ('monitor','monitor'),
        ('keyboard','keyboard'),
        ('mouse','mouse'),
        ('cabinet','cabinet'),
        ('SMPS','SMPS'),
        ('graphic card','graphic card'),
        ('RAM','RAM'),
        ('HDD','HDD'),
        ('other','other')
    ]
    product_type = models.CharField(max_length=20,choices=TYPE_CHOICES,default='other')


class Employee(models.Model):
    employee_id = models.IntegerField(primary_key=True)
    employee_name = models.CharField(max_length=50)
    branch = models.CharField(max_length=20)
    DEPARTMENT_CHOICES = [
        ('ADMIN','ADMIN'),
        ('HR','HR'),
        ('ACCOUNTS','ACCOUNTS'),
        ('SALES','SALES'),
        ('BUSINESS DEVELOPMENT','BUSINESS DEVELOPMENT'),
        ('SYSTEM ADMIN','SYSTEM ADMIN'),
        ('EVENT COORDINATION','EVENT COORDINATION'),
        ('CUSTOMER RELATION','CUSTOMER RELATION'),
        ('OPERATIONS','OPERATIONS'),
        ('PHOTOGRAPHY','PHOTOGRAPHY'),
        ('ALBUM DESIGNING','ALBUM DESIGNING'),
        ('CC','CC'),
        ('DATA MANAGEMENT','DATA MANAGEMENT'),
        ('CINEMATOGRAPHY','CINEMATOGRAPHY'),
        ('PHOTO RETOUCHING','PHOTO RETOUCHING'),
        ('DIRECTION','DIRECTION'),
        ('VIDEO EDITING','VIDEO EDITING'),
        ('VIDEOGRAPHY','VIDEOGRAPHY'),
        ('SOCIAL MEDIA','SOCIAL MEDIA'),
        ('GRAPHIC DESIGNING','GRAPHIC DESIGNING'),
        ('SUPPORT SERIVICE','SUPPORT SERIVICE'),
        ('PRODUCTION','PRODUCTION'),
        ('EVENT MANAGEMENT','EVENT MANAGEMENT'),
        ('DIGITAL MARKETING','DIGITAL MARKETING'),
        ('ADMIN & OPERATIONS','ADMIN & OPERATIONS'),
        ('COLOUR CORRECTION','COLOUR CORRECTION'),
        ('LEARNING & DEVELOPMENT','LEARNING & DEVELOPMENT')
    ]
    department = models.CharField(max_length=50,choices=DEPARTMENT_CHOICES)

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
    holder = models.ForeignKey('Employee',on_delete=models.CASCADE,null=True,blank=True)
    added_on = models.DateField(default=date.today)
    shipped_on = models.DateField(blank=True,null=True)
    remark = models.CharField(null=True,blank=True,max_length=100)

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
    from_holder = models.ForeignKey('Employee',on_delete=models.SET('DELETED'),related_name="fromHolder",null=True,blank=True)
    to_holder = models.ForeignKey('Employee',on_delete=models.SET('DELETED'),related_name="toHolder",null=True,blank=True)
    to_location = models.CharField(choices=STATUS_CHOICES,max_length=50)
    update_time = models.DateField(default=date.today)
    remark = models.CharField(max_length=100,null=True,blank=True)
