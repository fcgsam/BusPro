import { Router } from 'express';
import { MongoClient } from 'mongodb';

import cors from 'cors';
import bodyParser from 'body-parser';
import Tickets from '../models/Tickets.mjs';
const router = Router();

router.use(bodyParser.json());
router.use(cors());
router.get('/tickets', async (req, res) => {
    try {
    //   const {busdata} = req.body
    const Ticket = await Tickets.find().populate({
        path: 'bus',
        populate: {
            path: 'busType'
        }
    }).populate('UserInfo');
    // const bustype = await BusType.find()
    //   console.log(busdetails)
    //   console.log( "6000 :",req.body,"|||||||",busdata)
    console.log("18",Ticket);
      
      res.status(200).json(Ticket);
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Oops! Something went wrong.' });
    }
  });

export default router;