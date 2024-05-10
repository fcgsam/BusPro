import { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Bus from '../models/Bus.mjs';
import Tickets from '../models/Tickets.mjs'
const router = Router();

router.use(bodyParser.json());
router.use(cors());

router.post('/process-payment', async (req, res) => {
  const { transactionId, amount, status, Passengers, paymentSource, busId, number } = req.body;
  const UserInfo = '65ff2525366df1dd9dd56d34';
  try {
    const bus = await Bus.findOne({ _id: busId });
    const currentDate = new Date().toISOString();
    console.log('Processing payment:', { transactionId, amount, status, Passengers, paymentSource, busId, number });

    const seatNumbers = Passengers.map(passenger => passenger.seatNumber);
    const hasUniqueSeatNumbers = new Set(Passengers.map(passenger => passenger.seatNumber)).size === Passengers.length;
  
    console.log('current 22: ', bus.DepartureAt);
    console.log("211111 :", seatNumbers);

    await Bus.updateOne(
      { _id: busId },
      { $pull: { Seatsavailable: { $in: seatNumbers } } }
    );

    const newTickets = new Tickets({
      transactionId,
      amount,
      status,
      Passengers,
      paymentSource,
      bus: busId,
      number,
      UserInfo,
      transactionDate: currentDate,
      journeyDate: bus.DepartureAt,
      Departuretime: bus.Departuretime
    });

    await newTickets.save();
    console.log("Ticket Done");
    res.status(200).json({ message: 'Ticket Generated successfully!' });

  } catch (error) {
    console.error('Error during payment processing:', error);
    res.status(500).json({ message: 'Something Went Wrong' });
  }
});
  
  export default router