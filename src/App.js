import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header'
import TicketForm from './TicketForm';
import TicketTable from './TicketTable';

class App extends Component {

  constructor() {
    super()
    this.state = {
      tickets: [],
      filterTickets: [],
      filter: 'all'
    }
  }

  // ! Filter tickets reseting again and again
  addTicket = (ticket) => {
    console.log(ticket)
    this.setState((prevState) => ({
      tickets: [...prevState.tickets, ticket],
      filterTickets: [...prevState.tickets, ticket],
    }))
  }

  deleteTicket = (ticket) => {
    const code = ticket.ticket_code
    axios.delete(`https://dct-api-data.herokuapp.com/tickets/${code}?api_key=b441168614df4ed0`)
      .then((response) => {
        if (response.data.notice == 'Successfully removed the ticket') {
          this.setState((prevState) => {
            const array = [...prevState.tickets]
            const index = array.findIndex((ticket) => {
              return ticket.ticket_code == code
            })
            array.splice(index, 1)
            return {
              // ! check this
              tickets: array,
              filterTickets: array
            }
          })
        }
      })
      .catch()
  }

  applySearch = (keyword) => {
    console.log(keyword)
    const search = keyword
    const array = this.state.tickets
    const filterArray = array.filter((ticket) => {
      if (ticket.ticket_code.includes(search) || search.length == 0) {
        return ticket
      }
    })
    this.applyFilters(filterArray)
  }

  handleFilterChange = (val) => {
    const value = val
    let array;
    this.setState((prevState) => {
      array = prevState.tickets
      this.applyFilters(array)
      return {
        filter: value
      }
    })

    
  }

  // applyFilters = (filterPriority) => {
  //   this.setState((prevState) => {
  //     const array = [...prevState.tickets]

  //     if (filterPriority == 'all') {
  //       return {
  //         filterTickets: array,
  //         filter: 'all'
  //       }
  //     }

  //     return {
  //       filterTickets: array.filter((ticket) => {
  //         return ticket.priority == filterPriority
  //       }),
  //       filter: filterPriority
  //     }
  //   })
  // }

  applyFilters = (filterArray) => {
    const array = filterArray
    this.setState((prevState) => {
      const filter = prevState.filter
      if (filter == 'all') {
        return {
          filterTickets: array,
        }
      }

      const filterArray = array.filter((ticket) => {
        return ticket.priority == filter
      })

      return {
        filterTickets: filterArray
      }
    })
  }

  handleStatusChange = (ticket, e) => {
    const cb = e.target
    cb.disabled = true
    cb.style.cursor = 'progress'

    ticket.status = ticket.status == 'open' ? 'closed' : 'open'
    const code = ticket.ticket_code
    axios.put(`https://dct-api-data.herokuapp.com/tickets/${code}?api_key=b441168614df4ed0`, ticket)
      .then((response) => {
        cb.disabled = false
        cb.style.cursor = 'default'

        this.setState((prevState) => {
          let array = [...prevState.tickets]

          let index = array.findIndex(function (ticket) {
            return ticket.ticket_code == code
          })
          array.splice(index, 1, response.data)
          return {
            tickets: array,
            filterTickets: array
          }

        })
      })
  }


  render() {
    return (
      <div class="m-4">
        <Header length={this.state.filterTickets.length} handleFilterChange={this.handleFilterChange} filter={this.state.filter} applySearch={this.applySearch} />
        <div class="row">
          <TicketTable tickets={this.state.filterTickets} handleStatusChange={this.handleStatusChange} deleteTicket={this.deleteTicket} />
          <TicketForm addTicket={this.addTicket} />
        </div>
      </div>
    )
  }


  componentDidMount() {
    console.log("did mount")
    axios.get('https://dct-api-data.herokuapp.com/tickets?api_key=b441168614df4ed0')
      .then((response) => {
        const data = response.data
        this.setState(() => ({
          tickets: data,
          filterTickets: data
        }))
      })
      .catch(function (err) {

      })
  }

}

export default App;
