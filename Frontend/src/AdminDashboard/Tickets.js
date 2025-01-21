import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
import '../AdminDashboardCSS/ticket.css'

const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTicketId, setActiveTicketId] = useState(null);
    const [response, setResponse] = useState("");

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('https://farmer-s-market-theta.vercel.app/getallticket');
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    const handleRespond = (ticketId) => {
        setActiveTicketId(ticketId);
    };

    const handleSubmitResponse = async (ticketId) => {
        try {
            const res = await axios.post(`https://farmer-s-market-theta.vercel.app/respondtoticket/${ticketId}`, {
                response: response,
            });
            // // console.log(res.data.ticket);
            alert('Response submitted successfully');
            const data = {
                subject: "Update on Your Submited Query",
                caseType: 2,
                email: res.data.ticket.email,
                name:res.data.ticket.name,
                response:res.data.ticket.response,
                que:res.data.ticket.query,
              }
              // console.log(data);
            const responses = await axios.post("https://farmer-s-market-theta.vercel.app/sendmail", data);
            setTickets(tickets.map(ticket => 
                ticket._id === ticketId ? { ...ticket, status: 'responded', adminResponse: response } : ticket
            ));
            setActiveTicketId(null);
            setResponse("");
        } catch (error) {
            console.error('Error submitting response:', error);
        }
    };

    const handleCancelResponse = () => {
        setActiveTicketId(null);
        setResponse("");
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="conts">
        <h2>Admin Ticket Management</h2>
        <div className="ticket-list">
            <h3>Pending Tickets</h3>
            <ul>
                {tickets
                    .filter(ticket => ticket.status === 'pending')
                    .map(ticket => (
                        <li key={ticket._id} className={`ticket-item pending`}>
                            <p><strong>{ticket.name}</strong> ({ticket.email})</p>
                            <p>{ticket.query}</p>
                            {activeTicketId === ticket._id ? (
                                <div className="response-section">
                                    <textarea
                                        value={response}
                                        onChange={(e) => setResponse(e.target.value)}
                                        placeholder="Enter your response"
                                    />
                                    <button onClick={() => handleSubmitResponse(ticket._id)}>Submit Response</button>
                                    <button className="cancel" onClick={handleCancelResponse}>Cancel</button>
                                </div>
                            ) : (
                                <button onClick={() => handleRespond(ticket._id)}>Respond</button>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
        <div>
            <h3>Responded Tickets</h3>
            <ul>
                {tickets
                    .filter(ticket => ticket.status === 'responded')
                    .map(ticket => (
                        <li key={ticket._id} className="ticket-item responded">
                            <p><strong>{ticket.name}</strong> ({ticket.email})</p>
                            <p>{ticket.query}</p>
                            <p><strong>Admin Response:</strong> {ticket.adminResponse}</p>
                        </li>
                    ))}
            </ul>
        </div>
    </div>
    );
};

export default Tickets;
