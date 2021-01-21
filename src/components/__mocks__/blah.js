// const rrf = jest.createMockFromModule('react-redux-firebase');

export const mockFirebase = {
    auth: jest.fn().mockReturnThis(),
    signInWithEmailAndPassword: jest.fn((email, password) => { uid: 'someUid' })
}

// export const useFirebase = jest.fn(() => mockFirebase);

export const mockFirestore = {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn().mockReturnThis(),
    data: jest.fn(() => mockuser)
}

// export const useFirestore = jest.fn(() => mockFirestore);

// const useFirestoreConnect = jest.fn();

// rrf.useFirebase = useFirebase;
// rrf.useFirestore = useFirestore;
// rrf.useFirestoreConnect = useFirestoreConnect;

// module.exports = rrf;
