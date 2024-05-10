import { Router } from 'express';
// import { MongoClient } from 'mongodb';
import Bus from '../models/Bus.mjs';
import cors from 'cors';
import bodyParser from 'body-parser';
import BusType from '../models/BusType.mjs';
const router = Router();

router.use(bodyParser.json());
router.use(cors());

router.post('/newbus', async (req, res) => {
  try {
    // console.log(req.body)
    const {busType:busType,...rest} = req.body
    console.log("busType:" ,req.body)
    const BusTypeData = await BusType.findOne({_id:busType})
    console.log(18)
    const BusId = BusTypeData._id
    console.log(20)
    const capacity = BusTypeData.capacity
    console.log(22)
    
    let seat = []
    for(let i=1;i<=capacity;i++){
      console.log(25)
      seat.push(i)
    }
    console.log("seats :",seat)
    console.log("remaining",capacity,"||| busType:",BusTypeData)
    const newBus = new Bus({busType:BusId,remaining:capacity,Seatsavailable:seat,...rest});
    await newBus.save();
    console.log('Data Stored  document(s) inserted');
    res.status(201).json({ message: 'Bus information saved successfully!' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Oops! Something went wrong.' });
  }
});

router.get('/buss', async (req, res) => {
    try {
    const busdetails = await Bus.find().populate('busType');
    const bustype = await BusType.find()
      // console.log(busdetails)
      // console.log( typeof(existingUser.DepartureAt.toISOString()))
      
      res.status(201).json({busDetails:busdetails,bustype:bustype});
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Oops! Something went wrong.' });
    }
  });

  router.post('/bussId', async (req, res) => {
    try {
      const {busdata} = req.body
    const busdetails = await Bus.findOne({ _id: busdata }).populate('busType');
    // const bustype = await BusType.find()
      console.log(busdetails)
      console.log( "6000 :",req.body,"|||||||",busdata)
      
      res.status(200).json(busdetails);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Oops! Something went wrong.' });
    }
  });

export default router;
