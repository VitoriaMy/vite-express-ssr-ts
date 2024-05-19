import useHelmet from "@hooks/useHelmet";
import { useEffect, useMemo } from "react";

interface TDKProps {
    title?:string,
    description?:string,
    keywords?:string
}

export default function useTDK({
    title,
    description,
    keywords
}:TDKProps) {
    const helmet = useHelmet();
    const meta = useMemo(() => {
        const list = [];
        if(description) list.push({
            name: 'description',
            content: description
        });
        if(keywords) list.push({
            name: 'keywords',
            content: keywords
        });
        return list
    }, [
        description,
        keywords
    ]);
    useEffect(() => {
        if(title) helmet.setTitle(title);
    }, [helmet, title])
    useEffect(() => {
        helmet.setMeta(meta);
    }, [helmet, meta])
}   