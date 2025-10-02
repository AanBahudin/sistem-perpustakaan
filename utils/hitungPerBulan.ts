type Dokumen = {
  createdAt: Date | string; // bisa Date atau string ISO
  [key: string]: any;
};

type PerBulanMap = Record<string, number>;

export const hitungPerBulan = (data: Dokumen[], fieldTanggal: keyof Dokumen): PerBulanMap => {
  const hasil: PerBulanMap = {};

  data.forEach(item => {
    const date = new Date(item[fieldTanggal] as string);
    const bulan = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' }); 
    hasil[bulan] = (hasil[bulan] || 0) + 1;
  });

  return hasil;
}