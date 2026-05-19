# SD KARTIKA X-2 - Website Sekolah

Website resmi SD KARTIKA X-2 Kota Jakarta Selatan, dibangun dengan Next.js 16, Tailwind CSS, Prisma ORM, dan NextAuth.

## Fitur

### Halaman Publik
- **Beranda** - Landing page dengan hero section, statistik, tentang kami, guru, dan berita
- **Profil** - Profil sekolah, visi & misi, sejarah, sambutan kepala sekolah
- **Guru & Staff** - Daftar guru dan staff tata usaha
- **Fasilitas** - Gallery fasilitas sekolah
- **Ekstrakurikuler** - Daftar kegiatan ekstrakurikuler
- **Berita** - Portal berita sekolah dengan detail artikel
- **Kontak** - Formulir kontak dan informasi kontak
- **PPDB** - Informasi Penerimaan Peserta Didik Baru

### Dashboard (CRUD System)
- **Role Admin** - Full access: kelola berita, guru/staff, fasilitas, ekstrakurikuler, pesan masuk, profil sekolah
- **Role Guru** - Limited access: kelola berita saja

### Teknologi
- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS 4
- **Database**: SQLite (via Prisma ORM)
- **Authentication**: NextAuth v5 (Credentials)
- **Icons**: React Icons

## Cara Menjalankan

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
npx prisma generate
npx prisma db push
```

### 3. Seed Database (Data Awal)
```bash
npx tsx prisma/seed.ts
```

### 4. Jalankan Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Akun Demo

| Role  | Email                      | Password |
|-------|---------------------------|----------|
| Admin | admin@sdkartikax2.sch.id  | admin123 |
| Guru  | guru@sdkartikax2.sch.id   | guru123  |

## Struktur Project

```
src/
├── app/
│   ├── (public)/          # Halaman publik (dengan Navbar & Footer)
│   │   ├── page.tsx       # Beranda
│   │   ├── profil/        # Profil sekolah
│   │   ├── guru-staff/    # Guru & Staff
│   │   ├── fasilitas/     # Fasilitas
│   │   ├── ekstrakurikuler/
│   │   ├── berita/        # Berita + Detail
│   │   ├── kontak/        # Kontak
│   │   └── ppdb/          # PPDB
│   ├── dashboard/         # Dashboard (protected)
│   │   ├── berita/        # CRUD Berita
│   │   ├── staff/         # CRUD Guru & Staff
│   │   ├── fasilitas/     # CRUD Fasilitas
│   │   ├── ekstrakurikuler/ # CRUD Ekskul
│   │   ├── pesan/         # Pesan Masuk
│   │   └── profil-sekolah/ # Edit Profil
│   ├── api/               # REST API Routes
│   └── login/             # Halaman Login
├── components/            # Komponen reusable
├── lib/                   # Utilities (Prisma, Auth)
└── types/                 # Type definitions
```

## Environment Variables

Buat file `.env` di root project:

```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## Deployment

Untuk production, ganti SQLite ke PostgreSQL/MySQL di `prisma/schema.prisma` dan update `DATABASE_URL`.
