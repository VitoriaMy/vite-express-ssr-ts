import classNames from "classnames";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

export function BookCover({
    cover,
    title,
    className
}: {
    cover: string,
    title: string,
    className?: string
}) {
    return <img className={classNames(styles.cover, className)} src={cover} alt={title} />
}


export function BookItem({ item }: {
    item: any
}) {
    const { is_end } = item;
    return <Link to={`/book/${item.id}`} className={styles.item} key={item.id}>
        <BookCover className={styles.cover} title={item.name} cover={item.cover_url} />
        <div className={styles.cont} >
            <p className={styles.name}><b>{item.name}</b> <span>{item.author}</span></p>
            {/* <p className={styles.state}>{is_end ? '完本' : '连载中'} | 共{chapter_counts}章</p> */}
            <p className={styles.state}>{is_end ? '完本' : '连载中'} </p>
            <p className={classNames(styles.desc, 'ellipsis-2')}>{item.desc}</p>
        </div>
    </Link>
}

export default function BookList({ list }: {
    list: any[]
}) {
    return <div className={styles.list}>
        {list.map((item: any) => <BookItem item={item} key={item.id} />)}
    </div>
}