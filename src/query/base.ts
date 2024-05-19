import Axios from "axios";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import _memoize from "lodash/memoize";


const {
    VITE_CLIENT_API_HOST: API_HOST = "http://localhost:8001/api",
} = import.meta.env;

const getFingerPrint = _memoize(async () => {
    if(typeof window === "undefined") return "ssr_service_side";
    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();
    return visitorId;
})

const query =  Axios.create({
    baseURL: API_HOST,
    timeout: 1000*20,
    headers: {
        "Content-Type": "application/json",
    },
});

query.interceptors.request.use(async (config) => {
    const fingerprint =  await getFingerPrint();
    if(fingerprint){
        config.headers["fingerprint"] = fingerprint;
    }
    return config;
})

query.interceptors.response.use((response) => {

    const {data:{
        code,
        message,
        msg,
        data,
    }={},status} = response as {data: {
        code: number,
        message: string,
        msg: string,
        data: any
    },status: number};
   
    if(status !==200){
        return Promise.reject({
            message: "请求失败",
            status
        });
    }
    
    return {
        data:data|| undefined,
        code: String(code),
        message: message || msg,
    }
}, (error) => { 
    return Promise.reject({
        message: "请求失败",
        status:-1,
        error
    });
})

export default query