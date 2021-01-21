import reducer, {
    selectShowAboutDialog,
    selectShowAddGymDialog,
    selectShowConfirmationDialog,
    selectShowCreateUserDialog,
    selectShowPasswordResetDialog,
    selectShowUpdateResultDialog,
    setShowAboutDialog,
    setShowAddGymDialog,
    setShowConfirmationDialog,
    setShowCreateUserDialog,
    setShowPasswordResetDialog,
    setShowUpdateResultDialog,
} from './dialogSlice';

const initialState = {
    showAboutDialog: false,
    showAddGymDialog: false,
    showConfirmationDialog: false,
    showCreateUserDialog: false,
    showPasswordResetDialog: false,
    showUpdateResultDialog: false,
};

describe.skip('dialogSlice', () => {
    it('setShowAboutDialog', () => {
        const nextState = reducer(initialState, setShowAboutDialog(true));
        const rootState = { dialog: nextState };
        expect(selectShowAboutDialog(rootState)).toBe(true);
    })

    it('setShowAddGymDialog', () => {
        const nextState = reducer(initialState, setShowAddGymDialog(true));
        const rootState = { dialog: nextState };
        expect(selectShowAddGymDialog(rootState)).toBe(true);
    })

    it('setShowConfirmationDialog', () => {
        const nextState = reducer(initialState, setShowConfirmationDialog(true));
        const rootState = { dialog: nextState };
        expect(selectShowConfirmationDialog(rootState)).toBe(true);
    })

    it('setShowCreateUserDialog', () => {
        const nextState = reducer(initialState, setShowCreateUserDialog(true));
        const rootState = { dialog: nextState };
        expect(selectShowCreateUserDialog(rootState)).toBe(true);
    })

    it('setShowPasswordResetDialog', () => {
        const nextState = reducer(initialState, setShowPasswordResetDialog(true));
        const rootState = { dialog: nextState };
        expect(selectShowPasswordResetDialog(rootState)).toBe(true);
    })

    it('setShowUpdateResultDialog', () => {
        const nextState = reducer(initialState, setShowUpdateResultDialog(true));
        const rootState = { dialog: nextState };
        expect(selectShowUpdateResultDialog(rootState)).toBe(true);
    })
})

