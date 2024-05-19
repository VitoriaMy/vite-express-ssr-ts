import { useCallback } from "react";
import { useSetState } from "ahooks";
import ajax from "./base";
import { redirect } from "react-router-dom";


export enum responseCode {
    success = '0',
    fail = '500',
    undefined = '404',
    error = '400',
    nologin = '401',
}

interface QueryParams<S,T> extends apiBaseType<S,T> {
    params?: S;
    data?: T;
}

// client side
export function useQuery<S,T>(api: apiBaseType<S,T>, onLoaded?: (result: any) => any) {
    const [state, setState] = useSetState<{
        loading: boolean;
        data: any;
        error: string | null;
    }>({
        loading: false,
        data: null,
        error: null,
    });

    const {loading} = state
    

    const handleQuery = useCallback(async ({
        params,
        data,
    }: {
        params?: S;
        data?: T;
    }) => {
        const { url, method } = api;
        if(loading) return;
        setState({
            loading: true,
        });
        try {
            const result:resultType = await ajax({
                url,
                method,
                params,
                data,
            });
            const { code,msg } = result;

            if( code === responseCode.nologin){
                redirect('/logon')
                return;
            }
            if(code !== responseCode.success){
                setState({
                    error: msg,
                });
            }else{
                setState({
                    data: onLoaded ? onLoaded(result.data): result.data,
                });
            }
        } catch (error: any) {
            setState({
                error,
            });
        }
        setState({
            loading: false,
        });
    }, [loading,api, onLoaded]);

    return {
        ...state,
        query: handleQuery,
    }
}


export function useQueryList<S,T>(api: apiBaseType<S,T>) {
    const [state, setState] = useSetState<{
        loading: boolean;
        data: any[];
        error: string | null;
    }>({
        loading: false,
        data: [],
        error: null,
    });

    const {loading} = state

    const handleQuery = useCallback(async ({
        params,
        data,
    }: {
        params?: S;
        data?: T;
    }) => {
        const { url, method } = api;
        if(loading) return;
        setState({
            loading: true,
        });
        try {
            const result:resultType = await ajax({
                url,
                method,
                params,
                data,
            });
            const { code,msg } = result;

            if( code === responseCode.nologin){
                redirect('/logon')
                return;
            }

            if(code !== responseCode.success){
                setState({
                    error: msg,
                });
            }else{
                setState({
                    data: result.data,
                });
            }
        } catch (error: any) {
            setState({
                error,
            });
        }
        setState({
            loading: false,
        });
    }, [loading,api]);

    return {
        ...state,
        query: handleQuery,
    }
}

// service side
export async function query<S,T>({
    url,
    method,
    params,
    data,
}: QueryParams<S,T>) {

    try {
        const result = await ajax({
            url,
            method,
            params,
            data,
        }) as any;

        if(result.code !== responseCode.success){
            return Promise.reject({
                message: result.message,
                status: result.code
            });
        }
        return result.data;
    } catch (error: any) {
        return  {
            message: error.message,
            status: -1,
        }
    }

}