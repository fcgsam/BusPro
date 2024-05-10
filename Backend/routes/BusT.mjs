import { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import BusType from '../models/BusType.mjs';
const router = Router();

router.use(bodyParser.json());
router.use(cors());

router.post('/bustype', async (req, res) => {
    try {
    console.log(req.body)
    const bustype = BusType(req.body)
    await bustype.save()
    res.status(201).json({ message: 'Bus Type information saved successfully!' });
  }catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Oops! Something went wrong.' });
  }


})

export default router