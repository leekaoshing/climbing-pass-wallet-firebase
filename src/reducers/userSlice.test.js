import reducer, {
    addGymToEditableUser,
    getPassDifferences,
    selectEditableUser,
    selectLoadingUpdateUser,
    selectUpdateResult,
    setEditableUser,
    setLoadingUpdateUser,
    setUpdateResult
} from './userSlice';

const initialState = {
    editableUser: { passes: {} },
    loadingUpdateUser: false,
    updateResult: null,
};

describe.skip('userSlice', () => {
    it('addGymToEditableUser', () => {
        const nextState = reducer(initialState, addGymToEditableUser('BM'));
        const rootState = { user: nextState };
        expect(selectEditableUser(rootState).passes).toStrictEqual({
            'BM': 0
        });
    })

    it('setEditableUser', () => {
        const nextState = reducer(initialState, setEditableUser({
            firstName: 'First',
            lastName: 'Last',
            displayName: 'Display',
            passes: {
                'BF': 1
            }
        }));
        const rootState = { user: nextState };
        expect(selectEditableUser(rootState)).toStrictEqual({
            firstName: 'First',
            lastName: 'Last',
            displayName: 'Display',
            passes: {
                'BF': 1
            }
        });
    })

    it('setLoadingUpdateUser', () => {
        const nextState = reducer(initialState, setLoadingUpdateUser(true));
        const rootState = { user: nextState };
        expect(selectLoadingUpdateUser(rootState)).toBe(true);
    })

    it('setUpdateResult', () => {
        const nextState = reducer(initialState, setUpdateResult({
            success: true,
            message: 'some message'
        }));
        const rootState = { user: nextState };
        expect(selectUpdateResult(rootState)).toStrictEqual({
            success: true,
            message: 'some message'
        });
    })

    it('getPassDifferences', () => {
        const nextState = reducer(initialState, setEditableUser({
            firstName: 'First',
            lastName: 'Last',
            displayName: 'Display',
            passes: {
                'BF': 1,
                'LH': 1
            }
        }));

        const rootState = {
            user: nextState,
            firebase: {
                auth: {
                    uid: 'someUid'
                }
            },
            firestore: {
                data: {
                    users: {
                        'someUid': {
                            passes: {
                                'BM': 1,
                                'BF': 2
                            }
                        }
                    }
                }
            }
        }

        expect(getPassDifferences(rootState)).toStrictEqual({
            'BF': -1,
            'LH': 1
        })
    })
})

