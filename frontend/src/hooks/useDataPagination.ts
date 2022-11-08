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
    search_params?: SearchObject<DataType>[] | string;
    registers: number;
    order_by: string;
    order: "ASC" | "DESC";
}

interface IUseDataPaginationProps<RequestReturnType, DataType> {
    initalState: RequestReturnType | null,
    initalOrderBy: keyof DataType;
    endPointPath: string;
}

export function useDataPagination<RequestReturnType, DataType>({ initalState, endPointPath }: IUseDataPaginationProps<RequestReturnType, DataType>) {
    const theme = useTheme();
    const [data, setData] = useState<RequestReturnType | null>(initalState);
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
            }, { signal: signal });
            
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

    function changeSearch(search_value: SearchObject<DataType>[] | string) {
        setSearchPagination((state) => ({ ...state, search_params: search_value }))
    }

    function changeOrder(order_by: string) {
        setSearchPagination((state) => ({ ...state, order_by, order: state.order === "ASC" ? "DESC" : "ASC" }))
    }

    function addOrRemoveFilter(filter: SearchObject<DataType>) {
        if (typeof searchPagination.search_params === "string" || searchPagination.search_params === undefined) return;

        let alreadyExists = searchPagination.search_params.findIndex(item => item === filter);
        let new_array: SearchObject<DataType>[] = searchPagination.search_params;

        if (alreadyExists !== -1) {
            let to_remove = searchPagination.search_params.slice(alreadyExists, (alreadyExists + 1));
            new_array = searchPagination.search_params.filter(item => {
                if (!to_remove.includes(item)) return item
            })

            changeSearch(new_array);
        } else {
            changeSearch(new_array.concat(filter));
        }
    }

    useEffect(() => {     
        const controller = new AbortController(); 
        handleRequestData(controller.signal);
        
        return () => {
            controller.abort();
        }
    }, [
        /* searchPagination.search_params, */
        searchPagination.limit,
        searchPagination.page,
        searchPagination.order_by,
        searchPagination.order
    ])

    return {
        changeSearch,
        addOrRemoveFilter,
        changeOrder,
        isLoading,
        searchPagination,
        setSearchPagination,
        data,
        setData,
        handleRequestData
    }
}