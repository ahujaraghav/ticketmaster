import React from 'react'
import Chart from 'react-google-charts'

class Charts extends React.Component {

    constructor() {
        super()
    }

    getProgress = (tickets) => {
        let progress = 0, total = 0, completed = 0
        let priority = {}, department = {}

        tickets.forEach(ticket => {
            total++

            if (!priority[ticket.priority]) {
                priority[ticket.priority] = 0
            }
            if (!department[ticket.department]) {
                department[ticket.department] = 0
            }

            priority[ticket.priority] += 1
            department[ticket.department] += 1

            if (ticket.status == 'closed') {
                completed++
            }
        })

        progress = (completed / total) * 100

        const priorityArray = []

        for (let key in priority) {
            priorityArray.push([key, priority[key]])
        }

        const departmentArray = []

        for (let key in department) {
            departmentArray.push([key, department[key]])
        }


        return { progress, priorityArray, departmentArray }

    }
    render() {
        let { progress, priorityArray, departmentArray } = this.getProgress(this.props.tickets)
        progress += '%'
        console.log(progress)
        return (
            <div class="row">
                <div class="row px-4">
                    <div class="progress col-9 p-0" style={{ height: '20px' }}>
                        <div class="progress-bar bg-success progress-bar-animated progress-bar-striped" role="progessbar" style={{ width: progress }} aria-valuenow={progress}
                            aria-valuemin="0" aria-valuemax="100">
                            {/* <span>{progress}</span> */}
                            </div>
                    </div>
                    <h4 class="col-12 mt-3">Some Stats</h4>
                    <div class="row">
                        <Chart
                            width={'600px'}
                            height={'350px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[['Priority', 'Number of tickets'], ...priorityArray]}
                            options={{
                                legend: 'none',
                                pieSliceText: 'label',
                                title: 'Ticket Priority %',
                                pieStartAngle: 100,
                            }}
                            rootProps={{ 'data-testid': '4' }}
                        />

                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data={[['Department', 'Tickets'], ...departmentArray]}
                            options={{
                                // Material design options
                                chart: {
                                    title: 'Tickets By Department',
                                },
                                colors: ['maroon'],
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '2' }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Charts