//rafce   - shortcut for creating react component
import React,{useEffect, useState} from 'react';
import fireDb from "../firebase";
import {Link} from "react-router-dom";
import "./Home.css";
import { toast } from 'react-toastify';

const Home = () => {
  const [data, setData] = useState({});
  useEffect(()=>{
    /* Attach an asynchronous callback to read the data at our reference
       DataSnapshot - contains data from a Database location.
          Any time you read data from the Database, you receive 
          the data as a DataSnapshot. 
          A DataSnapshot is passed to the event callbacks you attach
          with on() or once().
          You can extract the contents of the snapshot as 
          a JavaScript object by calling the val() method  */
    fireDb.child("contacts").on("value", (snapshot) =>{
      if(snapshot.val() !== null){
        setData({...snapshot.val()});
      }else {
        setData({});
      }
    });
    return () => {
      setData({});
    }
  },[])


  const deleteHandler = (id) => {
    if(window.confirm("Are you sure to delete that contact?")){
      /* child(path/string) - get a reference for the location 
            at the specified relative path */
      fireDb.child(`contacts/${id}`).remove((err)=>{
        if(err){
          toast.error(err);
        }else {
          toast.success("Contact Deleted Successfully");
        }
      })
    }
  }

  return (
    <div style={{marginTop: "100px"}}>
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{textAlign: "center"}}>No.</th>
            <th style={{textAlign: "center"}}>Name</th>
            <th style={{textAlign: "center"}}>Email</th>
            <th style={{textAlign: "center"}}>Contact</th>
            <th style={{textAlign: "center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Object.keys()  - this method returns an array
              of a given object's own enumerable property names, */}

          {Object.keys(data).map((id, index) =>{
            return(
              <tr key={id}>
                <th scope='row'>{index+1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className='btn btn-edit'>
                      <i className='fas fa-edit'></i>
                    </button>
                  </Link>
                  <button className='btn btn-delete' onClick={()=>deleteHandler(id)}>
                    <i className='fas fa-trash'></i>
                  </button>
                          {/* give a function and passed 'id' inside onClick Event */}
                  <Link to={`/view/${id}`}>
                  <button className='btn btn-view'>
                    <i className='fas fa-eye'></i>
                  </button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
       
    </div>
  )
}

export default Home