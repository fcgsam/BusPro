// routes/search.js

import { Router } from 'express';
import {forSearch} from './Login.mjs';
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;
import Bus from '../models/Bus.mjs'; // Import your MongoDB model
const router = Router();

// Route to handle bus search
// function verifyToken(req, res, next) {
//   const token = req.headers['authorization'];
//   console.log("1222 :",req.headers)
//   if (!token) {
//       return res.status(403).json({ message: 'No token provided' });
//   }
//   console.log("177 :",forSearch)
//   verify(token, forSearch, (err, decoded) => {
//     console.log("Error:", err);
//     console.log("Decoded:", decoded);

//       if (err) {
//           return res.status(401).json({ message: 'Failed to authenticate token' });
//       }

//       req.user = decoded;
//       next();
//   });
// }
router.post('/search', async (req, res) => {

  const { from, to } = req.body;
  // const userEmail = req.user.email;
  // const UserName = req.user.username
  console.log(req.body)

  try {
    // Query MongoDB to find buses based on 'from' and 'to' parameters
    const buses = await Bus.find(
        {
            $and: [
            { from: { $regex: new RegExp('^' + from + '$', 'i') } },
            { to: { $regex: new RegExp('^' + to + '$', 'i') } }
          ]
        }
      ).populate('busType');;
      

    // Send the search results back to the client
    res.json(buses);
  } catch (error) {
    console.error('Error searching buses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
