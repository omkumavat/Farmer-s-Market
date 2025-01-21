import { Ticket } from "../Models/User.js";

export const submitTicket = async (req, res) => {
    try {
        // // console.log(req.body);
      const data = req.body.data;
      const userId=req.body.userId;
  
      // Validate the input
      if (!userId || !data) {
        return res.status(400).json({ message: 'User ID and Query are required.' });
      }
  
      // Create a new ticket
      const newTicket = new Ticket({
        userId,
        name:data.name,
        email:data.email,
        mobileno:data.mobileno,
        query:data.query
      });
  
      // Save the ticket to the database
      await newTicket.save();
  
      // Return a success response
      return res.status(201).json({
        message: 'Ticket successfully created.',
        ticket: newTicket,
      });
    } catch (error) {
      console.error('Error creating ticket:', error);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };

  export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('userId', 'name email').exec();
        // console.log(tickets);
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets' });
    }
};

export const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).exec();
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ticket' });
    }
};

// Admin response to a ticket
export const respondToTicket = async (req, res) => {
    // console.log(req.body,req.params.id);
    const { response } = req.body;
    try {
        const ticket = await Ticket.findById(req.params.id);
        // console.log(ticket)
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        ticket.response = response;
        ticket.status = 'responded';
        ticket.responseDate = new Date();

        await ticket.save();

        // console.log(ticket.response)
        res.status(200).json({ message: 'Response submitted successfully', ticket });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting response' });
    }
};