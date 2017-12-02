import React from 'react';
import ReactDOM from 'react-dom';
import './header/css/header.css';
import {createStore} from 'redux'
import Navigation from "./navigation/Navigation";
import {BrowserRouter} from 'react-router-dom';

const data = [{
    description: 'Плакат Мистер Робот / Mr.Robot (Шелковая ткань)',
    img: 'cover_min.jpg'
},
    {
        description: 'Плакат Мистер Робот / Mr.Robot (Шелковая ткань)',
        img: 'hoodie_min.jpg'
    },
    {
        description: 'Плакат Мистер Робот / Mr.Robot (Шелковая ткань)',
        img: 'poster_min.jpg'
    },
    {
        description: 'Плакат Мистер Робот / Mr.Robot (Шелковая ткань)',
        img: 'singlet_min.jpg'
    },
    {
        description: 'Плакат Мистер Робот / Mr.Robot (Шелковая ткань)',
        img: 'sweatshirt_min.jpg'
    },
    {
        description: 'Плакат Мистер Робот / Mr.Robot (Шелковая ткань)',
        img: 't-shirt_min.jpg'
    }
];

function search(entered = data, action) {
    /*if (action.type === 'addSearch') {
        return [
            ...entered,
            action.search
        ]
    }*/

    return entered;
}

const store = createStore(search);


/*
store.subscribe(() => {
    list.innerHTML = '';
    store.getState().forEach(listElement => {
        const li = document.createElement('li');
        li.textContent = listElement;
        list.appendChild(li)
    });
    element.value = '';
});


function pressed() {
    store.dispatch({type: 'addSearch', search: element.value});
}

element.onkeydown = function (e) {
    if (e.keyCode === 13) {
        pressed();
    }
};

searchButton.addEventListener('click', () => {
    pressed();
});
*/

// ReactDOM.render(
//     <Provider>
//         <ConnectedRouter>
//             <div>
//                 <Route exact path="/" component={App}/>
//                 {/*<Route path="/about" component={About}/>*/}
//                 {/*<Route path="/topics" component={Topics}/>*/}
//             </div>
//         </ConnectedRouter>
//     </Provider>,
//     document.getElementById('context')
// );


ReactDOM.render(
    <BrowserRouter>
        <Navigation/>
    </BrowserRouter>,
    document.getElementById('context')
);

// ReactDOM.render(
//     <Categories/>,
//     document.getElementById('list')
// );