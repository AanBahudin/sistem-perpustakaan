import Peminjaman from '../model/Peminjaman'
import Pengembalian from '../model/Pengembalian'
import Pengguna from '../model/Pengguna'
import Perpanjangan from '../model/Perpanjangan'
import { getBukuHilang } from './bukuServices'
import { getPeminjamanByUserId } from './peminjamanServices'
import { getPengembalianByUserId, pustakawanGetDataPengembalian } from './pengembalianServices'
import { getPerpanjanganByUserId, getSemuaPerpanjanganUser } from './perpanjanganServices'
import { startOfMonth, subMonths } from "date-fns";
import { hitungPerBulan } from '../utils/hitungPerBulan'

type StatusKey = 'Aktif' | 'Nonaktif' | 'Pending';

export const getStatsServices = async() => {
    const pengguna = await Pengguna.find()
    const peminjaman = await Peminjaman.find().sort({createdAt: -1}).populate(['buku', 'peminjam'])
    const {data: pengembalian} = await pustakawanGetDataPengembalian()
    const {data: perpanjangan} = await getSemuaPerpanjanganUser()
    const bukuHilang = await getBukuHilang()

    return {
        pengguna,
        peminjaman,
        pengembalian,
        perpanjangan,
        bukuHilang
    }
}

export const getAllPengguna = async({query} : {query: any}) => {
    let mongoQuery: any = { ...query }

    if (query?.query) {
        const searchRegex = { $regex: query.query, $options: "i" }

        mongoQuery.$or = [
            { nama: searchRegex },
            { idKampus: searchRegex }
        ]

        // Hapus 'query.query' agar tidak ikut dalam pencarian utama
        delete mongoQuery.query
    }

    const pengguna = await Pengguna.find(mongoQuery).sort({createdAt: -1})

    const monthlyUserGrowth = await allUserStats()
    const userAccountStatusRatio = await allUserAccountStatusRatio()

    return {pengguna, monthlyUserGrowth, userAccountStatusRatio}
}

export const getSinglePengguna = async({id} : {id: string}) => {
    const pengguna = await Pengguna.findOne({_id: id}).select('-password')
    const peminjaman = await getPeminjamanByUserId({userId: id})
    const perpanjangan = await getPerpanjanganByUserId({userId: id})
    const pengembalian = await getPengembalianByUserId({idPengguna: id})


    return {pengguna, peminjaman, perpanjangan, pengembalian}
}

export const getAllPenggunaDosen = async({query} : {query: any}) => {
    let mongoQuery: any = { ...query }

    if (query?.query) {
        const searchRegex = { $regex: query.query, $options: "i" }

        mongoQuery.$or = [
            { nama: searchRegex },
            { idKampus: searchRegex }
        ]

        // Hapus 'query.query' agar tidak ikut dalam pencarian utama
        delete mongoQuery.query
    }

    const pengguna = await Pengguna.find({role: 'Dosen', ...mongoQuery}).sort({createdAt: -1})

    const monthlyUserGrowth = await dosenUserGrowthStats()
    const userAccountStatusRatio = await userDosenRatio()

    return {pengguna, monthlyUserGrowth, userAccountStatusRatio}
}

export const getAllPenggunaMahasiswa = async({query} : {query: any}) => {
    let mongoQuery: any = { ...query }

    if (query?.query) {
        const searchRegex = { $regex: query.query, $options: "i" }

        mongoQuery.$or = [
            { nama: searchRegex },
            { idKampus: searchRegex }
        ]

        // Hapus 'query.query' agar tidak ikut dalam pencarian utama
        delete mongoQuery.query
    }

    const pengguna = await Pengguna.find({role: 'Mahasiswa', ...mongoQuery}).sort({createdAt: -1})

    const monthlyUserGrowth = await mahasiswaUserGrowthStats()
    const userAccountStatusRatio = await userDosenRatio()

    return {pengguna, monthlyUserGrowth, userAccountStatusRatio}
}

export const getAllPengajuanUser = async() => {
    const peminjaman = await Peminjaman.find({statusPeminjaman: 'Diajukan'}).populate(['peminjam', 'buku'])
    const pengembalian = await Pengembalian.find({statusPengembalian: 'Pending'}).populate(['idPengguna', 'idBuku'])
    const perpanjangan = await Perpanjangan.find({disetujui: 'Pending'}).populate(['idPengguna', 'idBuku'])

    const peminjamanPerBulan = hitungPerBulan(peminjaman, 'createdAt');
    const pengembalianPerBulan = hitungPerBulan(pengembalian, 'createdAt');
    const perpanjanganPerBulan = hitungPerBulan(perpanjangan, 'createdAt');

    const semuaBulan = new Set<string>([
    ...Object.keys(peminjamanPerBulan),
    ...Object.keys(pengembalianPerBulan),
    ...Object.keys(perpanjanganPerBulan)
    ]);

    // Tipe untuk data grafik
    interface DataGrafik {
        bulan: string;
        peminjaman: number;
        perpanjangan: number;
        pengembalian: number;
    }

    const dataGrafik: DataGrafik[] = Array.from(semuaBulan).map(bulan => ({
        bulan,
        peminjaman: peminjamanPerBulan[bulan] || 0,
        perpanjangan: perpanjanganPerBulan[bulan] || 0,
        pengembalian: pengembalianPerBulan[bulan] || 0
    }));

    const pengajuanRatio = [peminjaman.length, perpanjangan.length, pengembalian.length]

    return {peminjaman, pengembalian, perpanjangan, dataGrafik, pengajuanRatio}
}

