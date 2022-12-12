import { useEffect } from 'react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import Swal from 'sweetalert2';
import { api } from '../services/ApiService';
import { useToast } from '@chakra-ui/react';

interface IUseApiRequestProps<RequestReturnType> {
    errorHandlerType?: "toast" | "dialog",
    handleOnFirstRender?: boolean;
    defaultConfig: AxiosRequestConfig;
    successMessage?: string;
    onSuccess?: (data: RequestReturnType, requestConfig: AxiosRequestConfig) => void;
}

type IUseApiRequestReturn<RequestReturnType> = {
    data: RequestReturnType | null,
    isLoading: boolean,
    handleRequest: (config?: AxiosRequestConfig) => Promise<void>,
    abortRequest: () => void
}

export function useApiRequest<RequestReturnType = any>({
    errorHandlerType = "dialog",
    handleOnFirstRender = true,
    defaultConfig,
    successMessage,
    onSuccess
}: IUseApiRequestProps<RequestReturnType>) {

    const theme = useTheme();
    const controller = new AbortController();
    const toast = useToast();
    const [data, setData] = useState<RequestReturnType | null>(null);
    const [isLoading, setIsloading] = useState(false);

    async function handleRequest(config?: AxiosRequestConfig) {
        setIsloading(true)
        try {
            const result = await api.request(config || defaultConfig);

            setData(result.data);
            onSuccess ? onSuccess(result.data, result.config) : null;

            if (successMessage !== undefined) {
                toast({
                    title: "Feito!",
                    description: successMessage,
                    status: "success",
                    duration: 3000,
                    variant: "left-accent",
                    position: "top"
                });
            }

        } catch (err: AxiosError | any) {
            console.log(err.name)
            if (err.name === "CanceledError") return;

            if (errorHandlerType === "dialog") {
                await handlerByDialog(err, config || defaultConfig);
            } else {
                handlerByToast(err);
            }
        }
        setIsloading(false)
    }

    async function handlerByDialog(err: AxiosError | any, config: AxiosRequestConfig) {
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
            preConfirm: () => handleRequest(config)
        })
    }

    function handlerByToast(err: AxiosError | any) {
        toast({
            title: "Ops...",
            description: err.response ? err.response.data.error : "Falha ao tentar comunicar-se com o servidor.",
            status: "warning",
            duration: 3000,
            variant: "left-accent",
            position: "top"
        })
    }

    function abortRequest() {
        controller.abort();
    }


    useEffect(() => {
        if (handleOnFirstRender === true) {
            handleRequest(defaultConfig);

            return () => {
                abortRequest();
            }
        }
    }, [])

    return {
        data,
        isLoading,
        handleRequest,
        abortRequest
    } as IUseApiRequestReturn<RequestReturnType>
}