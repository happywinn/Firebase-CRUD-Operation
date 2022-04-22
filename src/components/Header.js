import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home"); // initail active tab - Home
  const location = useLocation(); 
  /*     
    useLocation hook - returns the location object that represents the current URL.
                     - it is immutable. 
                     - Whenever the URL changes, the useLocation() hook returns 
                       a newly updated location object.
        You can think about it like a 'useState' that returns a new location 
        whenever the URL changes. 
    */


    useEffect(()=>{
        if(location.pathname === "/") {
            setActiveTab("Home");
        } else if(location.pathname ==="/add") {
            setActiveTab("AddContact");
        } else if(location.pathname === "/about") {
            setActiveTab("About");
        }

    },[location]);
    console.log("Current Tab is : "+ activeTab);


  return (
    <div className='header'>
        <p className='logo'>Contact App</p>
        <div className='header-right'>
            <Link to="/">
                <button className={`${activeTab === "Home" ? "active": ""}`}
                    onClick={() => setActiveTab("Home")}>
                    Home
                </button>
            </Link>
            <Link to="/add">
                <button className={`${activeTab === "AddContact" ? "active": ""}`}
                    onClick={() => setActiveTab("AddContact")}>
                     AddContact
                </button>
            </Link>
            <Link to="/about">
                <button className={`${activeTab === "About" ? "active": ""}`}
                    onClick={() => setActiveTab("About")}>
                    About
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Header