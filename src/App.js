import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"; 
  /* In react-router-dom v6, "Switch" is replaced by routes "Routes".*/

import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import About from './pages/About';
import './App.css';

/******  import react-toastify  ****/
  /* React-Toastify - allows you to add notifications to your app with ease. */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

/* for react-routing import 'react-router-dom'
    // <BrowserRouter> is the recommended interface for running 
          React Router in a web browser.
          - store the current location in the browser's address bar
            using clean URLs and navigates using the browser's 
            built-in history stack. 
          - and usually used in your 'topmost Parent component'. 
    // <Link> - is your replacement for anchor tags.
              - is an element that lets the user navigate to another page
                by clicking or tapping on it.
    // Route is the conditionally shown component based on matching a path to a URL.
    // Switch returns only the first matching route rather than all matching routes.
*/


function App() {
  return (
    <BrowserRouter>    {/*topmost parent component */}
      <div className="App">
        <Header />

        {/* 
          <ToastContainer> -  just a simple component, which you can write text or 
          even custom JSX elements in to customize the toast even more. 
          all you need is to include a ToastContainer and a notify method 
          to show the toast container. 
          */}
        <ToastContainer position = "top-center" />

        {/* A <Routes> looks through its children <Route>s and
          renders the first one that matches the current URL. */}

        <Routes> 
          {/* <Route>: to establish the link between component’s UI and the URL...
           Props::exact: It is used to match the exact value with the URL. 
                    For Eg., exact path=’/about’ will only render the component 
                    if it exactly matches the path but if we remove exact from the syntax,
                    then UI will still be rendered even if the strucute is like /about/10.
                  
                    path: Path specifies a pathname we assign to our component.

                     element: It refers to the component which will render on matching 
                              the path.
          */}
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/add" element={<AddEdit />}></Route>
          <Route path="/update/:id" element={<AddEdit />}></Route>
          <Route path="/view/:id" element={<View />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
