import os
from pymongo import MongoClient

# Initialize MongoDB client
# It's better to reuse the single MongoClient instance across requests
mongo_uri = os.environ.get('MONGO_URI')

# If uri is not set in env, it might be running without .env locally
# Let's handle graceful fallback or require it
client = MongoClient(mongo_uri)
db = client['coffee_shop_db']

products_collection = db['products']
categories_collection = db['categories']
