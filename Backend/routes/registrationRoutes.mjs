
import { Router } from 'express';
// import { MongoClient } from 'mongodb';
import User from '../models/User.mjs';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
const router = Router();

router.use(bodyParser.json());
router.use(cors());

router.post('/register', async (req, res) => {
  try {
    const { name, email, password1: passwordh } = req.body;
   
    const existingUser = await User.findOne({ email });
    console.log(req.body)

    if (existingUser) {
        // If the email already exists, return a 400 Bad Request response
        console.log("Badd")
        return res.status(400).json({ error: 'Email address is already registered' });
    }
    const password = await bcrypt.hash(passwordh.toString(), 10);
    const newUser = new User({ name, email, password });
    // const result = await client.db('buspro').collection('User').insertOne(newUser);
    await newUser.save();
    console.log('Data Stored  document(s) inserted');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     console.log(password,user.password)
//     const isPasswordMatch = await bcrypt.compare(password.toString(), user.password);
//     console.log(isPasswordMatch)
//     if (!isPasswordMatch) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }
//     // Password is correct, proceed with login
//     res.json({ message: 'Login successful' });
//   } catch (error) {
//     res.status(500).json({ error: `Failed to login:${error}` });
//   }
// });


export default router;
