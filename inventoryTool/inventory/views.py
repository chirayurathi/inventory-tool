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

def getUnits(request):
    product = Product.objects.get(pk=request.POST.get("product_id"))
    productUnits = ProductUnit.objects().filter(Product=product)
    serializer =  ProductUnitSerializer(productUnits,many=True)
    return Response(serializer.data)

@permission_classes((permissions.AllowAny,))
def addUnits(request):
    serializer = ProductUnitSerializer(data=request.data)
    if serializer.is_valid:
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

def getStatus(request):
    productUnit = ProductUnit.objects.get(pk=request.POST.get("productunit_id"))
    statusList = StatusUpdate.objects.filter(ProductUnit=productUnit)
    serializer = StatusUpdateSerializer(statusList,many=True)
    return Response(serializer.data)

@permission_classes((permissions.AllowAny,))
def addStatus(request):
    serializer = StatusUpdateSerializer(data=request.data)
    if serializer.is_valid:
        serializer.save()
        unit = ProductUnit.objects().get(pk=request.POST.get("ProductUnit_id"))
        unit.status = serializer.data.to_location
        unit.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)  
