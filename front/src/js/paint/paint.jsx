'use strict';

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducers/rootReducer.ts';

import Header from './components/header/header.jsx';
import WorkSpace from './components/workSpace/workSpace.tsx';
import { Footer } from './components/footer/footer.tsx';
import DragAndDropWindowWrapper from './components/dragAndDropWindows/dragAndDropWindowsWrapper.jsx';
import { Vector2 } from './structDate/vector2';
import { ChangeSizeScreenAction } from './actions/sizeScreenActions';

export default class Paint {
    constructor(selector) {
        this._mountPoint = document.querySelector(selector);
        this._store = createStore(rootReducer, composeWithDevTools(
            applyMiddleware(),
        ));

        window.onresize = () => {
            this._store.dispatch(ChangeSizeScreenAction(new Vector2(window.innerHeight, window.innerWidth)));
        };

        render(
            <Provider store={this._store}>
                <div className='paintWrapper'>
                    <Header />
                    <WorkSpace />
                    <Footer />
                    <DragAndDropWindowWrapper />
                </div>
             </Provider>,
            this._mountPoint
        );

        document.addEventListener('selectstart', e => {
            e.preventDefault();
            return false;
        });

        document.addEventListener('contextmenu', e => {
            e.preventDefault();
            return false;
        });
    }
}