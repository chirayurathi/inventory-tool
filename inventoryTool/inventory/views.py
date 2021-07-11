from datetime import datetime
from django.http import HttpResponse, JsonResponse
from django.utils import encoding
from django.views.decorators.csrf import csrf_exempt
from rest_framework import response
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework import status,permissions
from .models import *
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from .serializers import *
import qrcode
from qrcode.image.pure import PymagingImage
from io import BytesIO
from rest_framework.permissions import IsAuthenticated
import xlwt

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProducts(request):
    products = Product.objects.all()
    for product in products:
        product.total_units = ProductUnit.objects.filter(Product=product).count()
        if product.total_units == '':
            product.total_units = 0
    serializer = sendProductSerializer(products,many=True)
    return JsonResponse(serializer.data,safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOthers(request):
    others = Other_type.objects.all()
    serializer = OtherSerializer(others,many=True)
    return JsonResponse(serializer.data,safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateRemark(request):
    try:
        data = request.data
        print(data)
        inst = ProductUnit.objects.get(pk=data['id'])
        inst.remark = data['remark']
        inst.save()
        return JsonResponse({"message":"success"},status=status.HTTP_200_OK)
    except:
        return JsonResponse({"message":"Error"},status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def addProduct(request):
    data = dict(request.data)
    del data["units"]
    serializer = ProductSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        product = serializer.save()
        print(request.data)
        for i in range(int(request.data["units"])):
            newUnit = ProductUnitSerializer(data={'Product':str(product.product_id),'status':'CHENNAI'})
            # newUnit.Product = product
            # newUnit.status = 'CHENNAI'
            print(newUnit)
            if newUnit.is_valid():
                print("valid")
                newUnit.save()
                newUnit = newUnit.save()
                statusNew = StatusUpdate.objects.create(ProductUnit=newUnit,from_location='IMPORTED',to_location=newUnit.status,update_time=newUnit.added_on)
                statusNew.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOthers(request):
    data = request.data
    print(data)
    serializer = OtherSerializer(data = data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"Success"},status=status.HTTP_200_OK)
    else:
        return Response({"message":"Error"},status=status.HTTP_409_CONFLICT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUnits(request,pid):
    product = Product.objects.get(pk=pid)
    productUnits = ProductUnit.objects.filter(Product=product)
    serializer =  ProductUnitSerializer(productUnits,many=True)
    return JsonResponse(serializer.data,safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addUnits(request):
    data = request.data
    data["status"] = "CHENNAI"
    print(data)
    serializer = ProductUnitSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        uObj = serializer.save()
        statusNew = StatusUpdate.objects.create(ProductUnit=uObj,from_location='IMPORTED',to_location=uObj.status,update_time=uObj.added_on)
        statusNew.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getStatus(request,pid):
    productUnit = ProductUnit.objects.get(pk=pid)
    statusList = StatusUpdate.objects.filter(ProductUnit=productUnit)
    serializer = StatusUpdateSerializer(statusList,many=True)
    return JsonResponse(serializer.data,safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addStatus(request):
    data = request.data
    print(data)
    unit = ProductUnit.objects.get(pk=data["ProductUnit"])
    data["from_location"] = unit.status
    data["from_holder"] = unit.holder.employee_id if unit.holder else None
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getEmployee(request):
    employee = Employee.objects.all()
    serializer = EmployeeSerializer(employee,many=True)
    return JsonResponse(serializer.data,safe=False)    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addEmployee(request):
    data = request.data
    print(data)
    serializer = EmployeeSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"Success"},status=status.HTTP_201_CREATED)
    else:
        print(serializer._errors)
        return Response({"message:Invalid Data"},status=status.HTTP_400_BAD_REQUEST)

def getQrCode(request,id):
    qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
    )
    qr.add_data(id)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    buffer = BytesIO()
    img.save(buffer)
    response = HttpResponse(buffer.getbuffer())
    response['Content-Type'] = "image/png"
    response['Cache-Control'] = "max-age=0"
    return response

def createTokens(request):
    for user in User.objects.all():
        Token.objects.get_or_create(user=user)
    return HttpResponse("created")

def exportExcel(request):
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename=inventory'+str(datetime.now())+'.xls'
    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet('Employees')
    font_style = xlwt.XFStyle()
    font_style_bold = xlwt.XFStyle()
    font_style_bold.font.bold = True
    cols = ['Employee Id','Employee Name','Branch','Department','Designation']
    for i in range(len(cols)):
        ws.write(0,i,cols[i],font_style_bold)
    employees = Employee.objects.all().values_list('employee_id','employee_name','branch','department','designation')
    re = 0
    for employee in employees:
        re+=1
        for i in range(len(employee)):
            ws.write(re,i,str(employee[i]),font_style)
    
    system = Product.objects.all().exclude(product_type__in=['furniture','other'])
    systemUnits = ProductUnit.objects.filter(Product__in = system).order_by('Product_id')
    system = system.values_list('product_id','product_type','product_name','processor','operating_system','ram','hdd')
    ws_system = wb.add_sheet('System')
    cols = ['Product Id','Product Type','Product Name','Processor','Operating System','RAM','HDD','Units']
    for i in range(len(cols)):
        ws_system.write(0,i,cols[i],font_style_bold)
    re = 0
    for sys in system:
        re+=1
        for i in range(len(sys)):
            ws_system.write(re,i,str(sys[i]),font_style)
        units = systemUnits.filter(Product_id = sys[0]).count()
        ws_system.write(re,len(sys),str(units),font_style)
    
    re+=2
    cols = ['Barcode','Product','Branch','Holder','Added On','Shipped On','Remark']
    for i in range(len(cols)):
        ws_system.write(re,i,cols[i],font_style_bold)
    systemUnits = systemUnits.values_list('barcode','Product','status','holder','added_on','shipped_on','remark')
    for unit in systemUnits:
        re+=1
        for i in range(len(unit)):
            ws_system.write(re,i,str(unit[i]),font_style)
    
    furniture = Product.objects.filter(product_type='furniture')
    furnitureUnits = ProductUnit.objects.filter(Product__in = furniture).order_by('Product_id')
    furniture = furniture.values_list('product_id','product_name','description')
    ws_furniture = wb.add_sheet('Furniture')
    cols = ['Product Id','Product Name','Description','Units']
    for i in range(len(cols)):
        ws_furniture.write(0,i,cols[i],font_style_bold)
    re = 0
    for f in furniture:
        re+=1
        for i in range(len(f)):
            ws_furniture.write(re,i,str(f[i]),font_style)
        units = furnitureUnits.filter(Product_id = f[0]).count()
        ws_furniture.write(re,len(f),str(units),font_style)
    
    re+=2
    cols = ['Barcode','Product','Branch','Holder','Added On','Shipped On','Remark']
    for i in range(len(cols)):
        ws_furniture.write(re,i,cols[i],font_style_bold)
    furnitureUnits = furnitureUnits.values_list('barcode','Product','status','holder','added_on','shipped_on','remark')
    for unit in furnitureUnits:
        re+=1
        for i in range(len(unit)):
            ws_furniture.write(re,i,str(unit[i]),font_style)
    
    other = Product.objects.filter(product_type='other')
    otherUnits = ProductUnit.objects.filter(Product__in = other).order_by('Product_id')
    other = other.values_list('product_id','product_name','description')
    ws_other = wb.add_sheet('Other')
    cols = ['Product Id','Product Name','Description','Units']
    for i in range(len(cols)):
        ws_other.write(0,i,cols[i],font_style_bold)
    re = 0
    for f in other:
        re+=1
        for i in range(len(f)):
            ws_other.write(re,i,str(f[i]),font_style)
        units = otherUnits.filter(Product_id = f[0]).count()
        ws_other.write(re,len(f),str(units),font_style)
    
    re+=2
    cols = ['Barcode','Product','Branch','Holder','Added On','Shipped On','Remark']
    for i in range(len(cols)):
        ws_other.write(re,i,cols[i],font_style_bold)
    otherUnits = otherUnits.values_list('barcode','Product','status','holder','added_on','shipped_on','remark')
    for unit in otherUnits:
        re+=1
        for i in range(len(unit)):
            ws_other.write(re,i,str(unit[i]),font_style)

    
    wb.save(response)
    return response
