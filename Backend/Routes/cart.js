import express from 'express';
const router = express.Router();

import { addToCart,getCart } from '../Controller/Cart.js';
router.post('/dealer/addtocart',addToCart);
router.get('/dealer/getcart/:id',getCart);

import { submitTicket,getTicketById ,getAllTickets,respondToTicket} from '../Controller/Ticket.js';
router.post('/submiticket',submitTicket);
router.get('/getallticket',getAllTickets);
router.get('/geticketbyid/:id',getTicketById);
router.post('/respondtoticket/:id',respondToTicket);
export default router;