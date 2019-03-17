import React from 'react'

class TicketRow extends React.Component {


    constructor(){
        super()
        this.state = {
            visibility: 'hidden'
        }
    }

    // ! Amazing 
    mouseOver = ()=>{
        this.setState(()=>({visibility:'visible'}))
    }

    mouseLeave = ()=>{
        this.setState(()=>({visibility:'hidden'}))
    }

    render() {
        const ticket = this.props.ticket
        return (
            <tr >
                <td class="pointer" onDoubleClick={(e) => {
                    this.props.handleDelete(ticket)
                }} onMouseOver={this.mouseOver} onMouseLeave={this.mouseLeave}>
                    {ticket.ticket_code + ' '}
                    <i style={{ visibility: this.state.visibility }} class="fa fa-remove"></i>
                </td>
                <td>{ticket.name}</td>
                <td>{ticket.department}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.message}</td>
                <td><input id={ticket.id} type="checkbox" onChange={(e) => {
                    this.props.handleStatus(ticket, e)
                }} checked={ticket.status == 'open' ? false : true} /></td>
            </tr>
        )
    }

}

export default TicketRow