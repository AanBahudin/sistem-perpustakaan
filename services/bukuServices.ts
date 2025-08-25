import Buku, { BukuSchemaType } from "../model/Buku";
import { NotFoundError } from "../errors/errorHandler";
import Peminjaman from "../model/Peminjaman";
import Pengembalian from "../model/Pengembalian";
import { startOfMonth, subMonths } from "date-fns";
import Perpanjangan from "../model/Perpanjangan";


// SUDAH TESTING
export const getSemuaBukuTersediaUntukUser = async({query} : {query: any}) => {

    let filters : Record<string, any>[] = []
     if (query.search) {
        const searchRegex = { $regex: query.search, $options: "i" };
        filters = [
            { penulis: searchRegex },
            { judul: searchRegex },
            { penerbit: searchRegex }
        ];
    }

    const buku = await Buku.find({
        dihapus: false,
        status: 'Tersedia',
        ...(filters.length > 0 && { $or: filters })
    }).select('-dihapus').sort({createdAt: -1})


    const recommendation = await recomendationBook()
    const lastAdded = await lastAddedBook()

    // for testing purposed
    const totalPage = 1

    return {buku, recommendation, totalPage, lastAdded}
}

export const discoveryBukuServices = async({query} : {query: any}) => {

    if (typeof query === undefined) {
        return []
    }
    
    if (query === 'rekomendasi') {
        const data = await Buku.find().sort({totalDipinjam: -1})
        return data
    }

    const data = await Buku.find({
        kategori: {
            $in: query
        }
    })

    return data
}

// SUDAH TESTING
export const getSatuBukuTersediaUntukUser = async(idBuku: string) => {
    const buku = await Buku.findOne({_id: idBuku, dihapus: false, status: 'Tersedia'})
        .select('-dihapus')
        .sort({bukuDipinjam: -1})

    if (!buku) throw new NotFoundError('Data buku tidak ditemukan')
    return buku
}

// UNTUK PUSTAKAWAN 

export const getSemuaBukuUntukPustakawan = async({query} : {query: any}) => {

    const searchNama = query.query || ''; // Ambil keyword pencarian
    const mongoQuery: any = { ...query };
    delete mongoQuery.query;

    const books = await Buku.find(mongoQuery).sort({createdAt: -1})
    const dataRasio = await rasioKategoriBuku()
    const dataStats = await allBukuStats()
    return {
        dataBuku: books,
        dataRasio, 
        dataStats,
    }
}

export const getSemuaBukuDipinjam = async({query} : {query: any}) => {

    let bukuMatch: any = {}

    if (query?.query) {
        bukuMatch.judul = {$regex: query.query, $options: 'i'}
    }

    if (query?.status) {
        bukuMatch.status = {$regex: query.status, $options: 'i'}
    }

    if (query?.penulis) {
        bukuMatch.penulis = {$regex: query.penulis, $options: 'i'}
    }

    if (query?.penerbit) {
        bukuMatch.penerbit = {$regex: query.penerbit, $options: 'i'}
    }

    if (query?.tahunTerbit) {
        bukuMatch.tahunTerbit = {$regex: query.tahunTerbit, $options: 'i'}
    }

    if (query?.kategori) {
        bukuMatch.kategori = {
            $in: [new RegExp(query.kategori, "i")]
        };
    }
    const bukuDipinjamRaw = await Peminjaman.find({$or: [
        {statusPeminjaman: 'Dipinjam'},
        {statusPeminjaman: 'Terlambat'}
    ]})
        .select('buku peminjam _id berakhirPada durasiPeminjaman statusPeminjaman dataPengembalian')
        .sort({createdAt: -1})
        .populate({
            path: 'buku',
            match: bukuMatch
        })
        .populate({
            path: 'peminjam',
            select: 'fotoProfil _id nama'
        })

    const bukuDipinjam = bukuDipinjamRaw.filter((item) => item.buku !== null);

    const ratioBukuDipinjam = await rasioPeminjamanBuku()
    const statsBukuPinjam = await statsBukuDipinjam()

    return {
        bukuDipinjam,
        ratioBukuDipinjam,
        statsBukuPinjam
    }
}

