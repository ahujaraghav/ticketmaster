import React from 'react'
import axios from 'axios'

import TicketRow from './TicketRow'

class TicketTable extends React.Component {
  render () {
    return (
      <form class='col-9'>
        <table class='table table-striped table-bordered table-hover'>
          <thead class='thead-dark small'>
            <th scope='col'>Ticket ID</th>
            <th scope='col'>Name</th>
            <th scope='col'>Department</th>
            <th scope='col'>Priority</th>
            <th scope='col'>Message</th>
            <th scope='col' class='pointer' onClick={this.props.handleSort}>
              Status
              <i
                class={
                  this.props.sort == 'status'
                    ? 'fa fa-fw fa-sort-down'
                    : 'fa fa-fw '
                }
              />
            </th>
          </thead>
          <tbody class=''>
            {this.props.isLoaded ? (
              this.props.tickets.map(ticket => {
                return (
                  <TicketRow
                    ticket={ticket}
                    handleDelete={this.handleDelete}
                    handleStatusChange={this.props.handleStatusChange}
                    deleteTicket={this.props.deleteTicket}
                  />
                )
              })
            ) : (
              <tr>
                <td colspan='6'>
                  <div className="text-center">
                    <i class='fa fa-spinner fa-spin m-2' />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </form>
    )
  }
}

export default TicketTable
