// Ship to John Doe

// 1 Main St, San Jose, CA 95131
import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';

function PaymentComponent({ fare,passengers ,busdata,number}) {
    const [newPas ,SetnewPas] = useState(passengers)
    const [num,SetNum] = useState(number)
    const newPasRef = useRef(newPas);
    const newNum = useRef(num);
    console.log("11111 :",number)
    useEffect(() => {
        SetnewPas(passengers)
        newPasRef.current = passengers;
        SetNum(number)
        newNum.current = number
    }, [passengers,number]);
    console.log("84 : ",newPas);
        function newf(passangers){
            console.log("818181",passangers)
        }
        newf(passengers)
        const handlePayment = (details, data) => {
            console.log('Passengers in handlePayment:', data);
            // Make an HTTP POST request to your backend API endpoint
            axios.post('http://localhost:3000/api/process-payment', {
                transactionId: details.id,
                amount: details.purchase_units[0].amount.value,
                status: details.status,
                Passengers: newPasRef.current,
                paymentSource : data.paymentSource,
                busId :busdata ,
                number : newNum.current
            })
            .then(response => {
                if (response.status === 200) {
                    // Payment processed successfully
                    console.log('Payment processed successfully',response);
                    // Perform any additional actions (e.g., show success message)
                    toast.success(response.data.message)

                } else {
                    // Handle errors from the backend
                    console.error('Error processing payment:', response.statusText);

                    toast.error("Something Went worng")
                }
            })
            .catch(error => {
                // Handle network errors or other unexpected issues
                console.error('Error processing payment:', error);
                toast.error(error)
            });
        };
        const handlePaymentInitiation = () => {
            // Perform validations or checks here
            // For example, check if the number of passengers and other details are valid
            console.log("611 :",newPasRef.current);
          
            const isInvalidPassenger = newPasRef.current.some(passenger => {
                console.log("6444 :",passenger)
                if (!passenger.name) {
                    toast.error("Please enter a valid name for all passengers.");
                    return true; // Invalid passenger name found
                }
                if(!passenger.age){
                    toast.error("Please enter a age for all passengers.(age must be at least 5)");
                    return true;
                }
                if(!passenger.seatNumber){
                    toast.error("Please select Seat Number  for all passengers.");
                    return true;
                }
                if (!passenger.gender) {
                    toast.error("Please select a gender for all passengers.");
                    return true; // Missing passenger gender found
                }
                if (passenger.gender!='male' && passenger.gender!='female'){
                    console.log("888111 :",passenger.gender)
                    toast.error("Please select a valid  gender for all passengers.");
                    return true;
                }
                if (passenger.age < 5) {
                    toast.error("Please enter a valid age for all passengers (age must be at least 5).");
                    return true; // Invalid passenger age found
                }
                return false; // No invalid data found for this passenger
            });
   
            // If any passenger data is invalid, prevent payment initiation
            
            if (isInvalidPassenger) {
                
                return false;
            }
            const hasUniqueSeatNumbers = new Set(newPasRef.current.map(passenger => passenger.seatNumber)).size === newPasRef.current.length;
            if (!hasUniqueSeatNumbers){
                toast.error("Seat Number Should be uniqe");
                return false;
            }
            if (newPasRef.current.length === 0) {
                toast.error("Please enter passenger details.");
                return false; // Prevent payment initiation
            }
            if (!newNum.current || newNum.current.trim() === '') {
                toast.error("Please enter your contact number.");
                return false; // Prevent payment initiation
            }
            const isAtLeastOneOlderThan15 = newPasRef.current.some(passenger => passenger.age > 15);
            if (!isAtLeastOneOlderThan15) {
                toast.error("At least one passenger must be older than 15 years old.");
                return false; // No passenger older than 15 found
            }

            // Other validations...
    
            // If all validations pass, return true to allow payment initiation
            return true;
        };
    return (
        <div style={{marginRight:'20px'}}>
            {/* ... other components */}
            <PayPalButtons
                createOrder={(data, actions) => {
                    // Only proceed with order creation if validation passes
                    if (handlePaymentInitiation()) {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: "USD",
                                        value: fare.toString(), // Convert fare to string
                                    },
                                },
                            ],
                        });
                    }
                }}
                onApprove={async (data, actions) => {
                    // Only proceed with payment capture if validation passes
                    if (handlePaymentInitiation()) {
                        const details = await actions.order.capture();
                        handlePayment(details, data);
                    }
                }}
                onError={(err) => {
                    // Handle errors
                    console.error("PayPal error:", err);
                }}
                onInit={(data, actions) => {
                    // Perform initialization logic here
                    // For example, logging or additional setup
                    console.log("PayPal button initialized.");
                }}
            />
        </div>
    );
}

export default PaymentComponent;
