// import { HomeOutlined, LeftOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import classNames from "classnames";
import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

interface HeadBarProps {
    title: React.ReactNode;
    fiexd?: boolean;
    back?: boolean;
    back2?: boolean;
    search?: boolean;
    mine?: boolean;
    home?: boolean;
    operation?: React.ReactNode;
    className?: string;
}

export default function HeadBar({
    title,
    fiexd = true,
    back = true,
    back2 = true,
    search = false,
    home = false,
    mine = false,
    operation,
    className
}: HeadBarProps) {
    const navigate = useNavigate()
    const handleBack = useCallback(() => {
        if (back2) {
            navigate(-1);
        }
    }, [back2]);

    return (
        <div className={classNames(styles.beader_bar, className)}>
            <div className={classNames(styles.inner, { [styles.fixed]: fiexd })}>
                {
                    back ? <div className={styles.left} onClick={handleBack} >
                        {
                            // back2 ? <LeftOutlined /> : null
                        }
                    </div> : null
                }
                {
                    React.isValidElement(title) ? <div className={styles.center} >{title}</div>
                        : <h2 className={classNames(styles.center, 'ellipsis')} >{title}</h2>
                }
                <div className={styles.right} >
                    {
                        search ? <Link to="/search">
                            {/* <SearchOutlined /> */}

                        </Link> : operation
                    }
                    {
                        home ? <Link to="/">

                            {/* <HomeOutlined /> */}
                        </Link> : null
                    }
                    {
                        mine ? <Link to="/mine">
                            {/* <UserOutlined /> */}

                        </Link> : null
                    }
                </div>
            </div>
        </div>
    );
}