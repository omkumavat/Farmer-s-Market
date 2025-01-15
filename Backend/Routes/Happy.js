
import express from 'express';
const router = express.Router();

import Order from '../Models/Order.js'
import {User} from '../Models/User.js'


router.get('/count', async (req, res) => {
    try {
       const userCount = await User.countDocuments();
       const orderCount = await Order.countDocuments();
       const farmer=await User.countDocuments({role:'farmer'});
       const Dealer=await User.countDocuments({role:'dealer'});
       console.log(farmer);
       res.json({ 
           userCount, 
           orderCount ,
           farmer,Dealer
       });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;