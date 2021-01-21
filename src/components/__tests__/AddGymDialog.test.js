import {
    fireEvent, render,
    screen
} from '@testing-library/react';
import { setShowAddGymDialog } from '../../reducers/userSlice';
import wrapComponent, { makeStore } from '../../testUtils/testUtils';
import { AddGymDialog } from '../AddGymDialog';

jest.disableAutomock()

describe.skip('Add Gym Dialog', () => { // TODO Material-UI Dialog doesn't render snapshots properly
    it('renders and performs select gym action correctly', () => {

        const initialState = {
            user: {
                editableUser: {
                    passes: {}
                },
            },
            dialog: {
                showAddGymDialog: true
            },
            firebase: {},
            firestore: {
                data: {
                    gyms: {
                        'FB': {
                            name: 'Fit Bloc'
                        }
                    }
                }
            }
        };

        const store = makeStore(initialState);
        const component = wrapComponent(AddGymDialog, store);

        const { asFragment } = render(component);
        expect(asFragment()).toMatchSnapshot();
        console.log(store.getState().firestore.data.gyms);

        const gymItem = screen.getByText(/Fit Bloc/i);
        fireEvent.click(gymItem);

        expect(store.getState().user.editableUser).toStrictEqual({
            passes: {
                'FB': 0
            }
        });
        expect(store.getState().user.showAddGymDialog).toBe(false);
    });
})