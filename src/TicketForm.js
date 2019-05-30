import React from 'react'
import axios from 'axios'

class TicketForm extends React.Component {
  constructor () {
    super()
    this.state = {
      name: '',
      department: '',
      priority: '',
      message: '',
      isLoading: false
    }
  }

  handleChange = e => {
    const value = e.target.value
    const targetName = e.target.name
    this.setState(() => ({
      [targetName]: value
    }))
  }

  handleSubmit = e => {
    e.preventDefault()
    const formData = {
      name: this.state.name,
      department: this.state.department,
      priority: this.state.priority,
      message: this.state.message
    }
    // if (Object.values(formData).includes('')) {
    //     // return alert('please fill all the details')
    // }
    if (true) {
      this.setState(() => ({
        name: '',
        department: '',
        priority: '',
        message: '',
        isLoading: true
      }))
      axios
        .post(
          'https://cors-anywhere.herokuapp.com/https://dct-api-data.herokuapp.com/tickets?api_key=b441168614df4ed0',
          formData
        )
        .then(response => {
          const errors = response.data.errors
          if (errors) {
            let error = ''
            for (let key in errors) {
              const message = errors[key]
              error += key.toUpperCase() + ' - ' + message[0] + ', '
            }
            alert(error)
          } else {
            this.setState({isLoading:false})  
            this.props.addTicket(response.data)
          }
        })
        .catch(function () {})
    }
  }

  render () {
    return (
      <form class='col-3' onSubmit={this.handleSubmit}>
        <div class='form-group small'>
          <fieldset class='border p-3'>
            <legend class='inline'>Add Ticket</legend>
            <div class='row my-1'>
              <label class='col-form-label col-4' for='name'>
                Name
              </label>
              <div class='col'>
                <input
                  class='form-control'
                  id='name'
                  type='text'
                  value={this.state.name}
                  name='name'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div class='row my-2'>
              <label class='col-form-label col-4' for='department'>
                Department
              </label>
              <div class='col'>
                <select
                  class='form-control'
                  id='department'
                  name='department'
                  value={this.state.department}
                  onChange={this.handleChange}
                >
                  <option value='select'>select</option>
                  <option value='Technical'>Technical</option>
                  <option value='Sales'>Sales</option>
                  <option value='H.R'>H.R</option>
                </select>
              </div>
            </div>

            <div class='row my-2'>
              <label class='form-label-col col-4'>Priority </label>
              <div class='col'>
                <div class='form-check'>
                  <input
                    class='form-check-input'
                    type='radio'
                    id='radio1'
                    name='priority'
                    value='High'
                    checked={this.state.priority == 'High'}
                    onChange={this.handleChange}
                  />
                  <label class='form-check-label' for='radio1'>
                    High
                  </label>
                </div>
                <div class='form-check'>
                  <input
                    class='form-check-input'
                    type='radio'
                    id='radio2'
                    name='priority'
                    value='Medium'
                    checked={this.state.priority == 'Medium'}
                    onChange={this.handleChange}
                  />
                  <label class='form-check-label' for='radio2'>
                    {' '}
                    Medium
                  </label>
                </div>
                <div class='form-check'>
                  <input
                    class='form-check-input'
                    type='radio'
                    id='radio3'
                    name='priority'
                    value='Low'
                    checked={this.state.priority == 'Low'}
                    onChange={this.handleChange}
                  />
                  <label class='form-check-label' for='radio3'>
                    Low
                  </label>
                </div>
              </div>
            </div>

            <div class='row my-2'>
              <label class='form-label-col col-4'>Message</label>
              <div class='col'>
                <textarea
                  class='form-control'
                  type='textarea'
                  rows='2'
                  value={this.state.message}
                  name='message'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <input
              class='btn-primary float-right rounded'
              type='submit'
              value='Submit'
            />
          </fieldset>
        </div>
        {this.state.isLoading &&
        <div
          style={{
            position: 'absolute',
            height: '100%',
            top: '0',
            left: '0',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div>
            <i
              class='fa fa-spinner fa-spin m-2 fa-5x'
              style={{ color: 'black' }}
            />
          </div>
        </div>
        }
      </form>
    )
  }
}

export default TicketForm
