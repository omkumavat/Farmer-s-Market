import express from 'express';
const router = express.Router();

import { addToCart,getCart, removeCartItem } from '../Controller/Cart.js';
router.post('/dealer/addtocart',addToCart);
router.get('/dealer/getcart/:id',getCart);
router.delete('/dealer/delete-wish/:userId/:cartId',removeCartItem);

import { submitTicket,getTicketById ,getAllTickets,respondToTicket} from '../Controller/Ticket.js';
router.post('/submiticket',submitTicket);
router.get('/getallticket',getAllTickets);
router.get('/geticketbyid/:id',getTicketById);
router.post('/respondtoticket/:id',respondToTicket);
export default router;