export function hitungMundurTanggal(tanggalTarget: Date | string): string {
  const sekarang = new Date();
  const target = new Date(tanggalTarget);

  const selisihMs = target.getTime() - sekarang.getTime();

  if (selisihMs <= 0) {
    return "Sudah lewat";
  }

  const selisihHari = Math.ceil(selisihMs / (1000 * 60 * 60 * 24));

  if (selisihHari === 1) {
    return "1 Hari lagi";
  }

  return `${selisihHari} Hari lagi`;
}
