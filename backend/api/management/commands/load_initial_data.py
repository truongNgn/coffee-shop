from django.core.management.base import BaseCommand
from api.mongo_client import categories_collection, products_collection
from datetime import datetime

class Command(BaseCommand):
    help = 'Enrich the database with a realistic coffee shop menu'

    def handle(self, *args, **kwargs):
        self.stdout.write('Enriching MongoDB Atlas with a rich menu...')

        # Define Categories
        categories_data = [
            {"name": "Cà Phê Truyền Thống", "slug": "classic-coffee"},
            {"name": "Đặc Sản Việt Nam", "slug": "vietnamese-specialties"},
            {"name": "Trà & Thức Uống Khác", "slug": "tea-non-coffee"},
            {"name": "Bánh Ngọt", "slug": "pastries"},
        ]

        cats = {}
        for c_data in categories_data:
            cat = categories_collection.find_one({'slug': c_data['slug']})
            if not cat:
                result = categories_collection.insert_one(c_data)
                cat = categories_collection.find_one({'_id': result.inserted_id})
            cats[c_data['slug']] = cat

        # Define Rich Products
        products_data = [
            # Classic Coffee
            {
                "name": "Cappuccino",
                "category": cats["classic-coffee"],
                "price": 45000,
                "description": "Sự kết hợp hoàn hảo giữa espresso, sữa nóng và bọt sữa mịn màng.",
                "image": "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1000&auto=format&fit=crop",
                "sku": "CF-CAP-01"
            },
            {
                "name": "Latte Art",
                "category": cats["classic-coffee"],
                "price": 45000,
                "description": "Espresso đậm đà hòa quyện cùng sữa tươi đánh nóng, tạo hình nghệ thuật.",
                "image": "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=1000&auto=format&fit=crop",
                "sku": "CF-LAT-02"
            },
            {
                "name": "Americano",
                "category": cats["classic-coffee"],
                "price": 35000,
                "description": "Espresso pha loãng với nước nóng, giữ trọn hương vị cà phê nguyên bản.",
                "image": "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1000&auto=format&fit=crop",
                "sku": "CF-AME-03"
            },
            # Vietnamese Specialties
            {
                "name": "Cà Phê Muối",
                "category": cats["vietnamese-specialties"],
                "price": 40000,
                "description": "Hương vị độc đáo từ sự kết hợp giữa cà phê đắng, sữa béo và chút mặn của muối.",
                "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop",
                "sku": "VN-SAL-01"
            },
            {
                "name": "Cà Phê Sữa Đá",
                "category": cats["vietnamese-specialties"],
                "price": 35000,
                "description": "Cà phê phin đậm đặc pha cùng sữa đặc và đá lạnh - biểu tượng của Việt Nam.",
                "image": "https://images.unsplash.com/photo-1594133900913-7d335c03f19c?q=80&w=1000&auto=format&fit=crop",
                "sku": "VN-MILK-02"
            },
            {
                "name": "Cà Phê Trứng",
                "category": cats["vietnamese-specialties"],
                "price": 55000,
                "description": "Lớp kem trứng thơm ngậy trên nền cà phê đen nóng hổi.",
                "image": "https://images.unsplash.com/photo-1534040385115-33d935103953?q=80&w=1000&auto=format&fit=crop",
                "sku": "VN-EGG-03"
            },
            # Tea & Non-Coffee
            {
                "name": "Matcha Latte",
                "category": cats["tea-non-coffee"],
                "price": 50000,
                "description": "Bột trà xanh Nhật Bản nguyên chất hòa cùng sữa tươi béo ngậy.",
                "image": "https://images.unsplash.com/photo-1515823662273-ad952e9f368c?q=80&w=1000&auto=format&fit=crop",
                "sku": "TEA-MAT-01"
            },
            {
                "name": "Trà Đào Cam Sả",
                "category": cats["tea-non-coffee"],
                "price": 45000,
                "description": "Vị trà thanh mát, hương cam sả thơm lừng kết hợp cùng những miếng đào giòn ngọt.",
                "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1000&auto=format&fit=crop",
                "sku": "TEA-PEA-02"
            },
            # Pastries
            {
                "name": "Bánh Croissant",
                "category": cats["pastries"],
                "price": 30000,
                "description": "Bánh sừng bò ngàn lớp, thơm mùi bơ Pháp nướng giòn.",
                "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop",
                "sku": "PAST-CRO-01"
            },
            {
                "name": "Cheesecake Việt Quất",
                "category": cats["pastries"],
                "price": 55000,
                "description": "Bánh phô mai mềm mịn kết hợp cùng mứt việt quất tươi mát.",
                "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop",
                "sku": "PAST-CHE-02"
            }
        ]

        inserted = 0
        updated = 0
        for p_data in products_data:
            p_data['updated_at'] = datetime.utcnow()
            exists = products_collection.find_one({'name': p_data['name']})
            if not exists:
                p_data['created_at'] = datetime.utcnow()
                products_collection.insert_one(p_data)
                inserted += 1
            else:
                products_collection.update_one({'_id': exists['_id']}, {'$set': p_data})
                updated += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully processed products: {inserted} inserted, {updated} updated.'))
