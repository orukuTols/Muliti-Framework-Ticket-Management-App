<script setup>
import { ref, computed } from 'vue';

const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

const mockTickets = [
    { id: generateId(), title: 'Fix broken contact form', description: 'The submission button throws a 500 error on production.', status: 'Open', createdAt: new Date() },
    { id: generateId(), title: 'Implement dark mode toggle', description: 'Add a user-friendly button to switch between themes.', status: 'InProgress', createdAt: new Date() },
];

const tickets = ref(mockTickets);
const newTicketTitle = ref('');
const newTicketDesc = ref('');

const sortedTickets = computed(() => {
    return tickets.value.slice().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
});

const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
        case "Open": return "InProgress";
        case "InProgress": return "Closed";
        case "Closed": return "Open"; 
        default: return "Open";
    }
};

const createTicket = () => {
    if (!newTicketTitle.value || !newTicketDesc.value) return;

    const newTicketData = {
        id: generateId(),
        title: newTicketTitle.value,
        description: newTicketDesc.value,
        status: "Open",
        createdAt: new Date(),
    };

    tickets.value.push(newTicketData);
    
    newTicketTitle.value = '';
    newTicketDesc.value = '';
};

const deleteTicket = (id) => {
    tickets.value = tickets.value.filter(ticket => ticket.id !== id);
};

const toggleStatus = (id, currentStatus) => {
    const newStatus = getNextStatus(currentStatus);
    
    tickets.value = tickets.value.map(ticket => {
        if (ticket.id === id) {
            return { ...ticket, status: newStatus };
        }
        return ticket;
    });
};

const getStatusClass = (status) => {
    if (status === 'Open') return 'status-open';
    if (status === 'InProgress') return 'status-in-progress';
    if (status === 'Closed') return 'status-closed';
    return 'status-default';
};
</script>

<template>
    <div class="app-container">
        <div class="main-content-area">
            
            <h1 class="header-title">Ticket Dashboard</h1>

            <div class="form-card">
                <h2 class="form-title">Add New Ticket</h2>
                <div class="form-fields">
                    <input
                        type="text"
                        placeholder="Ticket Title"
                        v-model="newTicketTitle"
                        class="input-field"
                    />
                    <textarea
                        placeholder="Description"
                        v-model="newTicketDesc"
                        class="input-field textarea-field"
                        rows="3"
                    ></textarea>
                    <button
                        @click="createTicket"
                        class="btn-submit"
                        :disabled="!newTicketTitle || !newTicketDesc"
                    >
                        Create Ticket
                    </button>
                </div>
            </div>

            <h2 class="list-title">Current Tickets ({{ tickets.length }})</h2>
            <div class="ticket-list">
                <div 
                    v-for="ticket in sortedTickets"
                    :key="ticket.id" 
                    class="ticket-item"
                >
                    <div class="ticket-info">
                        <h3 class="ticket-title-text">{{ ticket.title }}</h3>
                        <p class="ticket-description">{{ ticket.description }}</p>
                        <p :class="['ticket-status-text', getStatusClass(ticket.status)]">
                            Status: {{ ticket.status }}
                        </p>
                    </div>
                    <div class="ticket-actions">
                        <button
                            @click="toggleStatus(ticket.id, ticket.status)"
                            :class="['btn-status-toggle', getStatusClass(ticket.status)]"
                        >
                            <template v-if="ticket.status === 'Open'">Start Work</template>
                            <template v-else-if="ticket.status === 'InProgress'">Complete</template>
                            <template v-else>Re-open</template>
                        </button>
                        
                        <button
                            @click="deleteTicket(ticket.id)"
                            class="btn-delete"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <p v-if="tickets.length === 0" class="no-tickets-message">
                No tickets found. Add one above!
            </p>
        </div>
    </div>
</template>

<style scoped>
.app-container {
    min-height: 100vh;
    background-color: #111827;
    color: #ffffff;
    padding: 1rem;
    font-family: Arial, sans-serif;
}
.main-content-area {
    max-width: 48rem;
    margin-left: auto;
    margin-right: auto;
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.header-title {
    font-size: 2.25rem;
    font-weight: 700;
    color: #3b82f6;
    margin-bottom: 1.5rem;
}

.form-card {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: #1f2937;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}
.form-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 1rem;
}
.form-fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.input-field {
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.25rem;
    background-color: #374151;
    color: #ffffff;
    border: 1px solid #4b5563;
    outline: none;
}
.input-field:focus {
    border-color: #3b82f6;
}
.textarea-field {
    resize: vertical;
}
.btn-submit {
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-weight: 700;
    color: #ffffff;
    background-color: #10b981;
    transition: background-color 0.2s;
    cursor: pointer;
}
.btn-submit:hover:not(:disabled) {
    background-color: #059669;
}
.btn-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.list-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 1rem;
}
.ticket-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
.ticket-item {
    padding: 1rem;
    background-color: #1f2937;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;
}
@media (min-width: 640px) {
    .ticket-item {
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }
}

.ticket-info {
    flex-grow: 1;
}
.ticket-title-text {
    font-size: 1.125rem;
    font-weight: 700;
    color: #facc15;
}
.ticket-description {
    color: #d1d5db;
    font-size: 0.875rem;
}
.ticket-status-text {
    font-weight: 600;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.status-open {
    color: #f87171;
}
.status-in-progress {
    color: #fcd34d;
}
.status-closed {
    color: #4ade80;
}

.ticket-actions {
    display: flex;
    gap: 0.5rem;
    width: 100%;
}
@media (min-width: 640px) {
    .ticket-actions {
        width: auto;
    }
}

.btn-base {
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #ffffff;
    transition: background-color 0.2s;
    cursor: pointer;
    text-align: center;
    flex-grow: 1;
}

.btn-status-toggle {
    composes: btn-base;
}
.btn-status-toggle.status-open {
    background-color: #6366f1;
}
.btn-status-toggle.status-open:hover {
    background-color: #4f46e5;
}
.btn-status-toggle.status-in-progress {
    background-color: #f59e0b;
}
.btn-status-toggle.status-in-progress:hover {
    background-color: #d97706;
}
.btn-status-toggle.status-closed {
    background-color: #16a34a;
}
.btn-status-toggle.status-closed:hover {
    background-color: #15803d;
}

.btn-delete {
    composes: btn-base;
    background-color: #ef4444;
}
.btn-delete:hover {
    background-color: #dc2626;
}

.no-tickets-message {
    color: #9ca3af;
    text-align: center;
    margin-top: 2rem;
    padding: 1rem;
    background-color: #1f2937;
    border-radius: 0.5rem;
}
</style>
