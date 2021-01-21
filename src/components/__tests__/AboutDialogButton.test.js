import {
    fireEvent, render,
    screen
} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { selectShowAboutDialog } from '../../reducers/dialogSlice';
import { AboutDialogButton } from '../AboutDialogButton';

jest.disableAutomock()

describe.skip('About Dialog Button', () => {
    it('renders and performs show dialog action correctly', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <AboutDialogButton />
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
        const button = screen.getByText(/About/i);
        fireEvent.click(button);

        expect(selectShowAboutDialog(store.getState())).toBe(true);
    });
})