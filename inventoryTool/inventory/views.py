from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status,permissions
from .models import *
from .serializers import *

def getProducts(request):
    products = Product.objects.all()
    for product in products:
        product.total_units = ProductUnit.objects.filter(Product=product).count()
    serializer = sendProductSerializer(products,many=True)
    return JsonResponse(serializer.data,safe=False)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def addProduct(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

def getUnits(request,pid):
    product = Product.objects.get(pk=pid)
    productUnits = ProductUnit.objects.filter(Product=product)
    serializer =  ProductUnitSerializer(productUnits,many=True)
    return JsonResponse(serializer.data,safe=False)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def addUnits(request):
    serializer = ProductUnitSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        uObj = serializer.save()
        statusNew = StatusUpdate.objects.create(ProductUnit=uObj,from_location='IMPORTED',to_location=uObj.status,update_time=uObj.added_on)
        statusNew.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

def getStatus(request,pid):
    productUnit = ProductUnit.objects.get(pk=pid)
    statusList = StatusUpdate.objects.filter(ProductUnit=productUnit)
    serializer = StatusUpdateSerializer(statusList,many=True)
    return JsonResponse(serializer.data,safe=False)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def addStatus(request):
    serializer = StatusUpdateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        stat = serializer.save()
        unit = ProductUnit.objects.get(pk=stat.ProductUnit.barcode)
        unit.status = stat.to_location
        unit.shipped_on = stat.update_time
        unit.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)  
