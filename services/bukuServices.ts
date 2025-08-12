import Buku, { BukuSchemaType } from "../model/Buku";
import { NotFoundError } from "../errors/errorHandler";
import Peminjaman from "../model/Peminjaman";
import Pengembalian from "../model/Pengembalian";
import { startOfMonth, subMonths } from "date-fns";

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

export const getSemuaBukuUntukPustakawan = async({query = 'test'} : {query?: string}) => {
    const books = await Buku.find()
    const dataRasio = await rasioKategoriBuku()
    const dataStats = await allBukuStats()
    return {
        dataBuku: books,
        dataRasio, 
        dataStats,
    }
}

// SUDAH TESTING
export const getSatuBukuUntukPustakawan = async(idBuku: string) => {
    const buku = await Buku.findOne({_id: idBuku})
    if (!buku) throw new NotFoundError('Buku tidak ditemukan!')
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
        {$inc: {totalDipinjam: -1}},
        {new: true, runValidators: true}
    )
}

export const getBukuHilang = async() => {
    const buku = await Buku.findOne({isMissing: true})
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