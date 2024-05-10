import React, { useState,useEffect } from "react";
import Sidebar from "../components/Sidebar";
import validator, { toDate } from 'validator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from "axios";
import {
  Edit,
  Delete,
  Search,
  Check,
  Close,
  ArrowUpward,
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
  DownloadForOfflineOutlined
} from '@mui/icons-material';

// import Sidebar from '../components/Sidebar';
// import { toast } from 'react-toastify';



function Buss() {
  const [busDetails,setBusDetails] = useState([])
  const [bustype, setBustype] = useState([]);
  const [data, setData] = useState([]);
  const today = new Date().toISOString().split('T')[0];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [busdata, setBusData] = useState({
    busnumber: '',
    busType: "",
    DepartureAt: today,
    ArrivalAt: today,
    Departuretime:'',
    Arrivaltime:'',
    from:'',
    to:'',
    // Seatsavailable:'',
    fare:0
  });
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusData({ ...busdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    // Handle form submission here
    e.preventDefault();
    const date = new Date().getTime();
    
    const inputDateD = new Date(busdata.DepartureAt).getTime();

    const inputDateA = new Date(busdata.ArrivalAt).getTime();

    // const todayDate =  new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const now = new Date();
    const currentTimeString = now.toTimeString().substring(0, 5);

    if (inputDateD < date || inputDateA < date ){
      toast.error('Please enter a valid Date for Departure At or Arrival At');
      return;
    }

    if (inputDateD == date){
        console.log('8000')
      if (currentTimeString >= busdata.Departuretime){
        console.log('82')
        toast.error('Please enter a valid Time for Departure ');
        return;
      }
    }
    if (inputDateA == date || inputDateD== inputDateA){
      if(busdata.Departuretime >= busdata.Arrivaltime){
        toast.error('Please enter a valid Time for Arrival ');
        return;
      }
    }
    // Reset modal state after submission
    if (!validator.isNumeric(busdata.fare) ) {
      toast.error('Please enter a valid number for fare or seats available');
      return;
    }
    
    // if(busdata.Seatsavailable < 1){
    //   toast.error('Please enter a valid seats available');
    //   return;
    // }
    if(busdata.fare < 1){
      toast.error('Please enter a valid seats available');
      return;
    }

    if (!validator.isTime(busdata.Arrivaltime) || !validator.isTime(busdata.Departuretime)) {
      toast.error('Please enter valid Time for Arrival time or Departure time');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/newbus', busdata);
      console.log('Server response:', response.data);
      // Reset form after successful submission
      setBusData({
        busnumber: '',
        busType: "",
        DepartureAt: today,
        ArrivalAt: today,
        Departuretime:'',
        Arrivaltime:'',
        from:'',
        to:'',
        // Seatsavailable:'',
        fare:0
      });
      toast.success(response.data.message)
      const updatedResponse = await axios.get('http://localhost:3000/api/buss');
      setBusDetails(updatedResponse.data);
      
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an error
        toast.error('Error submitting data');
      }
    }
    
    
    closeModal();
  };
  const theme = createTheme({
    // ... your theme setup (if any)
  });
  const tableIcons = {
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Close {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ResetSearch:forwardRef((props, ref) => <Close {...props} ref={ref} />),
    Export:forwardRef((props, ref) => <DownloadForOfflineOutlined {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/buss');
        setBusDetails(response.data.busDetails);
        setBustype(response.data.bustype)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
    // console.log("busType : ",bustype)
  }, []);
  const formatDate = (isoString) => {
    return isoString.split('T')[0]; // This will return the date part in 'yyyy-MM-dd' format
  };

const [myData, setMyData] = useState({});
useEffect(() => {
  const newData = {};
  bustype.forEach(type => {
    newData[type.type] = type.type;
  });
  setMyData(newData);
}, [bustype]);

  const columns = [
    { title: 'Number', field: 'busnumber' },
    { title: 'Bus Type', field: 'busType.type',  lookup:myData},
// columnDef,value,error,helperText,locale,rowData,onChange,onRowDataChange
    { title: 'from', field: 'from' },
    {title: 'To',field: 'to'},
    { title: 'Departure At', field: 'DepartureAt' ,
    render: rowData => rowData.DepartureAt ? rowData.DepartureAt.split('T')[0] : '',
    editComponent: props => (
      <input
        type="date"
        value={props.value ? formatDate(props.value) : ''}
        onChange={e => props.onChange(e.target.value)}
      />
    )},
    { title: 'Arrival At', field: 'ArrivalAt' ,
    render: rowData => rowData.DepartureAt ? rowData.DepartureAt.split('T')[0] : '',
    editComponent: props => (
      <input
        type="date"
        value={props.value ? formatDate(props.value) : ''}
        onChange={e => props.onChange(e.target.value)}
      />
    )},
    {title: 'Departure time',field: 'Departuretime',
    editComponent: props => (
      <input
        type="time"
        value={props.value || ''}
        onChange={e => props.onChange(e.target.value)}
      />
    )},
    {title: 'Arrival time',field: 'Arrivaltime',
    editComponent: props => (
      <input
        type="time"
        value={props.value || ''}
        onChange={e => props.onChange(e.target.value)}
      />
    )},
    {title: 'Fare',field: 'fare',type:'numeric',align:'center'},
    // {title: 'Seats available',field: 'Seatsavailable',align:'center',render: rowData => rowData.Seatsavailable.join(', '),editable:false},
    {title: 'remaining Seats',field: 'remaining',align:'center',editable:false},
  ];
  
  useEffect(() => {
    setData(busDetails);
  }, [busDetails]);

  

  
 
  return (
    <>
      <section className="flex h-6 overflow-auto" style={{ height: "100vh" }}>
        <Sidebar />
        <div className="w-full h-screen">
          <div className="" style={{ margin: "15px",marginBottom:'50px' }}>
            <button type="button" className="animated-button" onClick={openModal}>
              <span>New Bus</span>
              <span></span>
            </button>
          </div>
          <div className="App">
            <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} onChange={handleChange} busdata={busdata} bustype={bustype} />
            
            <div style={{width:'1300px',marginLeft:'25px'}}>
           <ThemeProvider theme={theme} >
      <MaterialTable
        
        title="Buss"
        columns={columns}
        data={data}
        icons={tableIcons}
        options={{
          exportButton: true,
          grouping: true,
          // fixedColumns: {
          //   left: 1,
          //   // right: 1
          // }
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const updatedData = {
          ...newData,
          _id: oldData._id
        };

        axios.put('http://localhost:3000/api/updatebus', updatedData)
          .then(response => {
            console.log('hii ',response.data)
            if (response.data && response.data.message === "Bus updated successfully!") {
              console.log("hey")
              const dataUpdate = [...data];
              const index = oldData ? data.indexOf(oldData) : -1;
              console.log(index)
              if (index >= 0) {
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                
                resolve();
                toast.success(response.data.message)
              }
            } else {
              console.log('rejected')
              reject();
              toast.error(response.data.message)
            }
          })
          .catch(error => {
            
            console.error('Error updating data:', error);
            reject();
            if(error.response.status == 500){
              
              toast.error(error.response.data.message)
            }else{
              toast.error("something Went Wrong")
            }
          });
      }, 600);
    }),

          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const updatedData = {
                  // ...newData,
                  _id: oldData._id
                };
                axios.delete('http://localhost:3000/api/deletebus', {data:updatedData})
                .then(response => {
                if (response.data && response.data.message === "Bus Deleted successfully!") {
                const dataDelete = [...data];
                const index = oldData ? data.indexOf(oldData) : -1;
                if (index >= 0) {
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);
                  resolve();
                  toast.success(response.data.message)
                }}else {
                  console.log('rejected')
                  reject();
                  toast.error(response.data.message)
                }})
                .catch(error => {
                  console.error('Error updating data:', error);
                  reject();
                  toast.error(error)
                });
              }, 600);
            }),
            isEditable: rowData => {
              // Disable edit button if the date has passed
              const currentDate = new Date();
              currentDate.setHours(0, 0, 0, 0);
              // currentDate.setHours(0, 0, 0, 0); // Set the time part to 0
              const rowDate = new Date(rowData.DepartureAt);
              rowDate.setHours(0, 0, 0, 0); // Set the time part to 0

              // Now compare the dates
              console.log(currentDate[1]+"|||||"+rowDate[1])
              console.log(currentDate < rowDate)
              
              return currentDate.getTime() < rowDate.getTime(); 
            }   
        }}
        detailPanel={[
          {
            tooltip: 'Show SeatDetails',
            render: rowData => {
              return (
                <>
                
                <div
                  style={{
                    fontSize: 15,
                    textAlign: 'center',
                    // color: 'white',
                    // backgroundColor: '#43A047',
                  }}
                >
                  <h4>Seat Avalable</h4>
                  {rowData.Seatsavailable.join(', ')}
                </div>
                <div style={{textAlign:'center'}}>Total : {rowData.Seatsavailable.length}</div>
                
                </>
              )
            },
          },]}
        // style={{borderRadius:'5%'}}
        // actions={[
        //   {
        //     icon: () => <IconButton><Edit /></IconButton>,
        //     tooltip: 'Edit User',
        //     onClick: (event, rowData) => {
        //       // Do save operation
        //     }
        //   },
        //   {
        //     icon: () => <IconButton><Delete /></IconButton>,
        //     tooltip: 'Delete User',
        //     onClick: (event, rowData) => {
        //       // Do delete operation
        //     }
        //   }
        // ]}
      />
    </ThemeProvider>
    </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Modal({ isOpen, onClose, onSubmit, onChange, busdata,bustype }) {
  if (!isOpen) return null;
 
  return (
    <div className="modal-overlay">
      {/* <div className="modal-close-btn-div">
        <button onClick={onClose}>
          <b>X</b>
        </button>
      </div> */}
      <div className="modal-content">
      <div className="modal-close-btn-div">
        <button onClick={onClose}>
          <b>X</b>
        </button>
      </div>
        <form onSubmit={onSubmit} style={{padding:'20px'}}>
        <p>Enter Bus Number:</p>
        <input
          type="text"
          name="busnumber"
          onChange={onChange}
          value={busdata.busnumber}
          className="input_2"
          placeholder="Enter Bus Number"
        /><br /><br />
        <p>Enter Bus Name:</p>
        <select
          name="busType"
          onChange={onChange}
          value={busdata.busType}
          className="input_2"
        >
          <option>------Select Buss--------</option>
          {bustype.map((type) => (
              <option key={type._id} value={type._id}>{type.type}</option>
            ))}
          {/* <option value="">Select Bus Type</option>
          <option value="Volvo AC Buses">Volvo AC Buses</option>
          <option value="Sleeper AC Buses">Sleeper AC Buses</option>
          <option value="Seater AC Buses">Seater AC Buses</option>
          <option value="AC Seater Bus">AC Seater Bus</option>
          <option value="Volvo AC Semi-Sleeper Bus">Volvo AC Semi-Sleeper Bus</option>
          <option value="Semi Luxury(Hirkani(non-AC))">Semi Luxury (Hirkani (non-AC))</option>
          <option value="Ordinary Sleeper Seater Buses">Ordinary Sleeper Seater Buses</option> */}
        </select>
        <br /><br />
        <p>Departure at:</p>
        <input
          type="date"
          name="DepartureAt"
          onChange={onChange}
          value={busdata.DepartureAt}
          className="input_2"
          placeholder="Departure"
          min={new Date().toISOString().split('T')[0]}
        /><br /><br />
        <p>Arrival at:</p>
        <input
          type="date"
          name="ArrivalAt"
          onChange={onChange}
          value={busdata.ArrivalAt}
          min={busdata.DepartureAt}
          className="input_2"
          placeholder="To"
        /><br /><br />
        <p>Departure time:</p>
        <input
          type="time"
          name="Departuretime"
          onChange={onChange}
          value={busdata.Departuretime}
          className="input_2"
          placeholder="Departure time"
          
        /><br /><br />
        <p>Arrival time:</p>
        <input
          type="time"
          name="Arrivaltime"
          onChange={onChange}
          value={busdata.Arrivaltime}
          className="input_2"
          placeholder="Arrival time"
          
        /><p>From:</p>
        <input
          type="text"
          name="from"
          onChange={onChange}
          value={busdata.from}
          className="input_2"
          placeholder="From"
        /><br /><br />
        <p>To:</p>
        <input
          type="text"
          name="to"
          onChange={onChange}
          value={busdata.to}
          className="input_2"
          placeholder="To"
        /><br /><br />
        {/* <p>Seats Available:</p>
        <input
          type="number"
          name="Seatsavailable"
          onChange={onChange}
          value={busdata.Seatsavailable}
          className="input_2"
          placeholder="Seats Available"
        /><br /><br /> */}
        <p>fare:</p>
        <input
          type="number"
          name="fare"
          onChange={onChange}
          value={busdata.fare}
          className="input_2"
          placeholder="Seats Available"
        />
        <br /><br />
       
        <button type="submit" className="animated-button" style={{marginLeft:'250px'}}>
              <span>Submit</span>
              <span></span>
        </button>
        </form>
      </div>
    </div>
  );
}

export default Buss;