export const getSemuaBukuDiperpanjang = async({query} : {query: any}) => {
    let bukuMatch: any = {}

    if (query?.query) {
        bukuMatch.judul = {$regex: query.query, $options: 'i'}
    }

    if (query?.status) {
        bukuMatch.status = {$regex: query.status, $options: 'i'}
    }

    if (query?.penulis) {
        bukuMatch.penulis = {$regex: query.penulis, $options: 'i'}
    }

    if (query?.penerbit) {
        bukuMatch.penerbit = {$regex: query.penerbit, $options: 'i'}
    }

    if (query?.tahunTerbit) {
        bukuMatch.tahunTerbit = {$regex: query.tahunTerbit, $options: 'i'}
    }

    if (query?.kategori) {
        bukuMatch.kategori = {
            $in: [new RegExp(query.kategori, "i")]
        };
    }

    const bukuDiperpanjangRaw = await Perpanjangan.find({disetujui: 'Diterima'})
        .select('idBuku idPengguna idPeminjaman _id durasi alasan')
        .sort({createdAt: -1})
        .populate({
            path: 'idBuku',
            select: '_id judul kategori ISBN',
            match: bukuMatch
        })
        .populate({
            path: 'idPengguna',
            select: 'fotoProfil _id nama'
        })
        .populate({
            path: 'idPeminjaman',
            select: 'berakhirPada _id dataPengembalian'
        })

    const bukuDiperpanjang = bukuDiperpanjangRaw.filter((item) => item.idBuku !== null);

    const ratioBukuDiperpanjang = await rasioPerpanjanganBuku()
    const statsBukuDiperpanjangan = await statsBukuDiPerpanjang()

    return {
        bukuDiperpanjang,
        ratioBukuDiperpanjang,
        statsBukuDiperpanjangan
    }
}

export const getSemuaBukuDikembalikan = async({query} : {query: any}) => {
    let bukuMatch: any = {}

    if (query?.query) {
        bukuMatch.judul = {$regex: query.query, $options: 'i'}
    }

    if (query?.status) {
        bukuMatch.status = {$regex: query.status, $options: 'i'}
    }

    if (query?.penulis) {
        bukuMatch.penulis = {$regex: query.penulis, $options: 'i'}
    }

    if (query?.penerbit) {
        bukuMatch.penerbit = {$regex: query.penerbit, $options: 'i'}
    }

    if (query?.tahunTerbit) {
        bukuMatch.tahunTerbit = {$regex: query.tahunTerbit, $options: 'i'}
    }

    if (query?.kategori) {
        bukuMatch.kategori = {
            $in: [new RegExp(query.kategori, "i")]
        };
    }

    const bukuDikembalikanRaw = await Pengembalian.find({statusPengembalian: 'Dikembalikan'})
        .select('idBuku idPengguna idPeminjaman _id tanggalPengembalian keadaanBuku isMissing')
        .sort({createdAt: -1})
        .populate({
            path: 'idBuku',
            select: 'judul kategori ISBN',
            match: bukuMatch
        })
        .populate({
            path: 'idPengguna',
            select: 'fotoProfil _id nama'
        })
        .populate({
            path: 'idPeminjaman',
            select: 'berakhirPada _id'
        })

    const bukuDikembalikan = bukuDikembalikanRaw.filter((item) => item.idBuku !== null);

    const ratioBukuDikembalikan = await rasioPengembalianBuku()
    const statsBukuPengembalian = await stastBukuDikembalikan()

    return {
        bukuDikembalikan,
        ratioBukuDikembalikan,
        statsBukuPengembalian
    }
}

export const getSemuaBukuHilang = async({query} : {query: any}) => {
    let bukuMatch: any = {}

    if (query?.query) {
        bukuMatch.judul = {$regex: query.query, $options: 'i'}
    }

    if (query?.status) {
        bukuMatch.status = {$regex: query.status, $options: 'i'}
    }

    if (query?.penulis) {
        bukuMatch.penulis = {$regex: query.penulis, $options: 'i'}
    }

    if (query?.penerbit) {
        bukuMatch.penerbit = {$regex: query.penerbit, $options: 'i'}
    }

    if (query?.tahunTerbit) {
        bukuMatch.tahunTerbit = {$regex: query.tahunTerbit, $options: 'i'}
    }

    if (query?.kategori) {
        bukuMatch.kategori = {
            $in: [new RegExp(query.kategori, "i")]
        };
    }

    const bukuDihilangkaRaw = await Pengembalian.find({isMissing: true})
        .select('idBuku idPengguna idPeminjaman _id tanggalPengembalian statusPembayaran, totalDenda statusPembayaran')
        .sort({createdAt: -1})
        .populate({
            path: 'idBuku',
            select: 'judul kategori ISBN stok',
            match: bukuMatch
        })
        .populate({
            path: 'idPengguna',
            select: 'fotoProfil _id nama'
        })
        .populate({
            path: 'idPeminjaman',
            select: 'berakhirPada _id'
        })

    const bukuDihilangkan = bukuDihilangkaRaw.filter((item) => item.idBuku !== null);

    const ratioBukuDihilangkan = await rasioBukuHilang()
    const statsBukuDihilangkan = await statsBukuHilang()

    return {
        bukuDihilangkan,
        ratioBukuDihilangkan,
        statsBukuDihilangkan
    }
}

