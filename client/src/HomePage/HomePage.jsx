import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
//import GoogleMapComponent from '../_components/googleMap/googleMapComponent';
import {MyGoogleMapClass} from '../_components/mymap';
import ModelFactory from '../_components/mymap/ModelFactory';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;
        return (
            <div>
            <div className="col-md-12">
                
                {users.items &&
                <MyGoogleMapClass modelFactory={ModelFactory}/>
                }
            </div>
                <br/>
            <div className="col-md-12">
            <b>Hi {user.firstName}!</b><Link to="/login">Logout</Link>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };