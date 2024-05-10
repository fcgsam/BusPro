import {React,useState} from "react";
import axios from 'axios';
function Blogs() {
  const [names, setNames] = useState([])
  axios.get('http://localhost:3000/About')
    .then((response) => {
      setNames(response.data)
      
    })
    return (
      <>
      <ul>
         {names.map((name) => (
              <li key={name.id}>{name.namee}</li>
            ))}
    </ul> 
      </>
    );
  }
  
  export default Blogs;
  