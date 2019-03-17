import React from 'react'

class Header extends React.Component {

    constructor(){
        super()
        this.state = {
            search:''
        }
    }

    handleSearch = (e) => {
        const target = e.target
        this.setState(()=>({
            search: target.value
        }))
        this.props.applySearch(target.value)
    }

    handleFilter = (e) => {
        const filterPriority = e.target.id
        this.props.handleFilterChange(filterPriority)
    }

    render() {
        return (
            <div class="row">
                    <div class="col-6">
                        <h1 class="row">Ticket Master</h1>
                        <h4 class="row m-2 my-4">Listing Tickets - {this.props.length}</h4>
                    </div>
                    <div class="col-3">
                        <input class="my-3 form-control" type="text" placeholder="search by code" value={this.state.search} onChange={this.handleSearch}/>
                        <nav class="nav nav-pills pointer" onClick={this.handleFilter}>
                            <a class={this.props.filter == 'all' ? 'nav-link active' : 'nav-link'} id="all">All</a>
                            <a class={this.props.filter == 'high' ? 'nav-link active' : 'nav-link'} id="high">High</a>
                            <a class={this.props.filter == 'medium' ? 'nav-link active' : 'nav-link'} id="medium">Medium</a>
                            <a class={this.props.filter == 'low' ? 'nav-link active' : 'nav-link'} id="low">Low</a>
                        </nav>
                    </div>
            </div>
        )
    }
}

export default Header