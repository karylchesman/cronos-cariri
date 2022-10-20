import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import Swal from 'sweetalert2';
import { api } from '../services/ApiService';
import { SearchObject } from '../utils/search-object';

interface ISearchState<DataType> {
    limit: number;
    page: number;
    search_params?: SearchObject<DataType> | string;
    registers: number;
    order_by: string;
    order: "ASC" | "DESC";
}

interface IUseDataPaginationProps<DataType, InitialOrderByType> {
    initalState: DataType | null,
    initalOrderBy: keyof InitialOrderByType;
    endPointPath: string;
}

export function useDataPagination<RequestReturnType, DataType>({ initalState, endPointPath }: IUseDataPaginationProps<RequestReturnType, DataType>) {
    const theme = useTheme();
    const [data, setData] = useState<RequestReturnType | null>(initalState);
    const [searchTerm, setSearchTerm] = useState<string | undefined>("");
    const [isLoading, setIsloading] = useState(false);
    const [searchPagination, setSearchPagination] = useState<ISearchState<DataType>>({
        limit: 10,
        page: 1,
        search_params: undefined,
        registers: 0,
        order_by: "name",
        order: "ASC"
    })

    async function handleRequestData(signal?: AbortSignal) {
        setIsloading(true)
        try {
            const result = await api.post(`${endPointPath}?limit=${searchPagination.limit}&page=${searchPagination.page}`, {
                search_params: searchPagination.search_params,
                order_by: searchPagination.order_by,
                order: searchPagination.order
            }, { signal });

            setData(result.data);
            setSearchPagination((state) => ({
                ...state,
                registers: result.data.registers,
                page: result.data.registers !== searchPagination.registers ? 1 : searchPagination.page
            }))
        } catch (err: AxiosError | any) {
            if (err.name === "CanceledError") return;

            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: err.response ? err.response.data.error : "Falha ao tentar comunicar-se com o servidor.",
                toast: true,
                confirmButtonColor: theme.button_colors.primary,
                confirmButtonText: "Tentar novamente",
                showDenyButton: true,
                denyButtonText: "Cancelar",
                denyButtonColor: theme.button_colors.danger,
                preConfirm: () => handleRequestData()
            })
        }
        setIsloading(false)
    }

    function searchByTerm() {
        setSearchPagination((state) => ({ ...state, search_params: searchTerm }))
    }

    function changeOrder(order_by: string) {
        setSearchPagination((state) => ({ ...state, order_by, order: state.order === "ASC" ? "DESC" : "ASC" }))
    }

    useEffect(() => {
        const controller = new AbortController();
        handleRequestData(controller.signal);

        return () => {
            controller.abort();
        }
    }, [
        searchPagination.search_params,
        searchPagination.limit,
        searchPagination.page,
        searchPagination.order_by,
        searchPagination.order
    ])

    return {
        searchByTerm,
        setSearchTerm,
        changeOrder,
        isLoading,
        searchPagination,
        setSearchPagination,
        data,
        setData,
        handleRequestData
    }
}