import {startOfMonth, subMonths} from "date-fns";
import Peminjaman from "../../model/Peminjaman";
import mongoose from "mongoose";
import Perpanjangan from "../../model/Perpanjangan";
import Pengembalian from "../../model/Pengembalian";

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

export const statsDetailBukuTelahDipinjam = async({idBuku} : {idBuku: string}) => {
    const statistikPinjaman = await Peminjaman.aggregate([
        {
            $match: {
                statusPeminjaman: { $in: ["Dipinjam", "Dikembalikan"] },
                buku: new mongoose.Types.ObjectId(idBuku)
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

export const statsDetailBukuDikembalian = async({idBuku} : {idBuku: string}) => {
    const statistikPengembalian = await Pengembalian.aggregate([
        {
            $match: {
                statusPengembalian: 'Diterima',
                idBuku: new mongoose.Types.ObjectId(idBuku)
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

export const statsBukuHilang = async() => {
    const statistikKehilangan = await Pengembalian.aggregate([
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

export const statsDetailBukuTelahHilang = async({idBuku} : {idBuku: string}) => {
    const statistikKehilangan = await Pengembalian.aggregate([
        {
            $match: {
                isMissing: true,
                idBuku: new mongoose.Types.ObjectId(idBuku)
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