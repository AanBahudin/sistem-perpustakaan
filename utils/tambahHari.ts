const tambahHariKeTanggal = (tanggal: Date, jumlahHari: number): Date => {
    return new Date(tanggal.getTime() + jumlahHari * 24 * 60 * 60 * 1000);
  };

export default tambahHariKeTanggal