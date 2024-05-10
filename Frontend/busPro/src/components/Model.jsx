import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import { Toast } from 'react-toastify/dist/components';
import axios from 'axios';
// import { PayPalButton } from "@paypal/react-paypal-js";
import { PayPalButtons } from "@paypal/react-paypal-js";
import PaymentComponent from './PaymentComponent';



function Modal({ isOpen, busdata ,onClose,onChange,fare}) {
  if (!isOpen) return null;
  const [numP,setNump] = useState(0)
  const [isModalOpen2,setIsModalOpen2] = useState(false)
  // const [busid,setBusId] = useState(0)
  const [isModalOpen,setIsModalOpen] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNump( value);
  };
  

    const openModal = (id) => {
        // setIsModalOpen2(true);
        // setBusId(busdata);
        console.log("passenger", numP)
        if(numP > 6 ){
          toast.error('Panssenger must be less then 6');
          return
        }
        if(numP <1){
          toast.error('Plz Enter Valid number');
          return
        }
        setIsModalOpen2(true);
      };
    
      const closeModal = () => {
        // setIsModalOpen(false);
        onClose(false)
      };
      const closeModal2 = () => {
        setIsModalOpen2(false);
      };
    

  return (
    <>
    <Modal2 busdata={busdata} isOpen2={isModalOpen2} onClose2={closeModal2} isOpen numP={numP} fare={numP*fare} />
    <div className="modal-overlay2" >
    <div className="modal-content" style={{height:'200px'}}>
    
    <button onClick={closeModal} style={{paddingLeft:'5px'}}>
        <b>X</b>
      </button>

      
      <div style={{paddingLeft:'30px',paddingTop:'20px'}}>
      <p>Enter number of passenger:</p>
      <input
        type="number"
        name="data"
        onChange={handleChange}
        // value={busdata.fare}
        className="input_2"
        // placeholder=""
        max={6}
        min={1}
      />
      <br />
     
      <button type="submit" className="animated-button" style={{marginLeft:'250px'}} onClick={openModal}>
            <span>Submit</span>
            <span></span>
      </button>
      </div>
    </div>
    </div>    
    </>
  );
}


function Modal2({ isOpen2,isOpen, busdata ,onClose2,onChange,numP,fare}) {
  if (!isOpen2) return null;
  isOpen = null
  const [BusT,setBusT] = useState({})
  const [passengers, setPassengers] = useState([]); // State to hold passenger data
  const [numbers,SetNumbers] = useState({
    number : ''
  })
  const checkUniqueSeatNumber = (newSeatNumber) => {
    const seatNumbers = passengers.map(passenger => passenger.seatNumber);
    return !seatNumbers.includes(newSeatNumber);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [name]: value };
    setPassengers(newPassengers);
};

const handleChangeN = (e) => {
  SetNumbers({[e.target.name]: e.target.value });
};
  useEffect(() => {
    
    async function fetchData() {
      try {
        await axios.post('http://localhost:3000/api/bussId',{busdata})
        .then(response => {
          if (response.status === 200) {
            setBusT(response.data)
              console.log("Bus Info");
          
          } else {
              // Handle errors from the backend
              console.error('Error processing request:', response.statusText);
          }
          })
          .catch(error => {
              
              console.error('Error processing Request:', error);
          });
            
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);
  if(numP > 6 || numP < 1 ){
    toast.error("Enter valid number")
    return
  }
  console.log("passangers" , BusT);

  return (
    <>
    {/* <div className="modal-overlay" > */}
    <div style={{top:'0' ,height:'100vh',zIndex:'9999', width: '30%',backgroundColor:'white',overflowX:'scroll',position:'fixed'}}>
    
    <button onClick={onClose2} style={{paddingLeft:'5px',position:'fixed'}}>
        <b>X</b>
      </button>

      
      <div style={{paddingLeft:'30px',paddingTop:'20px' }}>
      {/* <p>Enter number of passenger:</p>
       */}
       {Array.from({ length: numP }, (_, index) => (
        <div key={index} style={{marginBottom:'5px',borderBottom:'1px solid black',marginRight:'5px'}}>
      <input
        type="text"
        name="name"
        // onChange={handleChange}
        // value={busdata.fare}
        className="input_2"
        placeholder="Enter Name"
        style={{marginBottom:'10px'}}
        onChange={(e) => handleInputChange(index, e)}
      /><br />
      <input
        type="number"
        name="age"
        // onChange={handleChange}
        // value={busdata.fare}
        className="input_2"
        placeholder="Enter Age"
        style={{marginBottom:'10px'}}
        onChange={(e) => handleInputChange(index, e)}
      /><br />
      <select name="gender" id="" style={{marginBottom:'10px'}} onChange={(e) => handleInputChange(index, e)}>
        <option value="">--Select Gender--</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select><br />
      <p>Selet Seat Number:</p>
      <select name="seatNumber" id="" style={{marginBottom:'10px'}} onChange={(e) => handleInputChange(index, e)}>
        <option value="">--Options--</option>
        {/* {BusT && BusT.Seatsavailable && Array.from({ length: BusT.Seatsavailable.length }, (_, index) => (
          <option key={index} value={index+1}>
            {index + 1}
        </option>
        
        ))} */}
        {BusT && BusT.Seatsavailable && BusT.Seatsavailable.map((seat, index) => (
  <option key={index} value={seat}>
    {seat}
  </option>
))}
      </select>
      </div>
      ))}
      <h3>Contect Details</h3>
      <input
          type="number"
          name="number"
          value={numbers.number}
          onChange={handleChangeN}
          placeholder="Enter your Number"
        />
      {/* <h1>{busdata}</h1> */}
      <h1>Total Amount : {fare}</h1>
      <br />
      {console.log("!8444",numbers.number)}
      <PaymentComponent fare={fare}  passengers={passengers} busdata ={busdata} number ={numbers.number}/>
    
</div>

    </div>
    {/* </div> */}
     
    </>
  );
}
export default Modal;