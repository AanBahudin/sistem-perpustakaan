import { toast } from 'sonner';

interface PerpanjanganData {
  tipe: string;
  data: { _id: string; idBuku: string };
  title: string;
  deskripsi: string;
}

export const handlePerpanjanganDiterima = (response: PerpanjanganData, navigate: (path: string) => void, toastFn: typeof toast) => {
  try {
    const { tipe, data, title, deskripsi } = response;
    const detailURL = `/my/${tipe.toLowerCase()}/${data._id}/${data.idBuku}`;

    toastFn(title, {
      description: deskripsi,
      action: {
        label: "Lihat",
        onClick: () => navigate(detailURL),
      }
    });
  } catch (error) {
    console.error('Error handling PERPANJANGAN_DITERIMA:', error);
    toastFn.error('Gagal menampilkan notifikasi perpanjangan diterima.');
  }
};

export const handlePerpanjanganDitolak = ( response: PerpanjanganData, navigate: (path: string) => void, toastFn: typeof toast) => {
  try {
    const { tipe, data, title, deskripsi } = response;
    const detailURL = `/my/${tipe.toLowerCase()}/${data._id}/${data.idBuku}`;
    toastFn(title, {
      description: deskripsi,
      action: {
        label: "Lihat",
        onClick: () => navigate(detailURL),
      }
    });
  } catch (error) {
    console.error('Error handling PERPANJANGAN_DITOLAK:', error);
    toastFn.error('Gagal menampilkan notifikasi perpanjangan ditolak.');
  }
};