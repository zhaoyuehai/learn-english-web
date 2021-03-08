import React, {Fragment} from 'react'
import {GlobalStyle} from './style'
import {Provider} from 'react-redux'
import store from './store'
import Main from './pages/main'
import {HashRouter} from "react-router-dom";

function App() {
    return (
        <Fragment>
            <GlobalStyle/>
            <Provider store={store}>
                <HashRouter>
                    <Main/>
                </HashRouter>
            </Provider>
        </Fragment>
    )
}

export default App
