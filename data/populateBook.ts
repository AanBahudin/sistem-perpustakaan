import dotenv from 'dotenv'
dotenv.config()

import databaseConnectionFunction from "./db/connect"
import Buku from "./model/Buku"
import fs from 'fs'


const populateDb = async() => {

    const dataPath = "./buku_data.json";
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const bukuList = JSON.parse(rawData);

    try {
        await databaseConnectionFunction(process.env.MONGO_URL as string)
        await Buku.insertMany(bukuList);
        console.log(`✅ Berhasil menambahkan ${bukuList.length} buku ke database.`);
    } catch (error) {
        console.error("❌ Gagal menambahkan data:", error);
    }
}

populateDb()