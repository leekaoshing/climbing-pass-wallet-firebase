import {
    fireEvent, render,
    screen
} from '@testing-library/react';
import { setShowAddGymDialog } from '../../reducers/userSlice';
import wrapComponent, { makeStore } from '../../testUtils/testUtils';
import { Login } from '../Login';

// const mockFirebase = {
//     auth: jest.fn().mockReturnThis(),
//     signInWithEmailAndPassword: jest.fn((email, password) => { uid: 'someUid' })
// };

// const mockFirestore = {
//     collection: jest.fn().mockReturnThis(),
//     doc: jest.fn().mockReturnThis(),
//     get: jest.fn().mockReturnThis(),
//     data: jest.fn(() => mockuser)
// }

jest.mock('react-redux-firebase', () => ({
    useFirebase: {
        auth: jest.fn().mockReturnThis(),
        signInWithEmailAndPassword: jest.fn((email, password) => { uid: 'someUid' })
    },
    useFirestore: {
        collection: jest.fn().mockReturnThis(),
        doc: jest.fn().mockReturnThis(),
        get: jest.fn().mockReturnThis(),
        data: jest.fn(() => mockuser)
    }
}));


describe('Login', () => {


    it('renders and performs login action correctly', () => {
        const mockUser = {
            firstName: 'Adam',
            lastName: 'Janson',
            displayName: 'ajan',
            passes: {
                'BM': 1
            }
        }

        const initialState = {
            user: {
                editableUser: {
                    passes: {}
                },
            },
        };

        const store = makeStore(initialState);
        const component = wrapComponent(Login, store);



        const { asFragment, rerender } = render(component);
        expect(asFragment()).toMatchSnapshot();

        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ajan@mail.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123456' } });
        fireEvent.click(screen.getByText(/Log In/i));

        // expect(mockFirebase.auth).toHaveBeenCalled();

        expect(store.getState().user.editableUser).toStrictEqual({
            passes: {
                'FB': 0
            }
        });
    });
})