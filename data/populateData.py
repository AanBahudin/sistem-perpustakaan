import pandas as pd
import random
import json

# === CONFIGURASI ===
INPUT_FILE = "DATA BUKU.xlsx"  # pastikan file ini ada di folder yang sama
JSON_OUTPUT = "buku_data.json"
JSONL_OUTPUT = "buku_data.jsonl"
CREATED_BY = "67fb5487c8b4c582353ac1fb"

# === FUNGSI BANTU ===
def generate_tagline(title):
    return f"Panduan menarik tentang '{title}' yang membantu pembaca memahami topik secara praktis dan mendalam."

def generate_description(title):
    return (
        f"Buku berjudul '{title}' memberikan penjelasan komprehensif dan mudah dipahami. "
        f"Dilengkapi contoh, studi kasus, dan penjelasan aplikatif yang cocok untuk mahasiswa, profesional, "
        f"atau siapa pun yang ingin memperdalam pengetahuan tentang topik ini."
    )

def parse_ukuran(ukuran_str):
    try:
        panjang, lebar = [float(x.strip()) for x in str(ukuran_str).split(",")]
        return {"panjang": panjang, "lebar": lebar}
    except Exception:
        return {"panjang": 0, "lebar": 0}

# === BACA FILE EXCEL ===
df = pd.read_excel(INPUT_FILE, header=0, sheet_name="MAIN")
df = df.dropna(how="all")

print(df.columns)
print(len(df.columns))

# Pastikan urutan kolom sesuai
df.columns = [
    "NO", "JUDUL", "TAGLINE", "KATEGORI", "PENULIS", "PENERBIT", "TAHUN",
    "UKURAN BUKU", "DESKRIPSI", "ISBN", "JUMLAH HALAMAN", "SUMBER PENGADAAN",
    "JUMLAH BUKU", "URL GAMBAR", "HARGA GANTI"
]


# === PROSES SETIAP BARIS ===
buku_list = []

for _, row in df.iterrows():
    judul = str(row["JUDUL"]).strip()

    buku = {
        "judul": judul,
        "tagline": row["TAGLINE"] if pd.notna(row["TAGLINE"]) else generate_tagline(judul),
        "penulis": row["PENULIS"] if pd.notna(row["PENULIS"]) else "Tidak diketahui",
        "penerbit": row["PENERBIT"] if pd.notna(row["PENERBIT"]) else "Tidak diketahui",
        "tahunTerbit": str(row["TAHUN"]) if pd.notna(row["TAHUN"]) else "2024",
        "deskripsi": row["DESKRIPSI"] if pd.notna(row["DESKRIPSI"]) else generate_description(judul),
        "cover": None,
        "coverPublicId": None,
        "jumlahHalaman": int(row["JUMLAH HALAMAN"]) if pd.notna(row["JUMLAH HALAMAN"]) else 100,
        "featured": False,
        "ISBN": str(row["ISBN"]) if pd.notna(row["ISBN"]) else f"ISBN-{random.randint(1000000,9999999)}",
        "bahasa": "Indonesia",
        "ukuranBuku": parse_ukuran(row["UKURAN BUKU"]),
        "sumberPengadaan": row["SUMBER PENGADAAN"] if pd.notna(row["SUMBER PENGADAAN"]) else random.choice(["Beli", "Hibah Kampus", "Donasi Mahasiswa"]),
        "stok": int(row["JUMLAH BUKU"]) if pd.notna(row["JUMLAH BUKU"]) else 1,
        "kategori": [k.strip() for k in str(row["KATEGORI"]).split(",")] if pd.notna(row["KATEGORI"]) else ["Umum"],
        "status": "Tersedia",
        "hargaGanti": int(row["HARGA GANTI"]) if pd.notna(row["HARGA GANTI"]) else random.randint(50000, 150000),
        "totalDipinjam": 0,
        "totalDilihat": 0,
        "totalDisukai": 0,
        "totalDisimpan": 0,
        "totalDihilangkan": 0,
        "isMissing": False,
        "dihapus": False,
        "createdBy": CREATED_BY
    }

    buku_list.append(buku)

# === SIMPAN KE FILE JSON ===
with open(JSON_OUTPUT, "w", encoding="utf-8") as f:
    json.dump(buku_list, f, ensure_ascii=False, indent=2)

# === SIMPAN KE FILE JSONL ===
with open(JSONL_OUTPUT, "w", encoding="utf-8") as f:
    for item in buku_list:
        f.write(json.dumps(item, ensure_ascii=False) + "\n")

print(f"Selesai ✅\nTotal data: {len(buku_list)}")
print(f"File tersimpan sebagai:\n- {JSON_OUTPUT}\n- {JSONL_OUTPUT}")