// SUDAH TESTING
export const getSatuBukuUntukPustakawan = async(idBuku: string) => {
    const buku = await Buku.findOne({_id: idBuku})
    if (!buku) {
        throw new NotFoundError('Buku tidak ditemukan!')
    }
    return buku
}

// SUDAH DITESTING
export const tambahDataBuku = async(dataBukuTerbaru: BukuSchemaType) => {
    const bukuTerbaru = await Buku.create(dataBukuTerbaru)
    return bukuTerbaru
}

// SUDAH DITESTING
export const editDataBuku = async(idBuku: string, dataBuku: BukuSchemaType) => {
    const buku = await Buku.findOneAndUpdate(
        {_id: idBuku},
        {...dataBuku},
        {new: true, runValidators: true}
    )

    if (!buku) throw new NotFoundError('Buku tidak ditemukan')

    return buku
}

// SUDAH DITESTING
export const hapusDataBuku = async(idBuku: string)  => {
    const buku = await Buku.findOneAndUpdate(
        {_id: idBuku},
        {dihapus: true},
        {new: true}
    );
    if (!buku) throw new NotFoundError('Buku tidak ditemukan!');
    
    return buku;
}


// FUNGSI PEMBANTU YANG DIGUNAKAN DI SERVICES LAIN / INI


// STATS UNTUK HALAMAN SEMUA BUKU PUSTAKAWAN
export const rasioKategoriBuku = async() => {
    const totalBuku = await Buku.find({isMissing: false}).countDocuments()
    const hasil = await Buku.aggregate([
        { $unwind: "$kategori" }, // pecah array kategori jadi baris terpisah
        {
        $group: {
            _id: "$kategori", // nama kategori langsung
            jumlahBuku: { $sum: 1 }
        }
        },
        { $sort: { jumlahBuku: -1 } }, // urutkan dari terbanyak ke sedikit
        {
        $project: {
            _id: 0,
            kategori: "$_id",
            jumlahBuku: 1
        }
        }
    ]);

    return hasil;
}

export const allBukuStats = async() => {
    const now = new Date();
    const sixMonthsAgo = startOfMonth(subMonths(now, 5));
    
    const pertumbuhanBulanan = await Peminjaman.aggregate([
        {
            $match: {
                createdAt: { $gte: sixMonthsAgo },
            },
        },
        {
            $group: {
            _id: {
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" },
            },
            jumlah: { $sum: 1 },
            },
        },
        {
            $sort: {
            "_id.year": 1,
            "_id.month": 1,
            },
        },
        {
            $project: {
            _id: 0,
            bulan: {
                $let: {
                vars: {
                    bulanArray: [
                    "", // index ke-0 agar Januari = 1
                    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                    ],
                },
                in: {
                    $concat: [
                    { $arrayElemAt: ["$$bulanArray", "$_id.month"] },
                    " ",
                    { $toString: "$_id.year" },
                    ],
                },
                },
            },
            jumlah: 1,
            },
        },
    ]);
    return pertumbuhanBulanan
}

// STATS UNTUK HALAMAN SEMUA BUKU DIPINJAM PUSTAKAWAN
export const rasioPeminjamanBuku = async() => {
    const totalBuku = await getTotalBukuByItem()
    const totalBukuDipinjam = await Peminjaman.find({$or : [
        {statusPeminjaman: 'Dipinjam'},
        {statusPeminjaman: 'Terlambat'}
    ]}).countDocuments()

    return [totalBuku, totalBukuDipinjam]
}

export const statsBukuDipinjam = async() => {
    const statistikPinjaman = await Peminjaman.aggregate([
        {
            $match: {
            statusPeminjaman: { $in: ["Dipinjam", "Dikembalikan"] }
            }
        },
        {
            $group: {
            _id: {
                tahun: { $year: "$createdAt" },
                bulan: { $month: "$createdAt" }
            },
            jumlah: { $sum: 1 }
            }
        },
        {
            $sort: {
            "_id.tahun": -1,
            "_id.bulan": -1
            }
        },
        {
            $limit: 6
        },
        {
            $addFields: {
            bulan: {
                $concat: [
                {
                    $arrayElemAt: [
                    [
                        "", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                    ],
                    "$_id.bulan"
                    ]
                },
                " ",
                { $toString: "$_id.tahun" }
                ]
            }
            }
        },
        {
            $project: {
                _id: 0,
                bulan: 1,
                jumlah: 1
            }
        },
        {
            $sort: { bulan: 1 }
        }
    ]);

    return statistikPinjaman
}

