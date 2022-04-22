import React,{useEffect, useState} from 'react';
import fireDb from "../firebase";
import { useNavigate, useParams, Link } from 'react-router-dom';
import './View.css';
const View = () => {
  const [user, setUser] = useState({});
  const {id} = useParams();

  useEffect(()=>{
    /* get() - Read data once.
          if you need the data only once, you can use get() 
          to get a snapshot of the data from the database.
          if for any reason get() is unable to return 
          the server value, the client will probe the local storage
          cache and return an error if the value is still not found.
        Unnecessary use of get() can increase use of bandwidth 
        and lead to loss of performance, which can be prevented
        by using a realtime listener...

        eg. const dbRef = firebase.database().ref();
            dbRef.child("users").child(userId).get().then((snapshot)=>{
              if(snapshot.exists()) {
                console.log(snapshot.val());
              }else {
                console.log("No Data available");
              }
            })
        
      */

    fireDb.child(`contacts/${id}`).get().then((snapshot) => {
      if(snapshot.exists()){
        setUser({...snapshot.val()})
      }else {
        setUser({})
      }
    })
  },[id])

  console.log("user", user);

  return (
    <div style={{marginTop: "100px"}}>
        <div className='card'>
          <div className='card-header'>
            <p>User Contact Detail</p>
          </div>
          <div className='container'>
          <div className='row'>
              <div className='column'><strong>ID : </strong></div>
              <div className='column'><span>{id}</span></div>
            </div>
            <div className='row'>
              <div className='column'><strong>Name : </strong></div>
              <div className='column'><span>{user.name}</span></div>
            </div>
            <div className='row'>
              <div className='column'><strong>Email : </strong></div>
              <div className='column'><span>{user.email}</span></div>
            </div>
            <div className='row'>
              <div className='column'><strong>Contact : </strong></div>
              <div className='column'><span>{user.contact}</span></div>
            </div>
            <hr style={{marginBottom: "10px"}} />
            <Link to="/">
              <button className='btn-back'>Go Back</button>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default View