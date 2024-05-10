import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import {  DownloadSharp} from '@mui/icons-material';

// Function to generate PDF document from row data
const generatePDF = (rowData) => {
  // Create PDF document
  const renderPassengersTable = () => {
    return (
        <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={styles.columnHeader}>
                    <Text style={styles.headerText}>Name</Text>
                </View>
                <View style={styles.columnHeader}>
                    <Text style={styles.headerText}>Age</Text>
                </View>
                <View style={styles.columnHeader}>
                    <Text style={styles.headerText}>Gender</Text>
                </View>
                <View style={styles.columnHeader}>
                    <Text style={styles.headerText}>Seat Number</Text>
                </View>
            </View>
            {rowData.Passengers.map((passenger, index) => (
                <View key={index} style={styles.tableRow}>
                    <View style={styles.tableData}>
                        <Text>{passenger.name}</Text>
                    </View>
                    <View style={styles.tableData}>
                        <Text>{passenger.age}</Text>
                    </View>
                    <View style={styles.tableData}>
                        <Text>{passenger.gender}</Text>
                    </View>
                    <View style={styles.tableData}>
                        <Text>{passenger.seatNumber}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};
  const MyDocument = (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          {/* <Text>ID: {rowData.busnumber}</Text> */}
          <Text>Bus Number: {rowData.bus.busnumber}</Text>
          <Text>Bus Type :{rowData.bus.busType.type}</Text>
          <Text>From: {rowData.bus.from}</Text>
          <Text>To: {rowData.bus.to}</Text>
          <Text>Departure At: {rowData.bus.DepartureAt.split('T')[0]}</Text>
          <Text>Arrival At: {rowData.bus.ArrivalAt.split('T')[0]}</Text>
          <Text>Departure time: {rowData.bus.Departuretime}</Text>
          <Text>Arrival time:{rowData.bus.Arrivaltime}</Text>
          <Text>Fare : {rowData.bus.fare}</Text>
          <Text>Total Amount :{rowData.amount}</Text>
          <Text>Passengers:</Text>
            {renderPassengersTable()}
          {/* <Text>Passengers: detail : {rowData.Passengers}</Text> */}
          {/* Add more fields as needed */}
        </View>
      </Page>
    </Document>
  );

  // Return PDF document
  return MyDocument;
};

// Styles for PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  section: {
    marginBottom: 10,
},
heading: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
},
table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    border: 0,
    // borderBottomWidth: 0,
},
tableRow: {
    margin: 'auto',
    flexDirection: 'row',
    width:"100%"
},
columnHeader: {
    borderStyle: 'solid',
    border: 1,
    // borderRightWidth: 1,
    padding: 5,
    textAlign: 'center',
},
tableData: {
    borderStyle: 'solid',
    border: 1,
    // borderRightWidth: 1,
  
    padding: 5,
    textAlign: 'center',
},
headerText: {
    fontWeight: 'bold',
},
});

// Component to render PDF download link
const PDFDownload = ({ rowData }) => {
  return (
    <PDFDownloadLink document={generatePDF(rowData)} fileName={"ticket-"+rowData.bus.busnumber}>
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <DownloadSharp />)}
    </PDFDownloadLink>
  );
};

// export default PDFDownload;





const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tickets'); // Replace with your API endpoint
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

//   const filteredTickets = tickets.filter((ticket) =>
//     ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );
// console.log("299999 :",);
// const filteredTickets = tickets.filter((ticket) =>
//     ticket.busnumber.toLowerCase().includes(searchTerm.toLowerCase())
//   );
// const userString = localStorage.getItem("user");
// const user = JSON.parse(userString);
// const userEmail = user.email;
// console.log("167 :",userEmail);
const filteredTickets = tickets.filter((ticket) => {
    // Iterate over all properties of the ticket
    for (const key in ticket) {
      if (Object.prototype.hasOwnProperty.call(ticket, key)) {
        const value = ticket[key];
        // Check if the value is a string or an object
        if (typeof value === 'string') {
          if (value.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true; // Found a match, include the ticket in filtered results
          }
        } else if (typeof value === 'object' && value !== null) {
          // Check if the object has a 'type' property (for busType)
          if ('busType' in value && typeof value.busType === 'object' && 'type' in value.busType && typeof value.busType.type === 'string') {
            if (value.busType.type.toLowerCase().includes(searchTerm.toLowerCase())) {
              return true; // Found a match, include the ticket in filtered results
            }
          }
        } else if (typeof value === 'number') {
          // Convert number to string and perform search
          if (value.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
            return true; // Found a match, include the ticket in filtered results
          }
        }
      }
    }
    return false; // No match found for any property, exclude the ticket from filtered results
  });

  return (
    <div style={{margin:'20px'}}>
      {/* <h1>Tickets</h1> */}
      {/* {userEmail} */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='input_2'
      />
      {/* <div style={{width:'400px'}}> */}
      <table style={{  margin: '0 auto', borderCollapse: 'collapse', textAlign: 'center', border: '1px solid #415a77' ,marginTop:'50px'}}>
        <thead >
          <tr style={{paddingTop:'30px' ,borderBottom:'1px solid black'}}>
            <th style={{width:'200px'}}>Bus Number</th>
            <th style={{width:'300px'}}>Bus Type</th>
            <th style={{width:'150px'}}>From</th>
            <th style={{width:'150px'}}>To</th>
            <th style={{width:'150px'}}>Departure Date</th>
            <th style={{width:'150px'}}>Arrival Date</th>
            <th style={{width:'150px'}}>Departure time</th>
            <th style={{width:'150px'}}>Arrival time</th>
            <th style={{width:'150px'}}>Amount</th>
            <th style={{width:'150px'}}>Payment Status</th>
          </tr>
        </thead>
        <tbody>
        {filteredTickets.map((ticket) => {
  // Get user email from localStorage
  const useremail = JSON.parse(localStorage.getItem("user")).email;
  
  // Check if the ticket's UserInfo email matches the logged-in user's email
  if (ticket.UserInfo.email === useremail) {
    return (
      <tr key={ticket.id}>
        <td>{ticket.bus.busnumber}</td>
        <td>{ticket.bus.busType.type}</td>
        <td>{ticket.bus.from}</td>
        <td>{ticket.bus.to}</td>
        <td>{ticket.bus.DepartureAt.split('T')[0]}</td>
        <td>{ticket.bus.ArrivalAt.split('T')[0]}</td>
        <td>{ticket.Departuretime}</td>
        <td>{ticket.bus.Arrivaltime}</td>
        <td>{ticket.amount}</td>
        <td>{ticket.status}</td>
        <td>
          {/* <button onClick={() => handleDownload(ticket)}>Download</button> */}
          <PDFDownload rowData={ticket} />
        </td>
      </tr>
    );
  } else {
    return null; // If the emails don't match, don't render the table row
  }
})}

        </tbody>
      </table>
      </div> 
    // </div>
  );
};

export default Tickets;
