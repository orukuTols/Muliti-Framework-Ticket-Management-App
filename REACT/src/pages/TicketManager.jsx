import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { 
    collection, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc 
} from 'firebase/firestore';

const TicketManager = () => {
    
    const [tickets, setTickets] = useState([]);
  
    const [newTicketTitle, setNewTicketTitle] = useState('');
    const [newTicketDesc, setNewTicketDesc] = useState('');
    const ticketsCollectionRef = collection(db, "tickets");

let { loading } = useAuth();

useEffect(() => {
        const getTickets = async () => {
            try {
               
                const data = await getDocs(ticketsCollectionRef);
                let fetchedTickets = data.docs.map((document) => ({ 
                    ...document.data(), 
                    id: document.id 
                }));
                setTickets(fetchedTickets);

            } catch (error) {
                console.error("Couldn't Fetch tickers:", error);
            }
        };

        getTickets();
    }, []);


    const createTicket = async () => {
        if (!newTicketTitle || !newTicketDesc) return;
        
        const newTicketData = { 
            title: newTicketTitle, 
            description: newTicketDesc,
            status: "Open",
            createdAt: new Date()
        };

        try {
        
            const docRef = await addDoc(ticketsCollectionRef, newTicketData);
            
           
            setTickets([
                ...tickets, 
                { ...newTicketData, id: docRef.id }
            ]);
            
            
            setNewTicketTitle('');
            setNewTicketDesc('');
            
        } catch (error) {
            console.error("Couldn't create ticket:", error);
        }
    };

    const deleteTicket = async (id) => {
        try {
          
            const ticketDoc = doc(db, "tickets", id); 
   
            await deleteDoc(ticketDoc);

            setTickets(tickets.filter(ticket => ticket.id !== id));
            
        } catch (error) {
            console.error("Couldn't delete the ticket:", error);
        }
    };

    
    
   // src/pages/TicketManager.jsx (Inside TicketManager component)

// Define the order of the status flow
const STATUS_SEQUENCE = ["Open", "InProgress", "Closed"];

const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
        case "Open":
            return "InProgress";
        case "InProgress":
            return "Closed";
        case "Closed":
            return "Open"; 
        default:
            return "Open";
    }
};

const toggleStatus = async (id, currentStatus) => {

    const newStatus = getNextStatus(currentStatus);
    
    try {
        const ticketDoc = doc(db, "tickets", id);
       
        await updateDoc(ticketDoc, { status: newStatus });

        setTickets(tickets.map(ticket => 
            ticket.id === id ? { ...ticket, status: newStatus } : ticket
        ));
        
    } catch (error) {
        console.error("Couldn't update ticket status:", error);
    }
};
  
    return (
        <div className="container mx-auto p-4 max-w-4xl bg-gray-800 ">
            <h1 className="text-4xl font-bold text-blue-500 mb-6">Ticket Dashboard</h1>

            {/* Form for Adding New Tickets */}
            <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-white">Add New Ticket</h2>
                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Ticket Title"
                        value={newTicketTitle}
                        onChange={(e) => setNewTicketTitle(e.target.value)}
                        className="w-full p-3 rounded bg-gray-700 text-white border-gray-600"
                    />
                    <textarea 
                        placeholder="Description"
                        value={newTicketDesc}
                        onChange={(e) => setNewTicketDesc(e.target.value)}
                        className="w-full p-3 rounded bg-gray-700 text-white border-gray-600"
                        rows="3"
                    ></textarea>
                    <button 
                        onClick={createTicket} 
                        className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-white transition duration-300"
                    >
                        Create Ticket
                    </button>
                </div>
            </div>

            {/* List of Tickets */}
            <h2 className="text-3xl font-semibold mb-4 text-white">Current Tickets ({tickets.length})</h2>
            <div className="space-y-4">
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 bg-gray-700 rounded-lg shadow flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-yellow-400">{ticket.title}</h3>
                            <p className="text-gray-300">{ticket.description}</p>
                            <p className={`font-semibold text-sm mt-1 ${ticket.status === 'Open' ? 'text-red-400' : 'text-green-400'}`}>
                                Status: {ticket.status}
                            </p>
                        </div>
                        <div className="space-x-2 flex items-center">
                            {/* Toggle Status Button */}
                            <button 
                            onClick={() => toggleStatus(ticket.id, ticket.status)}
            className={`px-3 py-1 rounded text-sm font-semibold text-white transition duration-200 
                        ${ticket.status === 'Open' ? 'bg-indigo-500 hover:bg-indigo-600' : 
                          ticket.status === 'InProgress' ? 'bg-yellow-500 hover:bg-yellow-600' : 
                          'bg-green-600 hover:bg-green-700'}`}
                            >
                                {ticket.status === 'Open' && 'Start Work'}
            {ticket.status === 'InProgress' && 'Complete'}
            {ticket.status === 'Closed' && 'Re-open'}
                            </button>
                            
                            {/* Delete Button */}


                            <button 
                                onClick={() => deleteTicket(ticket.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold transition duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
    {tickets.length === 0 && !loading && <p className="text-gray-400 text-center mt-8">No tickets found. Add one above!</p>}
        </div>
);};

export default TicketManager;