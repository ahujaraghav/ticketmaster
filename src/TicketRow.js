import React from 'react'
import axios from 'axios'

class TicketRow extends React.Component {
  constructor () {
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

    this.setState(() => ({ statusLoading: true }))

    ticket.status = ticket.status == 'open' ? 'closed' : 'open'
    const code = ticket.ticket_code
    axios
      .put(
        `https://cors-anywhere.herokuapp.com/https://dct-api-data.herokuapp.com/tickets/${code}?api_key=b441168614df4ed0`,
        ticket
      )
      .then(response => {
        cb.disabled = false

        this.setState(() => ({ statusLoading: false }))
        this.props.handleStatusChange(response)
      })
  }

  handleDelete = ticket => {
    const code = ticket.ticket_code
    const confirm = window.confirm(
      'Are you sure?\nThis will delete ticket ' + code
    )
    if (confirm) {
      this.setState(() => ({ deletingTicket: true }))
      axios
        .delete(
          `https://cors-anywhere.herokuapp.com/https://dct-api-data.herokuapp.com/tickets/${code}?api_key=b441168614df4ed0`
        )
        .then(response => {
          this.setState(() => ({ deletingTicket: false }))
          if (response.data.notice == 'Successfully removed the ticket') {
            this.props.deleteTicket(ticket)
          }
        })
        .catch()
    }   
  }

  render () {
    const ticket = this.props.ticket
    return (
      <tr style={this.state.deletingTicket ? { background: 'gray' } : {}}>
        <td
          class='pointer'
          onClick={e => {
            this.handleDelete(ticket)
          }}
          onMouseOver={this.mouseOver}
          onMouseLeave={this.mouseLeave}
        >
          {ticket.ticket_code + ' '}
          <i
            style={{ visibility: this.state.deleteTicketIcon }}
            class='fa fa-remove'
          />
        </td>
        <td>{ticket.name}</td>
        <td>{ticket.department}</td>
        <td>{ticket.priority}</td>
        <td>{ticket.message}</td>
        <td>
          <input
            id={ticket.id}
            type='checkbox'
            onChange={e => {
              this.handleStatus(ticket, e)
            }}
            checked={ticket.status != 'open'}
          />
          <i
            style={{
              visibility:
                this.state.statusLoading || this.state.deletingTicket
                  ? 'visible'
                  : 'hidden'
            }}
            class='fa fa-spinner fa-spin m-2'
          />
        </td>
      </tr>
    )
  }
}

export default TicketRow
