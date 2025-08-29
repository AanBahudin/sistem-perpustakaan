import {startOfMonth, subMonths} from "date-fns";
import Buku from "../../model/Buku";
import Peminjaman from "../../model/Peminjaman";
import mongoose from "mongoose";
import Perpanjangan from "../../model/Perpanjangan";
import Pengembalian from "../../model/Pengembalian";

const bulanArray: Array<string> = [
    "", // index ke-0 agar Januari = 1
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
]

export const getBukuDiprosesPustakawanStats = async(pustakawanId: string) => {
    const now = new Date();
    const sixMonthsAgo = startOfMonth(subMonths(now, 5));
        
    const pertumbuhanBukuDibuat = await Buku.aggregate([
        {
            $match: {
                createdAt: { $gte: sixMonthsAgo },
                createdBy: new mongoose.Types.ObjectId(pustakawanId)
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
                    bulanArray
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
    return pertumbuhanBukuDibuat
}

export const getPeminjamanDiprosesPustakawanStats = async(pustakawanId: string) => {
    const now = new Date();
    const sixMonthsAgo = startOfMonth(subMonths(now, 5));
        
    const pertumbuhanPeminjamanDiterima = await Peminjaman.aggregate([
        {
            $match: {
                createdAt: { $gte: sixMonthsAgo },
                diprosesOleh: new mongoose.Types.ObjectId(pustakawanId)
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
                    bulanArray
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
    return pertumbuhanPeminjamanDiterima
}

export const getPerpanjanganDiprosesPustakawanStats = async(pustakawanId: string) => {
    const now = new Date();
    const sixMonthsAgo = startOfMonth(subMonths(now, 5));
        
    const pertumbuhanPerpanjanganStats = await Perpanjangan.aggregate([
        {
            $match: {
                createdAt: { $gte: sixMonthsAgo },
                diprosesOleh: new mongoose.Types.ObjectId(pustakawanId)
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
                    bulanArray
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
    return pertumbuhanPerpanjanganStats
}

export const getPengembalianDiprosesPustakawanStats = async(pustakawanId: string) => {
    const now = new Date();
    const sixMonthsAgo = startOfMonth(subMonths(now, 5));
        
    const pertumbuhanPengembalianStats = await Pengembalian.aggregate([
        {
            $match: {
                createdAt: { $gte: sixMonthsAgo },
                diprosesOleh: new mongoose.Types.ObjectId(pustakawanId)
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
                    bulanArray
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
    return pertumbuhanPengembalianStats
}