export const getAllPengajuanPeminjamanUser = async({query} : {query: any}) => {

    const searchNama = query.query || ''; // Ambil keyword pencarian
    const mongoQuery: any = { ...query };
    delete mongoQuery.query; // Hapus field `query` biar nggak ikut nyampur ke find()
    // Ambil semua peminjaman + populate peminjam yang cocok
    const rawData = await Peminjaman.find(mongoQuery)
        .sort({ createdAt: -1 })
        .populate({
        path: 'peminjam',
        select: 'nama email _id fotoProfil',
        match: searchNama
            ? { nama: { $regex: searchNama, $options: 'i' } }
            : {},
        })
        .populate({
            path: 'buku',
            select: 'judul _id kategori',
        });

    // Filter supaya hanya data yang peminjamnya ketemu
    const pengajuanPeminjaman = rawData.filter((item) => item.peminjam !== null);
        
    const rasioStatusPeminjaman = await allStatusPeminjamanRatio()
    const statsPeminjaman = await allPeminjamanStats()
    return {
        pengajuanPeminjaman, 
        rasioStatusPeminjaman, 
        statsPeminjaman
    }
}

export const getSinglePengajuanPeminjamanUser = async({id} : {id: string}) => {
    const dataPeminjaman = await Peminjaman.findOne({_id: id}).populate(['peminjam', 'buku']).select('-password -email')
    return dataPeminjaman
}



// services pembantu
export const allUserAccountStatusRatio = async() => {
    const statusPeminjaman = await Pengguna.aggregate([
        {
            $group: {
            _id: "$statusAkun",
            jumlah: { $sum: 1 },
            },
        },
    ]);

    // Ubah ke bentuk array [Aktif, Nonaktif, Pending]
    
    const statusMap: Record<StatusKey, number> = {
        Aktif: 0,
        Nonaktif: 0,
        Pending: 0,
    };

    statusPeminjaman.forEach((item) => {
        const key = item._id as StatusKey;
        statusMap[key] = item.jumlah;
    });

    const hasilRasio = [statusMap.Aktif, statusMap.Nonaktif, statusMap.Pending];
    return hasilRasio
}

export const allUserStats = async() => {
    const now = new Date();
    const sixMonthsAgo = startOfMonth(subMonths(now, 5));

    const pertumbuhanBulanan = await Pengguna.aggregate([
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

export const dosenUserGrowthStats = async() => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const pertumbuhanDosenBulanan = await Pengguna.aggregate([
        {
            $match: {
            createdAt: { $gte: sixMonthsAgo },
            role: "Dosen", // 🧠 hanya dosen
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
                    "", // agar Januari = index 1
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

    return pertumbuhanDosenBulanan
}

export const userDosenRatio = async() => {
    const perbandinganRole = await Pengguna.aggregate([
        {
            $group: {
            _id: "$role",
            jumlah: { $sum: 1 },
            },
        },
    ]);

    const roleMap = {
        Mahasiswa: 0,
        Dosen: 0,
    };

    perbandinganRole.forEach((item) => {
        const key = item._id as "Mahasiswa" | "Dosen";
        roleMap[key] = item.jumlah;
    });

    const hasilChart = [roleMap.Mahasiswa, roleMap.Dosen];

    return hasilChart
}

export const mahasiswaUserGrowthStats = async() => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const pertumbuhanMahasiswaBulanan = await Pengguna.aggregate([
        {
            $match: {
            createdAt: { $gte: sixMonthsAgo },
            role: "Mahasiswa", // 🧠 hanya dosen
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
                    "", // agar Januari = index 1
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

    return pertumbuhanMahasiswaBulanan
}

export const allStatusPeminjamanRatio = async() => {
    const statusPeminjaman = await Peminjaman.aggregate([
        {
            $group: {
            _id: "$statusPeminjaman",
            jumlah: { $sum: 1 },
            },
        },
    ]);

    // Ubah ke bentuk array [Aktif, Nonaktif, Pending]
    
    const statusMap: Record<any, number> = {
        Dipinjam: 0,
        Dikembalikan: 0,
        Terlambat: 0,
        Diajukan: 0,
        Ditolak: 0,
    };

    statusPeminjaman.forEach((item) => {
        const key = item._id as StatusKey;
        statusMap[key] = item.jumlah;
    });

    const hasilRasio = [
        statusMap.Dipinjam, 
        statusMap.Dikembalikan, 
        statusMap.Terlambat,
        statusMap.Diajukan,
        statusMap.Ditolak,
    ];
    return hasilRasio
}

export const allPeminjamanStats = async() => {
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