# Generated by Django 3.1.2 on 2021-04-21 19:12

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('product_id', models.IntegerField(primary_key=True, serialize=False)),
                ('product_name', models.CharField(max_length=100)),
                ('product_price', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='ProductUnit',
            fields=[
                ('barcode', models.BigIntegerField(primary_key=True, serialize=False)),
                ('status', models.CharField(choices=[('IMPORTED', 'IMPORTED'), ('EXPORTED', 'EXPORTED'), ('HYDRABAD', 'HYDRABAD'), ('BANGLORE', 'BANGLORE'), ('CHENNAI', 'CHENNAI'), ('MUMBAI', 'MUMBAI'), ('DELHI', 'DELHI'), ('SURAT', 'SURAT'), ('GOA', 'GOA')], max_length=50)),
                ('added_on', models.DateField(default=django.utils.timezone.now)),
                ('shipped_on', models.DateField(blank=True, null=True)),
                ('Product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventory.product')),
            ],
        ),
        migrations.CreateModel(
            name='StatusUpdate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_location', models.CharField(choices=[('IMPORTED', 'IMPORTED'), ('EXPORTED', 'EXPORTED'), ('HYDRABAD', 'HYDRABAD'), ('BANGLORE', 'BANGLORE'), ('CHENNAI', 'CHENNAI'), ('MUMBAI', 'MUMBAI'), ('DELHI', 'DELHI'), ('SURAT', 'SURAT'), ('GOA', 'GOA')], max_length=50)),
                ('to_location', models.CharField(choices=[('IMPORTED', 'IMPORTED'), ('EXPORTED', 'EXPORTED'), ('HYDRABAD', 'HYDRABAD'), ('BANGLORE', 'BANGLORE'), ('CHENNAI', 'CHENNAI'), ('MUMBAI', 'MUMBAI'), ('DELHI', 'DELHI'), ('SURAT', 'SURAT'), ('GOA', 'GOA')], max_length=50)),
                ('update_time', models.DateField(default=django.utils.timezone.now)),
                ('remark', models.CharField(blank=True, max_length=100, null=True)),
                ('ProductUnit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inventory.productunit')),
            ],
        ),
    ]