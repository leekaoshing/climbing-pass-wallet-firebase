import { ApolloServer } from 'apollo-server-cloud-functions'
import * as admin from "firebase-admin"
import * as functions from 'firebase-functions'
import resolvers from './resolvers'
import schema from './schema'

async function getUidFromToken(token) {
    if (!token) throw new Error('No token received.')
    const idToken = token.split('Bearer ')[1]
    const decodedToken = await admin
        .auth()
        .verifyIdToken(idToken)
    return decodedToken.uid
}

function gqlServer() {
    const apolloServer = new ApolloServer({
        typeDefs: schema,
        resolvers,
        context: async ({ req }) => {
            // Get the user token from the headers.
            const token = req.headers.authorization || ''

            // try to retrieve a user with the token
            return getUidFromToken(token).then(uid => ({ uid }))
        },

        // Enable graphiql gui locally
        // introspection: true,
        // playground: true
    })

    return apolloServer.createHandler({
        cors: {
            origin: true,
            credentials: true,
        },
    })
}

/**
 * Cloud Function triggered by HTTP request
 *
 * Trigger: `HTTPS - onRequest`
 *
 * @name graphql
 * @type {functions.CloudFunction}
 */
export default functions.region('asia-east2').https.onRequest(gqlServer())
