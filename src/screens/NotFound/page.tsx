import styles from "./page.module.scss"
import classNames from "classnames"
import { useRafInterval } from "ahooks"
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadBar from "@components/headBar";

export default function ErrorPage() {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const clearId = useRafInterval(() => {
        setCount(count - 1);
    }, 1000);

    const handleBack = useCallback(() => {
        clearId();
        navigate(-1);
    }, [clearId])

    useEffect(() => {
        if (count <= 0) {
            handleBack();
        }
    }, [count, clearId, handleBack])


    return <div className={classNames("page", styles.page)} >
        <HeadBar title="页面不存在" home />
        <div className={styles.content} >
            <div className={styles.center} >
                <div >
                    <div className={styles.tit} >404 - 页面不存在</div>
                    <div className={styles.desc}>{count}秒后返回上一页</div>
                    <div className={styles.btn} onClick={handleBack} >返回上一页</div>
                </div>
            </div>
        </div>
    </div>
}