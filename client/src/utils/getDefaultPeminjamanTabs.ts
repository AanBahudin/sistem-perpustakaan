import { DefaultStateType } from "@/cart/peminjamanSlice";

export const getDefaultPeminjamanFilterFromQuery = () : DefaultStateType['peminjamanFilter'] => {
  if (typeof window === 'undefined') return 'semua'; // SSR-safe

  const params = new URLSearchParams(window.location.search);
  const filter = params.get('filter');

  const allowed = ['semua', 'Dipinjam', 'Dikembalikan', 'Diajukan', 'Ditolak'];

  if (filter && allowed.includes(filter)) {
    return filter as DefaultStateType['peminjamanFilter'];
  }

  const returnValue = filter ? filter : 'semua'

  return returnValue as DefaultStateType['peminjamanFilter'];
};
