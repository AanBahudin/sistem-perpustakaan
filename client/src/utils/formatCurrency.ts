export function formatRupiah(angka: any, withPrefix = true) {
  if (typeof angka !== 'number') {
    angka = parseFloat(angka);
    if (isNaN(angka)) return withPrefix ? 'Rp0' : '0';
  }

  return (withPrefix ? 'Rp. ' : '') + angka
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}