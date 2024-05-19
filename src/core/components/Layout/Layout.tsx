import React from 'react';
import { Outlet } from 'react-router-dom';
import useRem from '@hooks/useRem';
// import { NavLink } from 'react-router-dom';

// import styles from './Layout.module.scss'

const Layout: React.FC<LayoutProps> = (props) => {
    useRem();
    return <Outlet />
}

interface LayoutProps {
    [key: string]: any
}

export default Layout;