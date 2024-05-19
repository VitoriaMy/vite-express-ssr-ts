import { useCallback, useMemo } from "react";
import { UpCircleOutlined } from "@ant-design/icons"
import styles from "./index.module.scss"
import { useScroll } from "ahooks";

export default function useGoTop() {

    const position = useScroll();

    const show = useMemo(() => (position?.top || 0) > 200, [position]);


    const goTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    return useMemo(() => {
        if (show) {
            return (
                <div className={styles.goTop} onClick={goTop}>
                    <UpCircleOutlined />
                </div>
            );
        }
    }, [show]);

}