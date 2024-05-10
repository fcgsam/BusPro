import { Router } from 'express';
// import { MongoClient } from 'mongodb';
import Bus from '../models/Bus.mjs';
import cors from 'cors';
import bodyParser from 'body-parser';
import validator from 'validator';
const router = Router();

router.use(bodyParser.json());
router.use(cors());



router.put('/updatebus', async (req, res) => {
    const { _id, ...updateData } = req.body;
    if (!_id) {
        return res.status(400).json({ error: 'No id provided for update.' });
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    const inputDateD = new Date(req.body.DepartureAt);
    const inputDateA = new Date(req.body.ArrivalAt);

    inputDateD.setHours(0, 0, 0, 0);
    inputDateA.setHours(0, 0, 0, 0);
  
    const now = new Date();
    const currentTimeString = now.toTimeString().substring(0, 5);

    console.log("inputDateD:", new Date(inputDateD));
    console.log("inputDateA:", new Date(inputDateA));
    console.log("currentDate:", new Date(currentDate));


    console.log(inputDateA+"||||||"+inputDateD+">>>>>>>"+currentDate)
    if (inputDateD.getTime() < currentDate.getTime()) {
      res.status(500).json({ message: 'Please enter a valid Date for Departure At' });
      return;
    }

    if (inputDateD.getTime() > inputDateA.getTime()) {
        res.status(500).json({ message: 'Please enter a valid Date for Arrival At' });
        return;
    }
    
    // Comparing with currentDate after removing time component
    if (inputDateA.getTime() < currentDate.getTime()) {
        res.status(500).json({ message: 'Please enter a valid Date for Arrival At' });
        return;
    }
    console.log("4666")
    if (inputDateD.getTime() == currentDate.getTime()){
        console.log('8000')
      if (currentTimeString >= req.body.Departuretime){
        console.log('82')
        res.status(500).json({ message: 'Please enter a valid Time for Departure ' });
        return;
      }
    }
    console.log("55",inputDateA == currentDate,"mmmmmmmm",inputDateD== inputDateA,req.body.Departuretime >= req.body.Arrivaltime)
    if (inputDateA.getTime() == currentDate.getTime() || inputDateD.getTime() == inputDateA.getTime()){
      console.log(57)
      if(req.body.Departuretime >= req.body.Arrivaltime){
        console.log(59)
        res.status(500).json({ message: 'Please enter a valid Time for Arrival ' });

        return;
      }
    }
    
    if (!validator.isNumeric(req.body.fare.toString())) {
      console.log("ifff")
      res.status(500).json({ message: 'Please enter a valid number for fare or seats available' });

      return;
    }
    

    if (!validator.isTime(req.body.Arrivaltime) || !validator.isTime(req.body.Departuretime)) {
      res.status(500).json({ message: 'Please enter valid Time for Arrival time or Departure time' });
      
      return;
    }

    try {
   
    
      const updatedBus = await Bus.findOneAndUpdate(
          { _id }, // Find the document by _id
          updateData, // Apply the update data
          { new: true, runValidators: true } // Options: return the updated document and run schema validators
        );
      console.log('Data Stored  document(s) inserted');
      if (updatedBus) {
          console.log('Bus updated successfully:', updatedBus);
          res.status(200).json({ message: 'Bus updated successfully!', updatedBus });
        } else {
          res.status(404).json({ error: 'Bus not found.' });
        }
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Oops! Something went wrong.' });
    }
});

export default router;