import os
import pandas as pd
os.environ.setdefault('DJANGO_SETTINGS_MODULE','inventoryTool.settings')
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
from django.core.wsgi import get_wsgi_application
# from django.contrib.auth.models import User
# from rest_framework.authtoken.models import Token
application = get_wsgi_application()
import django
from inventory.models import Employee,Product
django.setup()
#write script
def populate(eid,name,dept,branch,designation):
    # user = Employee.objects.get(pk=eid)
    user = Employee()
    user.employee_id = eid
    user.employee_name = name
    user.department = dept
    user.branch = branch
    user.designation = designation
    user.save()
def populateProduct(k,name,processor,os,ram):
    if ram:
        product = Product()
        product.product_id = k
        product.product_name = name
        product.processor = processor
        product.operating_system = os
        product.ram = ram
        product.save()
#end script
if __name__ == '__main__':
    xlf = pd.read_excel('EMPLOYEE LIST APRIL.xlsx', sheet_name=None)
    print(xlf['Sheet1'])
    dictXl = pd.DataFrame(xlf['Sheet1']).values.tolist()
    print(dictXl)
    for i in dictXl:
        populate(i[2],i[3],i[4],i[1],i[5])
    # admin = User(username="chirayurathi")
    # admin.set_password("qwerty1@3")
    # admin.save()
    # Token.objects.get_or_create(user=admin)
    # xlfl = pd.DataFrame(pd.read_excel('productList.xlsx')).values.tolist()
    # print(xlfl) 
    # k=0
    # for i in xlfl:
    #     populateProduct(k,i[0],i[1],i[2],i[3])
    #     k+=1
    # print(Product.objects.all().all())

    