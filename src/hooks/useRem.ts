import { useCallback, useEffect, useRef } from "react";

export function getScreenRem() {
    const {
        VITE_CLIENT_MAX_WIDTH,
        VITE_CLIENT_MIN_WIDTH,
        VITE_CLIENT_WIDTH
    } = import.meta.env;
    const maxClientWidth = Number(VITE_CLIENT_MAX_WIDTH) || 750;
    const minClientWidth = Number(VITE_CLIENT_MIN_WIDTH) || 375;
    const clientWidth = (VITE_CLIENT_WIDTH || '').split("|").map((item: string) => Number(item));
    const allScreenSize: number[] = [...new Set([maxClientWidth, minClientWidth, ...clientWidth])].sort((a, b) => a - b);
    const remEntries: [number, number][] = [];
    allScreenSize.forEach((screenSize, index) => {
        let rem = Number(import.meta.env[`VITE_REM_${screenSize}`])
        if (isNaN(rem)) {
            if (remEntries[index - 1]) {
                rem = remEntries[index - 1][1]
            } else {
                rem = 100
            }
        }
        remEntries.push([screenSize, rem])
    })

    const rems = Object.fromEntries(remEntries)
    return {
        rems,
        allScreenSize,
    }
}

export default function useRem() {
    const $screenRem = useRef(getScreenRem());
    const handleResize = useCallback(() => {
        const { rems, allScreenSize } = $screenRem.current;
        const clientWidth = Math.min(window.innerWidth, window.outerWidth);
        const currentSize = allScreenSize.find(i => i >= clientWidth)
        if (currentSize) {
            const currentRem = rems[currentSize] * clientWidth / currentSize
            document.documentElement.style.fontSize = `${currentRem.toFixed(3)}px`;
        } else {
            document.documentElement.style.fontSize = `100px`;
        }
    }, []);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

}