import { Router } from 'express';
// import { MongoClient } from 'mongodb';
import Bus from '../models/Bus.mjs';
import cors from 'cors';
import bodyParser from 'body-parser';
const router = Router();

router.use(bodyParser.json());
router.use(cors());

router.delete('/deletebus', async (req, res) => {
    const { _id, ...updateData } = req.body;
    if (!_id) {
        return res.status(400).json({ error: 'No id provided for update.' });
      }
  try {
    console.log(req.body)
    
    const updatedBus = await Bus.findOneAndDelete(
        { _id }, // Find the document by _id
        updateData, // Apply the update data
        { new: true, runValidators: true } // Options: return the updated document and run schema validators
      );
    console.log('Data Stored  document(s) inserted');
    if (updatedBus) {
        console.log('Bus updated successfully:', updatedBus);
        res.status(200).json({ message: 'Bus Deleted successfully!', updatedBus });
      } else {
        res.status(404).json({ error: 'Bus not found.' });
      }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Oops! Something went wrong.' });
  }
});

export default router;