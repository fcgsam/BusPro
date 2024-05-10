import { Router } from 'express';
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;
import { compareSync } from 'bcrypt';
import bcrypt from 'bcrypt';
import User from '../models/User.mjs'
import crypto from 'crypto';


const router = Router();

const secretKey = crypto.randomBytes(32).toString('hex');
export const forSearch = secretKey
console.log("14444 :",secretKey);

// Mock user data (replace with your database logic)

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({email});
    console.log("2999 , ",user)

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordMatch = await bcrypt.compare(password.toString(), user.password);

    if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = sign({ id: user.id, email: user.email,name :user.name }, secretKey, { expiresIn: '1h' });
    // localStorage.setItem('token', token);
    console.log("4000",secretKey)
    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

// Verify token middleware

// Protected route
// app.get('/api/data', verifyToken, (req, res) => {
//     res.json({ message: 'Protected data accessed successfully', user: req.user });
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
export default router;