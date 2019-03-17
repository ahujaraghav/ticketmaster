import React from 'react'

class Header extends React.Component {

    constructor(){
        super()
        this.state = {
            search:''
        }
    }

    render() {
        return (
            <div class="row">
                    <div class="col-6">
                        <h1 class="row">Ticket Master</h1>
                        <h4 class="row m-2 my-4">Listing Tickets - {this.props.length}</h4>
                    </div>
                    <div class="col-3">
                        <input class="my-3 form-control" type="text" placeholder="search by code" value={this.props.search} onChange={this.props.handleSearchChange}/>
                        <nav class="nav nav-pills pointer" onClick={this.props.handleFilterChange}>
                            <a class={this.props.filter == 'All' ? 'nav-link active' : 'nav-link'} id="All">All</a>
                            <a class={this.props.filter == 'High' ? 'nav-link active' : 'nav-link'} id="High">High</a>
                            <a class={this.props.filter == 'Medium' ? 'nav-link active' : 'nav-link'} id="Medium">Medium</a>
                            <a class={this.props.filter == 'Low' ? 'nav-link active' : 'nav-link'} id="Low">Low</a>
                        </nav>
                    </div>
            </div>
        )
    }
}

export default Header