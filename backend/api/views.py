from rest_framework import viewsets
from rest_framework.response import Response
from bson.objectid import ObjectId
from .mongo_client import products_collection, categories_collection
from .serializers import CategorySerializer, ProductSerializer
import pymongo

class CategoryViewSet(viewsets.ViewSet):
    def list(self, request):
        categories = list(categories_collection.find())
        # Convert ObjectId to string for serialization
        for cat in categories:
            cat['_id'] = str(cat['_id'])
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

class ProductViewSet(viewsets.ViewSet):
    def list(self, request):
        # Optional filters
        category_slug = request.query_params.get('category__slug')
        search = request.query_params.get('search')
        
        query = {}
        if category_slug:
            query['category.slug'] = category_slug
        if search:
            query['$or'] = [
                {'name': {'$regex': search, '$options': 'i'}},
                {'description': {'$regex': search, '$options': 'i'}}
            ]
            
        products = list(products_collection.find(query).sort('created_at', pymongo.DESCENDING))
        
        for p in products:
            p['_id'] = str(p['_id'])
            if 'category' in p and '_id' in p['category']:
                 p['category']['_id'] = str(p['category']['_id'])
                 
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            product = products_collection.find_one({'_id': ObjectId(pk)})
            if product:
                product['_id'] = str(product['_id'])
                if 'category' in product and '_id' in product['category']:
                     product['category']['_id'] = str(product['category']['_id'])
                serializer = ProductSerializer(product)
                return Response(serializer.data)
            return Response({'detail': 'Not found.'}, status=404)
        except Exception:
            return Response({'detail': 'Invalid ID.'}, status=400)
