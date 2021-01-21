import {
    selectLoggedInUser,
    selectUsers,
    selectFirebaseAuth,
    selectGyms
} from './firebase';

const rootState = {
    firebase: {
        auth: {
            uid: 'someUid'
        }
    },
    firestore: {
        data: {
            users: {
                'someUid': {
                    someProperties: 'property'
                }
            },
            gyms: {
                'SG': {
                    name: 'Some gym',
                    url: 'someUrl'
                }
            }
        }
    }
};

describe.skip('userSlice', () => {
    it('selectLoggedInUser', () => {
        expect(selectLoggedInUser(rootState)).toStrictEqual({
            someProperties: 'property'
        });
    })

    it('selectUsers', () => {
        expect(selectUsers(rootState)).toStrictEqual({
            'someUid': {
                someProperties: 'property'
            }
        });
    })

    it('selectFirebaseAuth', () => {
        expect(selectFirebaseAuth(rootState)).toStrictEqual({
            uid: 'someUid'
        });
    })

    it('selectGyms', () => {
        expect(selectGyms(rootState)).toStrictEqual({
            'SG': {
                name: 'Some gym',
                url: 'someUrl'
            }
        });
    })
});