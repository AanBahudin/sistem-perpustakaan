import mongoose, { ObjectId } from "mongoose" 
import Suka from "../model/Suka"

export const createOrFetchData = async({userId} : {userId: string}) => {
    const isSukaExist = await Suka.findOne({userId: userId})
    if (!isSukaExist) {
        return createSukaData({userId})
    } else {
        return fetchSukaData({userId})
    }
}

export const addOrRemoveBuku = async({userId, bukuId} : {userId: string, bukuId: string}) => {
    const suka = await Suka.findOne({userId})
    

    if (!suka) {
        await createSukaData({userId})
        await addSuka({userId, bukuId})
    } else {
        const bukuObjectId = new mongoose.Types.ObjectId(bukuId);
        const isAlreadyLiked = suka.bukuDisukai.includes(bukuObjectId as any)
        if (isAlreadyLiked) {
            return removeBuku({userId, bukuId})
        } else {
            return addSuka({userId, bukuId})
        }
    }

}

// fungsi terpisah

export const createSukaData = async({userId} : {userId: string}) => {
    const dataSuka = await Suka.create({userId})
    return dataSuka
}

export const fetchSukaData = async({userId} : {userId: string}) => {
    const suka = await Suka.findOne({userId})
        .select('bukuDisukai')
        .populate({
            path: 'bukuDisukai',
            select: '-dihapus -createdBy -totalDihilangkan'
        })
    return suka
}

export const addSuka = async({userId, bukuId} : {userId: string, bukuId: string}) => {
    const addBuku = await Suka.findOneAndUpdate(
        { userId },
        {$addToSet: {bukuDisukai: bukuId}},
        { new: true, runValidators: true }
    )
    return addBuku
}

export const removeBuku = async({userId, bukuId} : {userId: string, bukuId: string}) => {
    const removeBuku = await Suka.findOneAndUpdate(
        { userId },
        {$pull: {bukuDisukai: bukuId}},
        { new: true, runValidators: true }
    )
    return removeBuku
}