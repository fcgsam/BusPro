import {React,useState,useEffect} from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import Modal from "../components/Model";
import { Navbar } from "flowbite-react";
import { useLocation } from 'react-router-dom';
import { useSearchParams ,useNavigate} from 'react-router-dom';
import { useAuth } from "../components/AuthContext";
import { Link, NavLink } from "react-router-dom";

function BusBook(){
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [username, setUserName] = useState('');
  
    const [buss, setBuss] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [busid,setBusId] = useState(0)
    const [fares,setFares] = useState(0)
    const [searchParams] = useSearchParams();
    const sfrom = searchParams.get('from');
    const sto = searchParams.get('to');
    const [from, setFrom] = useState(sfrom);
    const [to, setTo] = useState(sto);
  
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
      // Fetch data based on search parameters
      const token = localStorage.getItem('token');
      axios.post('http://localhost:3000/api/search',{from:from,to:to},{headers: {
        'Authorization': token
      }})
        .then(response => {
          console.log("222333 :",response.data.userEmail);
          setSearchResults(response.data);
          // setUserEmail(response.data.userEmail);
          // setUserName(response.data.UserName)
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
        const newUrl = `/busbook?from=${from}&to=${to}`;
        navigate(newUrl);
        // window.history.replaceState({}, document.title, window.location.pathname)
    }, [from, to]);
    const openModal = (id,fare) => {
        setIsModalOpen(true);
        setBusId(id);
        setFares(fare)
        console.log('17 fare :',busid)
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    
      // const busId = ''
      console.log("bus dd : ",buss);
      // const fare = 0
      useEffect(() => {
        console.log('Fares:', fares);
    }, [fares]);
    console.log("6111",searchResults)
    const bussDetails = searchResults[0];

      return (
        <>
          <section className="">
            {/* <Sidebar /> */}
            
            <div className="flex flex-col md:flex-row space-y-2 md:space-x-4" style={{ position: 'sticky', top: 0,backgroundColor:'white', zIndex:'999' }}>
  <h1 style={{margin:'5px'}}><b>Search Buses</b>{ username }</h1>
  <div style={{marginLeft:'50px', margin:'10px'}}>
    <label htmlFor="from">From:</label>
    <input className="input_2 " type="text" id="from" value={from} onChange={(e) => setFrom(e.target.value)} />
  </div>
  <div style={{margin:'10px'}}>
    <label htmlFor="to">To:</label>
    <input className="input_2" type="text" id="to" value={to} onChange={(e) => setTo(e.target.value)} />
  </div>
</div>
            <div className="w-full ml-64 p-4" style={{display: 'flex', justifyContent: 'center'}}> {/* Adjust margin and padding */}
            

                    <div style={{marginBottom: '50px'}}>
                    {Array.isArray(searchResults) && searchResults.length > 0 ? (
  searchResults.map((bussDetails) => {
    const departureDate = new Date(bussDetails.DepartureAt.split('T')[0]);
    const today = new Date();
    
    if (departureDate < today) {
      return null; // Skip rendering if departure date is past
    }

    const departureTime = new Date(bussDetails.DepartureAt).getTime();
    const currentTime = today.getTime();
    
    if (departureDate.toDateString() < today.toDateString() || departureTime <= currentTime) {4
      console.log("88888")
      return null; // Skip rendering if departure time is past
    }else{

      console.log("99222",bussDetails.busType)
    return (
      <div className="card" key={bussDetails._id}> 
        <div className="card-inner">
          <table style={{width: '100%'}}>
            <thead style={{borderBottom: '1px solid black'}}>
              <tr>
                <td>Number</td>
                <td>Type</td>
                <td>from</td>
                <td>To</td>
                <td>Departure</td>
                <td>Arrival</td>
                <td>Fare(USD)</td>
                <td>Seat Available</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center align-middle">{bussDetails.busnumber}</td>
                <td className="text-center align-middle">{bussDetails.busType.type}</td>
                <td className="text-center align-middle">{bussDetails.from}</td>
                <td className="text-center align-middle">{bussDetails.to}</td>
                <td className="text-center align-middle">
                  {bussDetails.DepartureAt.split('T')[0]} <br />
                  {bussDetails.Departuretime}
                </td>
                <td className="text-center align-middle">
                  {bussDetails.ArrivalAt.split('T')[0]} <br />
                  {bussDetails.Arrivaltime}
                </td>
                <td className="text-center align-middle">{bussDetails.fare}</td>
                <td className="text-center align-middle">{bussDetails.remaining}</td>
                <td className="text-center align-middle">
                {bussDetails.remaining === 0 ? 'Full' : (
  isLoggedIn ? (
    <button type="button" className="animated-button-bus" onClick={() => openModal(bussDetails._id, bussDetails.fare)}>
      <span>Book</span>
      <span></span>
    </button>
  ) : (
    <NavLink to="/login">
      <button type="button" className="animated-button-bus">
        <span>Book</span>
        <span></span>
      </button>
    </NavLink>
  )
)}

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );}
  })
) : (
  <h1 style={{fontSize:'60px'}}><b>--No Search result Found--</b></h1>
)}

              </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}  busdata={busid} fare={fares} />
          </section>
        </>
      );
                
      

}


export default BusBook 