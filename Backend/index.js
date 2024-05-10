import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// import registrationRoutes from '../routes/registrationRoutes'
import registrationRoutes from './routes/registrationRoutes.mjs';
import NewBus from './routes/NewBus.mjs';
import UpdateBus from './routes/UpdateBus.mjs'
import DeleteBus from './routes/DeleteBus.mjs'
import BusT from './routes/BusT.mjs'
import mongoose from 'mongoose';
import axios from 'axios'
import payment from './routes/Payment.mjs'
import Search from './routes/Search.mjs'
import Tickets from './routes/Ticket.mjs';
import Login from './routes/Login.mjs';
import totalrevenue from './routes/Dashboard.mjs'

const app = express();
app.use('/api', registrationRoutes);
app.use('/api', NewBus);
app.use('/api', UpdateBus);
app.use('/api', DeleteBus);
app.use('/api', BusT);
app.use('/api', payment);
app.use('/api',Search)
app.use('/api',Tickets)
app.use('/api',Login)
app.use('/api',totalrevenue)

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/buspro', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//     next();
// });


app.get('/',(req,res) =>{
    const busname = [
        {
            id:1,
            name:"First Buss"
        },
        {
            id:2,
            name:"Sec Name"
        },
        {
            id:3,
            name:"Third Name"
        },
        {
            id:4,
            name:"Forth Name"
        }
    ]
    res.json(busname);

});
app.get('/NewPage',(req,res) =>{
    const Newname = [
        {
            id:1,
            namee:'New Hii'
        },
        {
            id:2,
            namee:"heyy Neww"
        }
   ]
 res.json(Newname);
})

app.get('/About',(req,res) =>{
    const about = [
        {
            id:1,
            namee:'abount One'
        },
        {
            id:2,
            namee:"About Twoa"
        }
   ]
 res.json(about);
})

app.post('/data', (req, res) => {
    const receivedData = req.body;
    console.log('Received data:', receivedData);
    res.json({ message: 'Data received' });
  });

// app.post('/register',(req, res)=>{
//     const newData = new DataModel(data);
//     newData.save()
//         .then(savedData => {
//             res.json(savedData);
//         })
//         .catch(err => {
//             res.status(500).json({ error: 'Failed to store data' });
//         });
// })
const port = 3000;

app.post('/payments/initiate', async (req, res) => {
    try {
        console.log("105");
      const response = await axios.post('https://api.razerpay.com/v1/checkout', {
        amount: '1',
        currency: req.body.currency,
        description: req.body.description,
        // Add any other required parameters
      });
  console.log(112);
      res.json({ checkoutUrl: response.data.checkoutUrl });
    } catch (error) {
      console.error('Error initiating payment:', error);
      res.status(500).json({ error: 'Error initiating payment' });
    }
  });

app.listen(port,() =>{
    console.log(`Server at http://localhost:${port}`);
});