import { toast } from 'sonner';

interface PeminjamanData {
  tipe: string;
  data: { _id: string; buku: string };
  title: string;
  deskripsi: string;
}

export const handlePeminjamanDitolak = (data: PeminjamanData, navigate: (path: string) => void, toastFn: typeof toast) => {
  try {
    const { tipe, data: dataPeminjaman, title, deskripsi } = data;
    const detailURL = `/my/${tipe.toLowerCase()}/${dataPeminjaman._id}/${dataPeminjaman.buku}`;

    toastFn(title, {
      description: deskripsi,
      action: {
        label: "Lihat",
        onClick: () => navigate(detailURL),
      }
    });
  } catch (error) {
    toastFn.error('Gagal menampilkan notifikasi peminjaman ditolak.');
  }
};

export const handlePeminjamanDiterima = (data: PeminjamanData, navigate: (path: string) => void, toastFn: typeof toast) => {
  try {
    const { tipe, data: dataPeminjaman, title, deskripsi } = data;
    const detailURL = `/my/${tipe.toLowerCase()}/${dataPeminjaman._id}/${dataPeminjaman.buku}`;
    toastFn(title, {
      description: deskripsi,
      action: {
        label: "Lihat",
        onClick: () => navigate(detailURL),
      }
    });
  } catch (error) {
    toastFn.error('Gagal menampilkan notifikasi peminjaman diterima.');
  }
};