// STATS UNTUK HALAMAN SEMUA BUKU DIPERPANJANG PUSTAKAWAN
export const rasioPerpanjanganBuku = async() => {
    const totalBuku = await getTotalBukuByItem()
    const totalBukuDiperpanjang = await Perpanjangan.find({disetujui: 'Diterima'}).countDocuments()

    return [totalBuku, totalBukuDiperpanjang]
}

export const statsBukuDiPerpanjang = async() => {
     const statistikPerpanjangan = await Perpanjangan.aggregate([
        {
            $match: {
                disetujui: 'Diterima'
            }
        },
        {
            $group: {
            _id: {
                tahun: { $year: "$createdAt" },
                bulan: { $month: "$createdAt" }
            },
            jumlah: { $sum: 1 }
            }
        },
        {
            $sort: {
            "_id.tahun": -1,
            "_id.bulan": -1
            }
        },
        {
            $limit: 6
        },
        {
            $addFields: {
            bulan: {
                $concat: [
                {
                    $arrayElemAt: [
                    [
                        "", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                    ],
                    "$_id.bulan"
                    ]
                },
                " ",
                { $toString: "$_id.tahun" }
                ]
            }
            }
        },
        {
            $project: {
                _id: 0,
                bulan: 1,
                jumlah: 1
            }
        },
        {
            $sort: { bulan: 1 }
        }
    ]);

    return statistikPerpanjangan    
}

// STATS UNTUK HALAMAN SEMUA BUKU DIKEMBALIKAN PUSTAKAWAN
export const rasioPengembalianBuku = async() => {
    const totalBuku = await getTotalBukuByItem()
    const totalBukuDikembalikan = await Pengembalian.find({
        statusPengembalian: 'Dikembalikan'
    }).countDocuments()

    return [totalBuku, totalBukuDikembalikan]
}

export const stastBukuDikembalikan = async() => {
    const statistikPengembalian = await Perpanjangan.aggregate([
        {
            $match: {
                statusPengembalian: 'Diterima'
            }
        },
        {
            $group: {
            _id: {
                tahun: { $year: "$createdAt" },
                bulan: { $month: "$createdAt" }
            },
            jumlah: { $sum: 1 }
            }
        },
        {
            $sort: {
            "_id.tahun": -1,
            "_id.bulan": -1
            }
        },
        {
            $limit: 6
        },
        {
            $addFields: {
            bulan: {
                $concat: [
                {
                    $arrayElemAt: [
                    [
                        "", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                    ],
                    "$_id.bulan"
                    ]
                },
                " ",
                { $toString: "$_id.tahun" }
                ]
            }
            }
        },
        {
            $project: {
                _id: 0,
                bulan: 1,
                jumlah: 1
            }
        },
        {
            $sort: { bulan: 1 }
        }
    ]);

    return statistikPengembalian
}

// STATS UNTUK HALAMAN SEMUA BUKU DIHILANGKAN PUSTAKAWAN
export const rasioBukuHilang = async() => {
    const totalBuku = await getTotalBukuByItem()
    const totalBukuDihilangkan = await Pengembalian.find({
        isMissing: true
    }).countDocuments()

    return [totalBuku, totalBukuDihilangkan]
}

export const statsBukuHilang = async() => {
    const statistikKehilangan = await Perpanjangan.aggregate([
        {
            $match: {
                isMissing: true
            }
        },
        {
            $group: {
            _id: {
                tahun: { $year: "$createdAt" },
                bulan: { $month: "$createdAt" }
            },
            jumlah: { $sum: 1 }
            }
        },
        {
            $sort: {
            "_id.tahun": -1,
            "_id.bulan": -1
            }
        },
        {
            $limit: 6
        },
        {
            $addFields: {
            bulan: {
                $concat: [
                {
                    $arrayElemAt: [
                    [
                        "", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                    ],
                    "$_id.bulan"
                    ]
                },
                " ",
                { $toString: "$_id.tahun" }
                ]
            }
            }
        },
        {
            $project: {
                _id: 0,
                bulan: 1,
                jumlah: 1
            }
        },
        {
            $sort: { bulan: 1 }
        }
    ]);

    return statistikKehilangan
}

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