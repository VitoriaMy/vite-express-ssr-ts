/* eslint-disable react-refresh/only-export-components */
import type { RouteObject } from "react-router-dom";
import loadable from '@loadable/component'

import Layout from "@core/components/Layout/Layout";
import * as Home from "@screens/Home";
import About from "@screens/About/About";
import * as NotFound from "@screens/NotFound";

const Contact = loadable(() => import("@screens/Contact/Contact"), { fallback: <div>Loading...</div> });

const routes: RouteObject[] = [
    {
        path: "/",
        Component: Layout,
        children: [
            {
                index: true,
                Component: Home.page,
                loader: Home.loader
            }, {
                path: "about",
                Component: About,
            },
            {
                path: "contact",
                Component: Contact,
            },
            {
                path: "*",
                Component: NotFound.page
            }
        ]
    }
]

export default routes;