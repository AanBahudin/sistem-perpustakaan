import Peminjaman from '../model/Peminjaman'
import Pengguna from '../model/Pengguna'
import { getBukuHilang } from './bukuServices'
import { pustakawanGetDataPengembalian } from './pengembalianServices'
import { getSemuaPerpanjanganUser } from './perpanjanganServices'
import { startOfMonth, subMonths } from "date-fns";

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

    const monthlyUserGrowth = await allUserStats()
    const userAccountStatusRatio = await allUserAccountStatusRatio()

    return {pengguna, monthlyUserGrowth, userAccountStatusRatio}
}




export const allUserAccountStatusRatio = async() => {
    const statusAkunCount = await Pengguna.aggregate([
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

    statusAkunCount.forEach((item) => {
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