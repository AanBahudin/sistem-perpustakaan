import { useQueries } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import getAllKategori from '@/actions/Shared/Kategori/getAllKategoriAction'
import { getAllPenerbit } from '@/actions/Shared/Penerbit/penerbitActions'
import { getAllPenulis } from '@/actions/Shared/Penulis/penulistAction'
import { searchBookPageDataLoader } from '@/actions/searchActions'


const usePenggunaSearchBuku = () => {


    // REFACTOR 

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams).toString()

    const result = useQueries({
        queries: [
        {
            queryKey: ['search', params],
            queryFn: () => searchBookPageDataLoader(params as string),
        },
        {
            queryKey: ['search', 'kategori', params],
            queryFn: getAllKategori
        },
        {
            queryKey: ['penerbit'],
            queryFn: getAllPenerbit
        },
        {
            queryKey: ['penulis'],
            queryFn: getAllPenulis
        }
        ]
    })


    const [searchData, allKategori, dataPenerbit, dataPenulis] = result
    const isLoading = result.some(q => q.isLoading)

    useEffect(() => {
        if (!params) {
        navigate('/my/buku')
        }
    }, [])

    return {
        isLoading,
        allKategori: allKategori.data,
        dataPenerbit: dataPenerbit.data,
        dataPenulis: dataPenulis.data,
        searchData: searchData.data
    }

}

export default usePenggunaSearchBuku