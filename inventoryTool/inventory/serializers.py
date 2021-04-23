from rest_framework import serializers
from .models import *

class sendProductSerializer(serializers.Serializer):
    product_id = serializers.CharField(max_length=13)
    product_name = serializers.CharField(max_length=100)
    processor = serializers.CharField(max_length=100)
    operating_system = serializers.CharField(max_length=100)
    ram = serializers.CharField(max_length=3)
    total_units = serializers.IntegerField()

class ProductSerializer(serializers.ModelSerializer):
        class Meta:
            model = Product
            fields = '__all__'

class ProductUnitSerializer(serializers.ModelSerializer):
        class Meta:
            model = ProductUnit
            fields = '__all__'

class StatusUpdateSerializer(serializers.ModelSerializer):
        class Meta:
            model = StatusUpdate
            fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

