"""inventoryTool URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from inventory import views
from rest_framework.authtoken import views as auth_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('getProducts/',views.getProducts,name="getProducts"),
    path('getOthers/',views.getOthers,name="getOthers"),
    path('getUnits/<pid>/',views.getUnits,name="getUnits"),
    path('getStatus/<pid>/',views.getStatus,name="getStatus"),
    path('addProducts/',views.addProduct,name="addProduct"),
    path('addUnits/',views.addUnits,name="addUnits"),
    path('addStatus/',views.addStatus,name="addStatus"),
    path('addOthers/',views.addOthers,name="addOthers"),
    path('updateRemark/',views.updateRemark,name="updateRemark"),
    path('addEmployee/',views.addEmployee,name="addEmployee"),
    path('getEmployes/',views.getEmployee,name="getEmployes"),
    path('getQrCode/<id>/',views.getQrCode,name="getQr"),
    path('createTokens/',views.createTokens,name='createTokens'),
    path('exportExcel/',views.exportExcel,name='exportExcel'),
    path('api-token-auth/',auth_view.obtain_auth_token)
]
