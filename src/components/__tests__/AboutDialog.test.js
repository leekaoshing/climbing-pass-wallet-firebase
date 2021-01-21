import {
    fireEvent, render,
    screen
} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { AboutDialog } from '../AboutDialog';

jest.disableAutomock()

describe.skip('About Dialog', () => { // TODO Material-UI Dialog doesn't render snapshots properly
    it('renders and performs close action correctly', async () => {
        const { asFragment } = render(
            <Provider store={store}>
                <AboutDialog />
            </Provider>,
        );

        expect(asFragment()).toMatchSnapshot();
        const button = await screen.findAllByText(/About/i);
        fireEvent.click(button);

        expect(selectShowAboutDialog(store.getState())).toBe(false);
    });
})