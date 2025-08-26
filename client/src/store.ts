import { configureStore } from "@reduxjs/toolkit";
import globalReducer from '@/cart/globalSlice'
import profileReducer from '@/cart/profileSlice'
import peminjamanState from '@/cart/peminjamanSlice'
import detailBukuReducer from '@/cart/detailBookSlice'
import dashboardState from '@/cart/dashboardSlice'
import perpanjanganState from '@/cart/perpanjanganSlice'
import pustakawanSidebarState from '@/cart/pustakawanSidebar'
import sheetFilterState from '@/cart/SheetFilterSlice'
import peminjamanFilterSheetState from '@/cart/peminjamanFilterSheetSlice'
import perpanjanganFilterSheetState from '@/cart/perpanjanganFilterSheetSlice'
import pengembalianFilterSheetState from '@/cart/pengembalianFilterSheetSlice'
import bukuFilterSheetState from '@/cart/bukuFilterSheetSlice'
import pengembalianState from '@/cart/pengembalianSlice'
import pustakawanTambahBukuState from '@/cart/pustakawanTambahBukuSlice'

export const store = configureStore({
    reducer: {
        globalState: globalReducer,
        dashboardState: dashboardState,
        profileState: profileReducer,
        peminjamanState: peminjamanState,
        pengembalianState: pengembalianState,
        detailBukuState: detailBukuReducer,
        perpanjanganState: perpanjanganState,
        pustakawanSidebarState: pustakawanSidebarState,
        sheetState: sheetFilterState,
        peminjamanFilterSheetState: peminjamanFilterSheetState,
        perpanjanganFilterSheetState: perpanjanganFilterSheetState,
        pengembalianFilterSheetState: pengembalianFilterSheetState,
        bukuFilterSheetState: bukuFilterSheetState,
        pustakawanTambahBukuState
    }
})