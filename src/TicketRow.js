import React from 'react'
import axios from 'axios'

class TicketRow extends React.Component {


    constructor() {
        super()
        this.state = {
            deleteTicketIcon: 'hidden',
            statusLoading: false,
            deletingTicket: false
        }
    }

    // ! Amazing 
    mouseOver = () => {
        this.setState(() => ({ deleteTicketIcon: 'visible' }))
    }

    mouseLeave = () => {
        this.setState(() => ({ deleteTicketIcon: 'hidden' }))
    }

    handleStatus = (ticket, e) => {
        const cb = e.target
        cb.disabled = true

        this.setState(()=>({statusLoading:true}))

        ticket.status = ticket.status == 'open' ? 'closed' : 'open'
        const code = ticket.ticket_code
        axios.put(`https://dct-api-data.herokuapp.com/tickets/${code}?api_key=b441168614df4ed0`, ticket)
            .then((response) => {
                cb.disabled = false

                this.setState(()=>({statusLoading:false}))
                this.props.handleStatusChange(response)
            })
    }

    handleDelete = (ticket) => {
        const code = ticket.ticket_code

        this.setState(()=>({deletingTicket:true}))

        axios.delete(`https://dct-api-data.herokuapp.com/tickets/${code}?api_key=b441168614df4ed0`)
            .then((response) => {
                this.setState(()=>({deletingTicket:false}))
                if (response.data.notice == 'Successfully removed the ticket') {
                    this.props.deleteTicket(ticket)
                }
            })
            .catch()

    }


    render() {
        const ticket = this.props.ticket
        return (
            <tr style={this.state.deletingTicket?{background:'gray'}:{}}>
                <td class="pointer" onDoubleClick={(e) => {
                    this.handleDelete(ticket)
                }} onMouseOver={this.mouseOver} onMouseLeave={this.mouseLeave}>
                    {ticket.ticket_code + ' '}
                    <i style={{ visibility: this.state.deleteTicketIcon }} class="fa fa-remove"></i>
                </td>
                <td>{ticket.name}</td>
                <td>{ticket.department}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.message}</td>
                <td><input id={ticket.id} type="checkbox" onChange={(e) => {
                    this.handleStatus(ticket, e)
                }} checked={ticket.status == 'open' ? false : true} />
                    <i style={{visibility:this.state.statusLoading || this.state.deletingTicket ?'visible':'hidden'}} class="fa fa-spinner fa-spin m-2"></i>
                </td>
            </tr>
        )
    }

}

export default TicketRow