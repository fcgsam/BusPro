import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios library
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';

export function Dashboard() {
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [topRoutes, setTopRoutes] = useState(null);
  const [passengerCount, setPassengerCount] = useState(null);

  const [avgRevenue, setAvgRevenue] = useState(null);
  const [salesComparison, setSalesComparison] = useState(null);
  const [frequentAgeGroups, setFrequentAgeGroups] = useState([]);
  const [routePopularity, setRoutePopularity] = useState([]);


  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two-digit month
  const defaultDate = `${year}-${month}`;

   
  const [date, setDate] = useState(defaultDate);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const getTotalRevenue = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/totalrevenue', { date });
      
      setTotalRevenue(response.data.totalRevenue);
      
    } catch (error) {
      console.error("Error fetching total revenue:", error);
      toast.error("Error fetching total revenue");
    }
  };

  const getTopRoutes = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/toproutes', { date });
      console.log("Top Routes:", response.status);
      if(response.data.origin && response.data.destination){
     
      const { origin, destination } = response.data;
        setTopRoutes({ origin, destination });}
        else{
          setTopRoutes('')
        }
      
    } catch (error) {
      console.error("Error fetching top routes:", error);
      toast.error("Error fetching top routes");
    }
  };

  const getPassengerCount = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/passengercount', { date });
      setPassengerCount(response.data.totalPassengers);
    } catch (error) {
      console.error("Error fetching passenger count:", error);
      toast.error("Error fetching passenger count");
    }
  };

  const fetchAvgRevenue = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/avgrevenue', { date });
      setAvgRevenue(response.data.avgRevenue);
    } catch (error) {
      console.error("Error fetching average revenue:", error);
    }
  };

  // Function to fetch sales comparison
  const fetchSalesComparison = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/salescomparison', { date });
      response.data.salesComparison?
      setSalesComparison(response.data.salesComparison):setSalesComparison('');
      console.log(`83  : ${response.data}`);
    } catch (error) {
      console.error("Error fetching sales comparison:", error);
    }
  };

  // Function to fetch frequent age groups
  const fetchFrequentAgeGroups = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/frequentagegroups', { date });
      setFrequentAgeGroups(response.data.ageGroups);
    } catch (error) {
      console.error("Error fetching frequent age groups:", error);
    }
  };

  // Function to fetch route popularity
  const fetchRoutePopularity = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/popularroutes', { date });
      console.log(`102  : ${response.data}`);
      setRoutePopularity(response.data.routePopularity);
    } catch (error) {
      console.error("Error fetching route popularity:", error);
    }
  };

  useEffect(() => {
    if (date) {
      getTotalRevenue();
      getTopRoutes();
      getPassengerCount();

      fetchAvgRevenue();
    fetchSalesComparison();
    fetchFrequentAgeGroups();
    fetchRoutePopularity();
    }
  }, [date]);

  return (
    <>
      <section className="flex h-6 overflow-auto" style={{ height: "100vh" }}>
        <Sidebar />
        <div className="w-full h-screen">
          <div style={{ border: '1px solid black', width: '100%', height: '100%' }}>
            <div style={{marginTop:'10px',marginLeft:'10px' ,border:"1px solid black",borderRadius:'15px',width:'300px' ,padding:"10px",display:'flex'}}>
            <p>Data for :  </p><input type="month" style={{ backgroundColor: "#f5f5f5",borderRadius:'20px',padding:'5px',marginLeft:'7px' }} value={date} onChange={handleDateChange} />
            </div>
          
            <div class="flex" style={{ margin: "10px" }}>
              
              <div class="notification " style={{ margin: "10px" }}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle">Total revenue </div>
                <div class="notibody">{totalRevenue ? `${totalRevenue} Rs.` : 'No Data'}</div>
              </div>

              {/* <div class="notification" style={{ margin: "10px" }}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle">Top routes </div>
                <div class="notibody">{topRoutes ? `${topRoutes.origin} to ${topRoutes.destination}` : 'No Data'}</div>

              </div> */}

              <div class="notification" style={{ margin: "10px" }}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle">Passengers count</div>
                <div class="notibody">{passengerCount ? passengerCount : 'No Data'}</div>
              </div>

              <div className="notification" style={{ margin: "10px" }}>
                <div className="notiglow"></div>
                <div className="notiborderglow"></div>
                <div className="notititle">Average Revenue per Booking</div>
                <div className="notibody">{avgRevenue ? `${avgRevenue.toFixed(2)} Rs.` : 'No Data'}</div>
              </div>
              
              
              {/* Display Sales Comparison */}
              <div className="notification" style={{ margin: "10px" }}>
                <div className="notiglow"></div>
                <div className="notiborderglow"></div>
                <div className="notititle">Sales Performance Comparison</div>
                <div className="notibody">
                  {salesComparison ? (
                    <ul>
                      {salesComparison.map((route, index) => (
                        <li key={index}>{route._id}: {route.totalRevenue.toFixed(2)} Rs.</li>
                      ))}
                    </ul>
                  ) : 'No Data'}
                </div>
              </div>
                  </div>
              {/* Display Most Frequent Age Groups */}
              <div class="flex" style={{ margin: "10px" }}>
              <div className="notification" style={{ margin: "10px" }}>
                <div className="notiglow"></div>
                <div className="notiborderglow"></div>
                <div className="notititle">Most Frequent Passenger Age Groups</div>
                <div className="notibody">
                  {frequentAgeGroups.length > 0 ? (
                    <ul className="flex">
                    {frequentAgeGroups.map((group, index) => (
                        <li key={index} style={{marginLeft:"8px"}}>
                            {group._id}: {group.count}
                        </li>
                    ))}
                </ul>
                
                  ) : 'No Data'}
                </div>
              </div>

              {/* Display Route Popularity */}
              <div className="notification" style={{ margin: "10px" }}>
                <div className="notiglow"></div>
                <div className="notiborderglow"></div>
                <div className="notititle">Route Popularity Ranking</div>
                <div className="notibody">
                  {routePopularity.length > 0 ? (
                    <ul >
                      {routePopularity.map((route, index) => (
                        <li key={index}>{route.from} to {route.to}: {route.count} bookings</li>
                      ))}
                    </ul>
                  ) : 'No Data'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Dashboard;
