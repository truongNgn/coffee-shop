from rest_framework import serializers

class CategorySerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    name = serializers.CharField(max_length=100)
    slug = serializers.CharField(max_length=100)

class ProductSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    name = serializers.CharField(max_length=200)
    category = serializers.DictField(read_only=True)
    category_id = serializers.CharField(write_only=True, required=False)
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    description = serializers.CharField(allow_blank=True, required=False)
    image = serializers.CharField(allow_blank=True, required=False)
    sku = serializers.CharField(max_length=50, allow_blank=True, required=False)
