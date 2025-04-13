import DurasiPeminjaman from "../model/DurasiPeminjaman";

const dataDurasiPeminjaman = async() => {
    const data = DurasiPeminjaman.find()

    return data;
}

export default dataDurasiPeminjaman