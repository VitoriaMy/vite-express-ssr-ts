import reactLogo from '@assets/react.svg'
import viteLogo from '/vite.svg'
import tdk from "./tdk"
import styles from './page.module.scss'
import useTDK from '@hooks/useTDK'
import { useLoaderData } from 'react-router-dom'
import CategoryBar from "@components/categoryBar";
import HeadBar from "@components/headBar";
import { useQuery } from '@query/index'
import { useEffect } from 'react'
import BookList from '@components/bookList'
import { bookList } from '@query/api'



function Recommend() {

    const { query, data } = useQuery(bookList);

    const { list = [] } = (data || {}) as any;

    useEffect(() => {
        query({})
    }, [])

    return <div className={styles.Recommend}>
        <h6 className={styles.tit} >热门推荐</h6>
        <BookList list={list || []} />
    </div>
}


export default function Page(props: PageProps) {
    useTDK(tdk);
    const { categorys } = useLoaderData() as Record<string, any>;

    console.log(categorys);


    return <div className="page">
        <HeadBar title="首页" back2={false} />
        <CategoryBar categorys={categorys} />
        <Recommend />
        {/* <SearchLine />
                <Recommend /> */}
        {/* {goTop} */}
    </div>
}