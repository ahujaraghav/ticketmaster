import React from 'react';
import axios from 'axios';

import TicketRow from './TicketRow'

class TicketTable extends React.Component {

    handleDelete = (ticket) => {

        const code = ticket.ticket_code
        axios.delete(`https://dct-api-data.herokuapp.com/tickets/${code}?api_key=b441168614df4ed0`)
            .then((response) => {
                if (response.data.notice == 'Successfully removed the ticket') {
                    this.props.deleteTicket(ticket)
                }
            })
            .catch()

    }

    handleStatus = (ticket, e) => {
        const cb = e.target
        cb.disabled = true
        cb.style.cursor = 'progress'

        ticket.status = ticket.status == 'open' ? 'closed' : 'open'
        const code = ticket.ticket_code
        axios.put(`https://dct-api-data.herokuapp.com/tickets/${code}?api_key=b441168614df4ed0`, ticket)
            .then((response) => {
                cb.disabled = false
                cb.style.cursor = 'default'
                this.props.handleStatusChange(response)
            })
    }

    render() {
        return (
            <form class="col-9">
                <table class="table table-striped table-bordered table-hover">
                    <thead class="thead-dark small">
                        <th scope="col">Ticket ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Message</th>
                        <th scope="col" class="pointer" onClick={this.props.handleSort}>Status<i class={this.props.sort == 'status' ? "fa fa-fw fa-sort-down" : "fa fa-fw "}></i></th>
                    </thead>
                    <tbody class="">
                        {
                            this.props.tickets.map((ticket) => {
                                return (
                                    <TicketRow
                                        ticket={ticket}
                                        handleDelete={this.handleDelete}
                                        handleStatus={this.handleStatus}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            </form>
        )
    }
}

export default TicketTable