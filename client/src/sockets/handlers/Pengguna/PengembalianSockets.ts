import { toast } from 'sonner';

interface PengembalianData {
  tipe: string;
  data: { _id: string; idBuku: string };
  title: string;
  deskripsi: string;
}

export const handlePengembalianPeminjaman = ( response: PengembalianData, navigate: (path: string) => void, toastFn: typeof toast ) => {
  try {
    const { tipe, data, title, deskripsi } = response;
    const detailURL = `/my/${tipe.toLowerCase()}/${data._id}/${data.idBuku}`;

    toastFn(title, {
      description: deskripsi,
      duration: 10000,
      action: {
        label: 'Lihat',
        onClick: () => navigate(detailURL),
      }
    });
  } catch (error) {
    toastFn.error('Gagal menampilkan notifikasi pengembalian peminjaman.');
  }
};
