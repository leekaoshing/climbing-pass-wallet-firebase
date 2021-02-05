import * as admin from "firebase-admin"

function convertPassesToArray(passesMap) {
    const passesArray = []
    Object.keys(passesMap).forEach(gymId => {
        passesArray.push({
            gymId,
            number: passesMap[gymId]
        })
    })
    return passesArray
}

// Commented code implements a new collection where { from: ..., to: ... } friend relations are stored
// async function returnUser(userDetails, requestUserUid) {
//     if (userDetails.uid === requestUserUid) { // User is requesting themself, can view
//         return {
//             firstName: userDetails.firstName,
//             lastName: userDetails.lastName,
//             email: userDetails.email,
//             uid: userDetails.uid,
//             friends: userDetails.friends,
//             passes: convertPassesToArray(userDetails.passes),
//             canView: true
//         }
//     }

//     // Else, check if the requested user is friends with the requesting user
//     const relationshipResult = await admin.firestore().collection('friends') // TODO Change collection to constant FRIENDS_COLLECTION
//         .where('from', '==', userDetails.uid)
//         .where('to', '==', requestUserUid)
//         .where('active', '==', true)
//         .get()
//     if (relationshipResult.empty) {
//         // Not friend
//         return {
//             firstName: userDetails.firstName,
//             lastName: userDetails.lastName,
//             email: userDetails.email,
//             uid: userDetails.uid,
//             friends: [],
//             passes: [],
//             canView: false
//         }
//     } else {
//         // Is friend
//         return {
//             firstName: userDetails.firstName,
//             lastName: userDetails.lastName,
//             email: userDetails.email,
//             uid: userDetails.uid,
//             friends: userDetails.friends,
//             passes: convertPassesToArray(userDetails.passes),
//             canView: true
//         }
//     }
// }

function readUserDetails(userDetails, requestUserUid) {
    if (userDetails.uid !== requestUserUid && !userDetails.friends.includes(requestUserUid)) {
        return {
            canView: false,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            uid: userDetails.uid,
            friends: [],
            passes: [],
        }
    }

    return {
        canView: true,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        uid: userDetails.uid,
        friends: userDetails.friends,
        passes: convertPassesToArray(userDetails.passes),
    }
}

const validIdentifierTypes = ['email', 'uid']

const resolverFunctions = {
    Query: {
        users: async(_, args, context) => {
            const identifiers = args.identifiers
            if (identifiers.length <= 0) {
                return []
            }

            const identifierType = args.identifierType
            if (!validIdentifierTypes.includes(identifierType)) throw new Error(`Invalid identifier type: ${identifierType}. Expected one of: ${validIdentifierTypes}.`)

            const requestUserUid = context.uid

            const users = []
            const userDetailsResults = await admin.firestore().collection('users').where(identifierType, 'in', identifiers).get()
            userDetailsResults.forEach(doc => {
                const userDetails = doc.data()
                users.push(readUserDetails(userDetails, requestUserUid))
            })

            // await args.identifiers.forEach(identifier => {
            //     users.push(resolverFunctions.Query.user(_, { identifier, identifierType: args.identifierType }, context).then(user => user))
            // })
            return users
        },
        user: async (_, args, context) => {
            const identifierType = args.identifierType
            if (!validIdentifierTypes.includes(identifierType)) throw new Error(`Invalid identifier type: ${identifierType}. Expected one of: ${validIdentifierTypes}.`)

            const identifier = args.identifier
            const requestUserUid = context.uid

            const userDetailsResult = await admin.firestore().collection('users').where(identifierType, '==', identifier).get()
            if (!userDetailsResult.empty) {
                const userDetails = userDetailsResult.docs[0].data()
                // return returnUser(userDetails, requestUserUid).then(user => user)
                return readUserDetails(userDetails, requestUserUid)
            } else {
                throw new Error(`Unable to find user with ${identifierType} '${identifier}'.`)
            }
        }
    }
}

export default resolverFunctions