// Home.js
import {React,useState} from "react";
import Input from "../components/Inputbox";
import { useNavigate } from 'react-router-dom';
import {
  
  ChevronLeft,
  ChevronRight,
  KeyboardDoubleArrowRight
} from '@mui/icons-material';
import axios from 'axios'
import { toast } from "react-toastify";
function Home() {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState({
    from: '',
    to: '',
  });

  const handleChange = (e) => {
    console.log("17 :",e.target.value)
    setRoutes({ ...routes, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    if(routes.from == '' || routes.to == ''){
      toast.error("Pleaze enter routs")
      // return;
    }
    else{
    e.preventDefault();
    try {
      // const response = await axios.post('http://localhost:3000/api/search', routes);
      // history.push({
      //   pathname: 'http://localhost:5173/busbook',
      //   state: { searchData: response.data },
      // });
      navigate(`busbook?from=${routes.from}&to=${routes.to}`);
      // navigate('/busbook?from=New%20Bombay&to=Thane');

    } catch (error) {
      console.error('Error searching:', error);
    }
  }
  };
    return (
    <>
    		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute inset-0 z-0"><path fill="#27374D" fillOpacity="1" d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,218.7C672,224,768,192,864,170.7C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
        <div className="cardH" >
            {/* <img src={imageUrl} alt="Card" className="card-image" /> */}
            <div className="card-content">
              <h2 className="card-title">Search Bus</h2>
              <div className="card-content flex flex-col md:flex-row">
  {/* <h2 className="card-title">Search Bus</h2> */}
  <div >
  <form onSubmit={handleSubmit} className="flex flex-col md:flex-row space-y-2 md:space-x-4">
    <div style={{marginRight:'20px'}}>
      {/* <p className="card-description">From</p> */}
      <Input
          type="text"
          name="from"
          value={routes.from}
          onChange={handleChange}
          placeholder="From"
        />
    </div>
    <div style={{marginTop:'10px'}}>
    <KeyboardDoubleArrowRight />
    </div>
    <div style={{marginLeft:'20px'}}>
      {/* <p className="card-description">To</p> */}
      <Input
          type="text"
          name="to"
          value={routes.to}
          onChange={handleChange}
          placeholder="To"
        />
    </div>
    <button type='supmit' className="animated-button" style={{height:'45px' ,marginTop:'6px',marginLeft:'20px'}}>
        <span>Search</span>
        <span></span>
      </button>
      </form>
  </div>
</div>

            </div>
          </div>
    
    </>);
  }
  
  export default Home;
  