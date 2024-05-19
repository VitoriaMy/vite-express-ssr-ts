import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import classNames from "classnames";

export default function CategoryBar({ categorys, currentId }: {
    categorys: {
        id: string;
        name: string;
        cover_url: string;
        desc: string;
    }[];
    currentId?: string;
}) {
    return (
        <div className={styles.categoryBar}>
            {
                categorys.map((item) => {
                    if (item.id === currentId) {
                        return <div className={classNames(styles.tab, styles.current, 'ellipsis')} key={item.id}>
                            {item.name}
                        </div>
                    }
                    return <Link to={`/list/${item.id}`} className={classNames(styles.tab, 'ellipsis')} key={item.id}>
                        {item.name}
                    </Link>
                })
            }
        </div>
    )

}