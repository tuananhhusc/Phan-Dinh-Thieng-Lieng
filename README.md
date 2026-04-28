# Phân Định Thiêng Liêng — Báo Cáo Nghiên Cứu Chuyên Sâu

Dự án website chuyên sâu trình bày báo cáo nghiên cứu về **Phân Định Thiêng Liêng (Spiritual Discernment)**, được xây dựng dựa trên nền tảng Linh đạo I-nhã (Dòng Tên) và các giáo huấn của Đức Thánh Cha Phanxicô.

![Website Preview](/hero-image.png)

## 🏛️ Triết lý Thiết kế (Design System)

Website được thiết kế theo phong cách **"Traditional Gothic Cathedral"**, lấy cảm hứng từ các bản thảo cổ và kiến trúc nhà thờ Công giáo truyền thống:

- **Bảng màu (Jesuit Palette):** 
  - **Parchment (#F7F4EE):** Nền giấy da giúp giảm mỏi mắt khi đọc lâu.
  - **Jesuit Black (#1C1917):** Màu đen mun đặc trưng của Dòng Tên.
  - **Ecclesiastical Burgundy (#7C1D28):** Sắc đỏ đô trang trọng từ phẩm phục Công giáo.
  - **Metallic Gold (#C9A844):** Màu vàng từ ấn tín IHS cho các điểm nhấn quan trọng.
- **Hệ Typography học thuật:** 
  - *Libre Baskerville* cho tiêu đề chính.
  - *Lora* cho nội dung thân bài (Body text) để tối ưu khả năng đọc.
  - *UnifrakturMaguntia* cho các chữ cái đầu dòng (Drop cap) phong cách Gothic cổ điển.

## ✨ Tính năng Nổi bật

- **Chế độ Ban đêm (Monastic Dark Mode):** Chuyển đổi giao diện sang tông màu trầm tối (Dark Mode) giúp đọc sách trong không gian tĩnh lặng.
- **Hệ thống Trích dẫn (Academic Citations):** Các số chú thích `[1]`, `[2]` tích hợp **Tooltip**, cho phép xem nguồn tham khảo ngay khi di chuột qua mà không cần cuộn trang.
- **Mục lục Thông minh (Scroll-spy ToC):** Tự động theo dõi tiến trình đọc và highlight các mục tương ứng. Hỗ trợ Drawer linh hoạt trên Mobile.
- **Hero Cover Section:** Phần mở đầu ấn tượng với hình ảnh nghệ thuật và ước tính thời gian đọc.
- **Tối ưu In ấn (Print-friendly):** Định dạng chuẩn văn bản A4 trắng đen khi người dùng thực hiện lệnh in trang web.
- **SEO & Scholarly Schema:** Tích hợp JSON-LD chuẩn `ScholarlyArticle` giúp bài viết được nhận diện tốt trên Google Scholar.

## 🛠️ Công nghệ Sử dụng

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 
- **Language:** TypeScript
- **Fonts:** Next/Font (Google Fonts)
- **Assets:** AI-generated Classical Hero Image

## 📂 Cấu trúc Dự án

```text
├── public/                 # Hình ảnh và tài sản tĩnh
├── src/
│   ├── app/                # Cấu trúc App Router (Layout, Page, CSS)
│   ├── components/         # Các thành phần UI (Header, Footer, ToC, Article...)
│   └── data/               # Dữ liệu mục lục và cấu trúc ToC
├── phandinhthienglieng.md  # Nội dung văn bản gốc
├── build_article.mjs       # Script tự động hóa xử lý nội dung & trích dẫn
└── package.json            # Cấu hình dự án & dependencies
```

## 🚀 Hướng dẫn Chạy Dự án

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Chạy script build nội dung (nếu có thay đổi ở file .md):**
   ```bash
   node build_article.mjs
   ```

3. **Chạy môi trường phát triển (Development):**
   ```bash
   npm run dev
   ```

4. **Truy cập tại:** `http://localhost:3000` (hoặc cổng được chỉ định).

## 🖋️ Tác giả & Châm ngôn

Dự án được thực hiện với tinh thần phụng sự học thuật và tâm linh.

**Ad Maiorem Dei Gloriam (A.M.D.G.)**  
*Tất cả vì vinh danh Thiên Chúa nhiều hơn.*
