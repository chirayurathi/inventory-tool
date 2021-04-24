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
        if product.total_units == '':
            product.total_units = 0
    serializer = sendProductSerializer(products,many=True)
    return JsonResponse(serializer.data,safe=False)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def addProduct(request):
    data = dict(request.data)
    del data["units"]
    serializer = ProductSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        product = serializer.save()
        print(request.data)
        for i in range(int(request.data["units"])):
            newUnit = ProductUnit()
            newUnit.Product = product
            newUnit.status = 'CHENNAI'
            newUnit.save()
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
    data = request.data
    data["status"] = "CHENNAI"
    serializer = ProductUnitSerializer(data=data)
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
    data = request.data
    print(data)
    unit = ProductUnit.objects.get(pk=data["ProductUnit"])
    data["from_location"] = unit.status
    data["from_holder"] = unit.holder.employee_id
    serializer = StatusUpdateSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        stat = serializer.save()
        unit = ProductUnit.objects.get(pk=stat.ProductUnit.barcode)
        unit.status = stat.to_location
        unit.holder = stat.to_holder
        unit.shipped_on = stat.update_time
        unit.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)  


def getEmployee(request):
    employee = Employee.objects.all()
    serializer = EmployeeSerializer(employee,many=True)
    return JsonResponse(serializer.data,safe=False)    
