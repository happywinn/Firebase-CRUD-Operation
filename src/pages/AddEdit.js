import React,{useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import fireDb from "../firebase";
/* In react-router-dom v6 
  'useHistory()' is replaced by 'useNavigate()'.  */




import './AddEdit.css';
import FireDb from "../firebase";
import {toast} from "react-toastify";


const initialState = {
  name: "",
  email: "",
  contact: "",
}


const AddEdit = () => {

  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const{name,email,contact} = state; 

/* useParams - this hook returns an object of key/value pairs
               of the dynamic params from the current URL.
  */
  const {id} = useParams(); // get the 'id' param from the URL...
  console.log("ID : " + id);

  useEffect(()=>{
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
  },[id]);

  useEffect(()=>{
    if(id){
      setState({...data[id]});
    }else{
      setState({...initialState});
    }

    return () =>{
      setState({...initialState});
    };
  },[id, data]);

  const navigate = useNavigate();
  /* useNavigate() - to replace the useHistory() hook.(v6) 
                   - this hook returns a function that lets you navigate 
                     programmatically, for example after a form is submitted.
      navigate() - this function has two signatures:
          1. Either pass a 'To' value(same type as <Link to>)
              with an optional second {replace, state} arg or
          2. Pass te delta you want to go in the history stack.
             For example, navigate(-1) is equivalent to hitting 
            the back button.
    
       */

  const handleInputChange = (e) => {
    const {name,value} = e.target;  
    /* name = e.target.name();
       value = e.target.value();
     */

    setState({...state, [name]: value });
  }
  const handleSubmit = (e) => {
    e.preventDefault() ; // for not to refresh page 
    if(!name || !email || !contact) {
      toast.error("Please provide value in each input field");
    }else {
      /* .chid() - create a child reference
         .push() - to add a list of data in the database.
         (Saving Lists of Data)
         Every time you push a new node onto a list, 
         your database generates a unique key,like
         messages/users/<unique-user-id>/<username>.. 
         set()  - you can use set() to save data to 
                  a specified reference, 
                  replacing any existing data at that path.
                  Using set() overwrites data at the specified
                  location, including any child nodes.
         */

      if(!id) {
        FireDb.child("contacts").push(state, (err) => {
          if(err) {
            toast.error(err);
          }else{
            toast.success("Contact Added Successfully...");
          }
        });
      }else {
        FireDb.child(`contacts/${id}`).set(state, (err) => {
          if(err) {
            toast.error(err);
          }else{
            toast.success("Contact Updated Successfully...");
          }
        });
      }
      
      setTimeout(() => navigate('/'), 500);
    }
  };

  return (
    <div style={{marginTop: "100px"}}>
        <form style={{
          margin: "auto", 
          padding: "15px", 
          maxWidth:"400px", 
          alignContent:"center"
          }}
          onSubmit={handleSubmit}  
        >
            <label htmlFor='name'>name</label>
            <input
              type="text"
              id='name'
              name='name'
              placeholder='Your Name...'
              value={name || ""}
              onChange={handleInputChange}
            />
            <label htmlFor='email'>Email</label>
            <input
              type="email"
              id='email'
              name='email'
              placeholder='Your Email...'
              value={email || ""}
              onChange={handleInputChange}
            />
            <label htmlFor='contact'>Contact</label>
            <input
              type="number"
              id='contact'
              name='contact'
              placeholder='Your Contact No. ...'
              value={contact || ""}
              onChange={handleInputChange}
            />
            <input type='submit' value={id ? "Update": "Save"} />
            
        </form>
    </div>
  )
}

export default AddEdit;