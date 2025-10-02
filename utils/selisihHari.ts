export function hitungKeterlambatan(berakhirPada: Date): number {
    const hariIni = new Date();
  
    // Buang jam, menit, detik supaya hitungannya bersih harian
    hariIni.setHours(0, 0, 0, 0);
    const akhir = new Date(berakhirPada);
    akhir.setHours(0, 0, 0, 0);
  
    const selisihMs = hariIni.getTime() - akhir.getTime();
    const selisihHari = Math.floor(selisihMs / (1000 * 60 * 60 * 24));
  
    // Kalau belum lewat, dianggap tidak terlambat
    return selisihHari > 0 ? selisihHari : 0;
  }
  