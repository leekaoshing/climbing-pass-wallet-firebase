import * as functions from 'firebase-functions'
import gqlServer from './server'

const server = gqlServer()

// /**
//  * Handle request from calling /graphql endpoint
//  *
//  * @param {functions.https.Request} req - Express HTTP Request
//  * @param {object} res - Express HTTP Response
//  * @returns {Promise} Resolves after handling request
//  */
// export async function graphqlRequest(req, res) {
//   console.log('request received', { body: req.body })
//   // Write response to request to end function execution
//   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
//   res.end('Hello from graphql')
// }

/**
 * Cloud Function triggered by HTTP request
 *
 * Trigger: `HTTPS - onRequest`
 *
 * @name graphql
 * @type {functions.CloudFunction}
 */
export default functions.region('asia-east2').https.onRequest(server)
