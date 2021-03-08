import {Route} from "react-router";
import React, {lazy, Suspense} from "react";
import {Spin} from "antd";

const routers = [
    {path: '/', exact: true, component: lazy(() => import('../../pages/word'))},
    {path: '/analysis', component: lazy(() => import('../../pages/analysis'))},
    {path: '/music', component: lazy(() => import('../../pages/music'))},
    {path: '/setting', component: lazy(() => import('../../pages/setting'))},
]

const RouterConfig = routers.map(route => (
    <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        render={props => (
            <Suspense fallback={
                <div style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Spin size='large'/>
                </div>}>
                <route.component {...props}/>
            </Suspense>
        )}
    />
))

export default RouterConfig
