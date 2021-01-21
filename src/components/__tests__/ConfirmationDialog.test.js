import {
    fireEvent, render,
    screen
} from '@testing-library/react';
import { setShowConfirmationDialog } from '../../reducers/userSlice';
import wrapComponent, { makeStore } from '../../testUtils/testUtils';
import { ConfirmationDialog } from '../ConfirmationDialog';

jest.disableAutomock()

describe.skip('Confirmation Dialog', () => {
    it('renders and performs confirm and close action correctly', () => {
        // const initialState = {
        //     user: {
        //         editableUser: {
        //             passes: {
        //                 'FB': 2,
        //                 'BM': 1,
        //                 'OS': 0
        //             }
        //         },
        //     },
        //     dialog: {
        //         showConfirmationDialog: true
        //     },
        //     firebase: {
        //         auth: {
        //             uid: 'someUid'
        //         }
        //     },
        //     firestore: {
        //         data: {
        //             users: {
        //                 someUid: {
        //                     passes: {
        //                         'FB': 1,
        //                         'BM': 2,
        //                         'OS': 1
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // };

        // const store = makeStore(initialState);
        // const component = wrapComponent(ConfirmationDialog, store);

        // const { asFragment } = render(component);
        // expect(asFragment()).toMatchSnapshot();

        // const gymItem = screen.getByText(/Yes/i);
        // fireEvent.click(gymItem);

        // expect(store.getState().firestore.data.users.someUid.passes).toStrictEqual({
        //     passes: {
        //         'FB': 0
        //     }
        // });
        // expect(store.getState().user.showConfirmationDialog).toBe(false);
    });
})