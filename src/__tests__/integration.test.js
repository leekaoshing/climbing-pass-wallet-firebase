import { screen, waitFor } from '@testing-library/dom';
import { fireEvent, render, act, waitForElement } from '@testing-library/react';
import firebase from 'firebase/app';
import React from 'react';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import App from '../App';
import importedStore, { rrfConfig } from '../app/store';
import '../index.css';

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: importedStore.dispatch,
    createFirestoreInstance
};

const FullApp = ({ store }) => {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <App />
            </ReactReduxFirebaseProvider>
        </Provider>
    );
}

jest.setTimeout(10000);
jest.disableAutomock()

describe.skip('Full end-to-end integration test', () => {
    jest.unmock('react-redux-firebase');

    // let appRender;

    // beforeAll(() => {
    //     appRender = render(
    //         <FullApp store={importedStore} />
    //     )
    //     // await act(async () => {
    //     //     appRender = mount(<FullApp store={importedStore} />);
    //     // });
    // })

    // it('Should render correctly', async () => {
    //     await screen.findAllByText(/Email/i)
    //     expect(appRender.asFragment()).toMatchSnapshot();
    // })

    it('Should login correctly', async () => {
        // appRender.rerender(<FullApp store={importedStore} />);
        // expect(appRender.asFragment()).toMatchSnapshot();

        // const appRender = render(
        //     <FullApp store={importedStore} />
        // )

        const { rerender } = render(
            <Provider store={importedStore}>
                <ReactReduxFirebaseProvider {...rrfProps}>
                    <App />
                </ReactReduxFirebaseProvider>
            </Provider>
            );


        await screen.findAllByText(/Email/i)

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'rban@mail.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123456' } });
        fireEvent.click(screen.getByText(/Log In/i));
        // rerender(<FullApp store={importedStore} />, container);

        
        await waitFor(() => expect(importedStore.getState().firebase.auth.isEmpty).toBe(false));
        
        
        rerender(<Provider store={importedStore}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <App />
            </ReactReduxFirebaseProvider>
        </Provider>)
        console.log('STATE', importedStore.getState())
        await waitFor(() => expect(importedStore.getState().firestore.data['gyms']).toBeDefined());
        const username = await screen.findByLabelText(/Ray Ban/i);

        // await waitForElementToBeRemoved(() => screen.queryByLabelText('Email')).then(() => {
        //     console.log(importedStore.getState());
        //     // console.log('DONE HERE');
        //     screen.findByText(/Ray Ban/i).then(username => {
        //         expect(username).toBeInTheDocument();
        //     }).catch(err => {
        //         console.log('FAILED', err)
        //     })

        //     expect(appRender.asFragment()).toMatchSnapshot();
        // }).catch(err => {
        //     console.log('FAILED', err)
        // })
        // await screen.findAllByText(/Ray Ban/i)
        // const username = await screen.findByText(/Ray Ban/i)
        // expect(username).toBeInTheDocument();
        // appRender.update();
        // expect(appRender.asFragment()).toMatchSnapshot();
    })


});