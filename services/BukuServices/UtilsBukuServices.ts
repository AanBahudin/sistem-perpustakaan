import { NotFoundError } from "../../errors/errorHandler"
import Buku from "../../model/Buku"
import Pengembalian from "../../model/Pengembalian"

export const bukuDikembalikan = async(idBuku : string) => {
    const buku = await Buku.findOneAndUpdate(
        {_id: idBuku},
        {$inc: {stok: 1, totalDipinjam: -1}},
        {new: true, runValidators: true}
    )
}

export const bukuDipinjam = async(idBuku : string) => {
    const buku = await Buku.findOneAndUpdate(
        {_id: idBuku},
        {$inc: {stok: -1, totalDipinjam: 1}},
        {new: true, runValidators: true}
    )
}

export const bukuDihilangkan = async(idBuku: string) => {
    const buku = await Buku.findOneAndUpdate(
        {_id: idBuku},
        {$inc: {totalDipinjam: -1, totalDihilangkan: 1}},
        {new: true, runValidators: true}
    )
}

export const getBukuHilang = async() => {
    const buku = await Pengembalian.find({isMissing: true, statusPembayaran: 'Dibayar', statusPengembalian: 'Dikembalikan'})
    return buku || []
}

export const recomendationBook = async() => {
    const recommendation = await Buku.find().sort({totalDipinjam: -1}).limit(5)
    return recommendation
}

export const lastAddedBook = async() => {
    const lastAdded = await Buku.findOne().sort({ createdAt: -1 });
    return lastAdded
}

export const getSuggestedBook = async({idBuku} : {idBuku: string}) => {
  const buku = await Buku.findOne({_id: idBuku, dihapus: false})
  if (!buku) throw new NotFoundError('Buku tidak ditemukan')

  // cari buku berdasarkan kategori buku yang sedang diakases pengguna
  const kategoriBuku: string[] = buku.kategori

  const relatedBooks = await Buku.find({
      _id: { $ne: idBuku }, // jangan tampilkan buku utama
      kategori: { $in: kategoriBuku }, // cari yang punya kategori serupa
    }).limit(18); // batasi hasil

  return relatedBooks
}

export const getAllBookYear = async() => {
    const result = await Buku.aggregate([
    {
      $addFields: {
        tahunNumeric: {
          $cond: [
            { $eq: [{ $type: "$tahunTerbit" }, "date"] },
            { $year: "$tahunTerbit" },
            { $toInt: "$tahunTerbit" }
          ]
        }
      }
    },
    {
      $group: {
        _id: null,
        minYear: { $min: "$tahunNumeric" },
        maxYear: { $max: "$tahunNumeric" }
      }
    }
  ]);

  if (result.length > 0) {
    const { minYear, maxYear } = result[0];
    const yearRange = Array.from(
      { length: maxYear - minYear + 1 },
      (_, i) => minYear + i
    );
    return { minYear, maxYear, yearRange };
  }

  return { minYear: null, maxYear: null, yearRange: [] };
}

export const getTotalBukuByItem = async() => {
    const totalBukuFisik = await Buku.aggregate([
        {
            $group: {
            _id: null,
            total: { $sum: "$stok" } // Menjumlahkan semua stok
            }
        },
        {
            $project: {
            _id: 0,
            total: 1
            }
        }
    ]);

    return totalBukuFisik[0]?.total || 0
}