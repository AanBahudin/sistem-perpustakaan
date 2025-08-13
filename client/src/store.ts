import { configureStore } from "@reduxjs/toolkit";
import globalReducer from '@/cart/globalSlice'
import profileReducer from '@/cart/profileSlice'
import peminjamanReducer from '@/cart/peminjamanSlice'
import pengembalianReducer from '@/cart/pengembalianSlice'
import detailBukuReducer from '@/cart/detailBookSlice'
import dashboardState from '@/cart/dashboardSlice'
import perpanjanganState from '@/cart/perpanjanganSlice'
import pustakawanSidebarState from '@/cart/pustakawanSidebar'
import sheetFilterState from '@/cart/SheetFilterSlice'
import peminjamanFilterSheetState from '@/cart/peminjamanFilterSheetSlice'
import perpanjanganFilterSheetState from '@/cart/perpanjanganFilterSheetSlice'
import pengembalianFilterSheetState from '@/cart/pengembalianFilterSheetSlice'
import bukuFilterSheetState from '@/cart/bukuFilterSheetSlice'

export const store = configureStore({
    reducer: {
        globalState: globalReducer,
        dashboardState: dashboardState,
        profileState: profileReducer,
        peminjamanState: peminjamanReducer,
        pengembalianState: pengembalianReducer,
        detailBukuState: detailBukuReducer,
        perpanjanganState: perpanjanganState,
        pustakawanSidebarState: pustakawanSidebarState,
        sheetState: sheetFilterState,
        peminjamanFilterSheetState: peminjamanFilterSheetState,
        perpanjanganFilterSheetState: perpanjanganFilterSheetState,
        pengembalianFilterSheetState: pengembalianFilterSheetState,
        bukuFilterSheetState: bukuFilterSheetState
    }
})