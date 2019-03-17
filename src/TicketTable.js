import React from 'react';

class TicketTable extends React.Component {
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
                        <th scope="col">Status</th>
                    </thead>
                    <tbody class="">
                        {
                            this.props.tickets.map((ticket) => {
                                return (
                                    <tr >
                                        <td class="pointer" onDoubleClick={(e)=>{
                                            this.props.deleteTicket(ticket)
                                        }}>{ticket.ticket_code}</td>
                                        <td>{ticket.name}</td>
                                        <td>{ticket.department}</td>
                                        <td>{ticket.priority}</td>
                                        <td>{ticket.message}</td>
                                        <td><input id={ticket.id} type="checkbox" onChange={(e)=>{
                                            this.props.handleStatusChange(ticket,e)
                                        }} checked={ticket.status == 'open' ? false : true}/></td>
                                    </tr>
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