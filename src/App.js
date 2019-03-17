import React, { Component } from 'react';
import axios from 'axios';


import Header from './Header'
import TicketForm from './TicketForm';
import TicketTable from './TicketTable';
import Charts from './Charts'

class App extends Component {

  // ! Main tickets array, filter applied and search box input is maintained here
  constructor() {
    super()
    this.state = {
      tickets: [],
      filter: 'All',
      search: '',
      sort:''
    }
  }

  // ? Add Ticket
  // ! axios is used inside child component, after successfull operation ticket is added to main tickets
  addTicket = (ticket) => {
    this.setState((prevState) => ({
      tickets: [...prevState.tickets, ticket]
    }))
  }

  // ? Delete Ticket
  // ! axios is used inside child component, after successfull operation ticket is deleted from main tickets
  deleteTicket = (ticket) => {
    const code = ticket.ticket_code

    this.setState((prevState) => {
      const array = [...prevState.tickets]
      const index = array.findIndex((ticket) => {
        return ticket.ticket_code == code
      })

      array.splice(index, 1)

      return {
        tickets: array
      }
    })
  }

  // ? Search Change
  // ! Search is not maintained by child component
  handleSearchChange = (e) => {
    const search = e.target.value
    this.setState(() => ({ search }))
  }

  // ? Filter Change
  // ! Filter is not maintained by child component
  handleFilterChange = (e) => {
    const filter = e.target.id
    this.setState(() => ({ filter }))
  }

  // ? Status Change
  // ! axios is used inside child component after successful operation, ticket is changed in main tickets
  handleStatusChange = (response) => {
    this.setState((prevState) => {
      let array = [...prevState.tickets]
      let index = array.findIndex(function (ticket) {
        return ticket.ticket_code == response.data.ticket_code
      })
      array.splice(index, 1, response.data)
      return {
        tickets: array,
      }
    })
  }

  handleSort = ()=>{
    let sort = this.state.sort
    console.log(sort)
    if(sort){
      sort=''
    }else{
      sort='status'
    }
    
    this.setState(()=>({sort}))
  }

  // - Applying filter's
  // ! this method returns a filter array, which is passed to ticket-table for building the list.
  // ? apply filter first apply filter according to state, then apply search according to search in state and return the array.
  applyFilters = () => {
    const array = this.state.tickets
    const filter = this.state.filter
    const search = this.state.search

    let filterArray

    if (filter == 'All') {
      filterArray = array
    } else {
      filterArray = array.filter((ticket) => {
        return ticket.priority == filter
      })
    }

    let searchArray = filterArray.filter((ticket) => {
      if (ticket.ticket_code.includes(search) || search.length == 0) {
        return ticket
      }
    })

    if(this.state.sort.length>0){
      searchArray.sort((a, b)=>{
          if(a.status > b.status){
            return -1
          }else if(a.status < b.status){
            return 1
          }

          return 0
      })
    }

    return searchArray
  }


  render() {
    const filterArray = this.applyFilters()
    return (
      <div class="m-4">
        <Header
          length={filterArray.length}
          handleFilterChange={this.handleFilterChange}
          filter={this.state.filter}
          handleSearchChange={this.handleSearchChange}
          search={this.state.search}
        />
        <div class="row">
          <TicketTable
            tickets={filterArray}
            handleStatusChange={this.handleStatusChange}
            deleteTicket={this.deleteTicket}
            handleSort={this.handleSort}
            sort={this.state.sort}
          />
          <TicketForm
            addTicket={this.addTicket}
          />
        </div>
        <Charts
          tickets={filterArray}
        />
      </div>
    )
  }


  componentDidMount() {
    console.log("did mount")
    axios.get('https://dct-api-data.herokuapp.com/tickets?api_key=b441168614df4ed0')
      .then((response) => {
        const data = response.data
        this.setState(() => ({
          tickets: data
        }))
      })
      .catch(function (err) {

      })
  }

}

export default App;
