from rest_framework import serializers
from .models import *
from random import randint

class sendProductSerializer(serializers.Serializer):
    product_id = serializers.CharField(max_length=13)
    product_name = serializers.CharField(max_length=100)
    processor = serializers.CharField(max_length=100)
    operating_system = serializers.CharField(max_length=100)
    ram = serializers.CharField(max_length=3)
    total_units = serializers.IntegerField()
    product_type = serializers.CharField(max_length=20)

class ProductSerializer(serializers.ModelSerializer):
        class Meta:
            model = Product
            fields = '__all__'

class ProductUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductUnit
        fields = '__all__'
        
    def to_internal_value(self, data):
        barcode = data.get('barcode')
        if not barcode:
            is_unique = False
            id = 0
            while not is_unique:
                id = randint(100000, 199999)
                is_unique = not ProductUnit.objects.filter(barcode=id).exists()
            data['barcode'] = id
        return super(ProductUnitSerializer, self).to_internal_value(data)


class StatusUpdateSerializer(serializers.ModelSerializer):
        class Meta:
            model = StatusUpdate
            fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

