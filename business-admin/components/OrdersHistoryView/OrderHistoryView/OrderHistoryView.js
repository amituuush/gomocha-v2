import React from 'react'
import sass from './order-history-view.scss'
import OrdersContainer from '../OrdersContainer/OrdersContainer'
import { connect } from 'react-redux'
import { fetchOrders, completeOrder } from '../../../actions/index'
import { bindActionCreators } from 'redux'

var OrderHistoryView = React.createClass({

    propTypes: {
        orders: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.array
        ]),
        fetchOrders: React.PropTypes.func,
        completeOrders: React.PropTypes.func
    },

    componentWillMount: function() {
        console.log(this.props.orders);
        this.props.fetchOrders();
        setInterval(this.props.fetchOrders, 5000)
    },

    render: function() {
            return (
                <div className="ba-view-container">
                    <div className='ba-view-wrap'>
                        <h1>Order History</h1>
                        <OrdersContainer
                        orders={this.props.orders}
                        completeOrder={this.props.completeOrder} />
                    </div>
                </div>
            )
    }
})

// takes app state as an argument, and whatever gets returned will show up as props inside OrderHistoryView
function mapStateToProps(state) {
    return {
        orders: state.orders
    };
}

// anything returned from this function will end up as props on the OrderHistoryView container
function mapDispatchToProps(dispatch) {
    // bindActionCreators and dispatch: takes whatever is returned from fetchOrders and makes sure it gets pushed to all the reducers
    return bindActionCreators({ fetchOrders, completeOrder }, dispatch)
}

// promote OrderHistoryView from component to container. It needs to know about this new dispatch method, fetchOrders. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryView);
