# Coffee Shop Project

Dự án quán cà phê monorepo bao gồm Frontend (React + Vite) và Backend (Django + MongoDB).

## Cấu trúc dự án
- `frontend/`: React application sử dụng Vite.
- `backend/`: Django REST Framework sử dụng MongoDB Atlas.

---

## 1. Hướng dẫn chạy Backend (Django)

### Yêu cầu
- Python 3.10+
- MongoDB Atlas URI (đã cấu hình trong `.env`)

### Các bước thực hiện
1. Di chuyển vào thư mục backend:
   ```cmd
   cd backend
   ```
2. Kích hoạt môi trường ảo:
   ```cmd
   venv\Scripts\activate
   ```
3. Cài đặt các thư viện (nếu chưa có):
   ```cmd
   pip install -r requirements.txt
   ```
   *(Hoặc cài thủ công: `pip install django djangorestframework django-cors-headers pymongo dnspython python-dotenv pillow`)*
4. Khởi chạy server:
   ```cmd
   python manage.py runserver
   ```
   API sẽ chạy tại: [http://localhost:8000/api/](http://localhost:8000/api/)

---

## 2. Hướng dẫn chạy Frontend (React)

### Yêu cầu
- Node.js & npm

### Các bước thực hiện
1. Di chuyển vào thư mục frontend:
   ```cmd
   cd frontend
   ```
2. Cài đặt các dependencies (chỉ cần làm 1 lần đầu):
   ```cmd
   npm install
   ```
3. Khởi chạy ứng dụng:
   ```cmd
   npm run dev
   ```
   Giao diện sẽ chạy tại: [http://localhost:5173/](http://localhost:5173/)

---

## Ghi chú
- Đảm bảo Backend đang chạy trước khi thao tác trên Frontend để dữ liệu được đồng bộ (trong tương lai khi đã kết nối API).
- File `AGENT.md` chứa các quy tắc dành cho AI Agent trong môi trường Windows.
