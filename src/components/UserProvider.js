import React, { Component, createContext } from 'react';
import { auth, getUser } from '../services/firebase';

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
    state = {
        user: null
    };

    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {
            const user = await getUser(userAuth);
            console.log('user provider mount fetched user', user);
            this.setState({ user });
        });
    };

    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
export default UserProvider;