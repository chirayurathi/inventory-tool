from rest_framework import serializers
from .models import *

class sendProductSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    product_name = serializers.CharField(max_length=100)
    product_price = serializers.FloatField()
    total_units = serializers.IntegerField()

class ProductSerializer(serializers.ModelSerializer):
        class Meta:
            model = Product
            fields = ['product_id','product_name','product_price']

class ProductUnitSerializer(serializers.ModelSerializer):
        class Meta:
            model = ProductUnit
            fields = ['barcode','Product','status','added_on','shipped_on']

class StatusUpdateSerializer(serializers.ModelSerializer):
        class Meta:
            model = StatusUpdate
            fields = ['ProductUnit','from_location','to_location','update_time','remark']


