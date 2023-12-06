import React from 'react';
import './App.css';
import Counter from './components/Counter';
import {Provider} from 'react-redux';
import {store} from './state/store';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Counter/>
            </Provider>

        </div>
    );
}

export default App;
