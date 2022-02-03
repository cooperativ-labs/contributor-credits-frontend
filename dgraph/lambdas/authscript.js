import jwt from 'jsonwebtoken';
import { sha256 } from 'js-sha256';
import { v4 as uuid } from 'uuid';
import fetch from 'node-fetch';

/** FIXME
 * Change this key and pull it from env variable.
 * This must match what you use in your Dgraph Schema in # Dgraph.Authorization VerificationKey
 */
// NOTE: Keep this super secret and out of any and all public places including github repositories
const key = 'YourSecretPassHere';

/** FIXME
 * Change this to your payload claims property. Normally a url but not mandatory.
 * This must match what you use in your Dgraph Schema in # Dgraph.Authorization Namespace
 */
const claims = 'https://contributorcredits.com/jwt/claims'; // NOTE: This does NOT need to point to any actual routing.

// FIXME: Your graphql endpoint
const endpoint = 'https://contributorcredits.com/graphql'; // NOTE: I would not attempt this until you have enabled SSL on your server.

const issuer = 'yourDomain'; // NOTE: This can be anything you want for most circumstances.

// define how many days before the user token expired.
const aliveDays = 30;

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*', // FIXME: lock this down to whitelisted domains only.
  'Access-Control-Allow-Methods': 'OPTIONS, POST',
  'Access-Control-Allow-Headers': 'content-type',
  Allow: 'OPTIONS, POST',
};

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  // get the username and pass variables sent to this request in the body.
  const params = JSON.parse(event.body);
  const username = params.username || null;
  // FIXME: do better hashing instead of md5
  const pass = params.pass ? sha256(params.pass) : null;

  /** NOTE
   * DO NOT put a password in user received JWT.
   * Think of everything in the JWT payload as user readable data to the client.
   */
  // Define AUTh_TOKEN used by the script to query for a valid user.
  const AUTH_TOKEN = jwt.sign(
    {
      [claims]: {
        PASSWORD: pass,
        USERNAME: username,
      },
    },
    key,
    {
      // NOTE: this can be shortened most likely to a minute or even less.
      expiresIn: '10 minute',
      // This can be anything here.
      issuer: 'authentication script',
      jwtid: uuid(),
      subject: 'authenticate',
    }
  );

  return (
    fetch(endpoint, {
      headers: {
        auth: AUTH_TOKEN,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        /** FIXME
         * Put your query here to find a valid user and get their data.
         * We are comparing the password through JWT @auth rules not in any filter of the query
         */
        query: `
        query ($username: String!){
          getUser(username:$username) { 
            username
            isType
            isContact { id name }
          }
        }
      `,
        variables: { username: username },
      }),
    })
      // prepares the results to be parsed
      .then((body) => body.json())
      // do something with the results
      .then((userdata) => {
        // NOTE: Here we are looking to find if the query responded with a username
        /** TODO
         * If ES6 is supported this can be shortened to the following:
         * if (userdata?.getUser?.username) { ... }
         */
        if (userdata && userdata.data && userdata.data.getUser && userdata.data.getUser.username) {
          // create a data object we will use to build our claims
          const data = {};
          const getUser = userdata.data.getUser;
          // assign attributes to the data object from the user data received.
          data.USERNAME = getUser.username;
          data.ISCONTACT = getUser.isContact.id;
          let ADMIN_TOKEN = null;
          /** NOTE
           * If the user is a super admin I am providing back two separate tokens,
           *  one that will act as a regular user, and one that will give them super admin privileges.
           * This allows a super admin to only enact special privileges when needed.
           */
          if (getUser.isType === 'ADMIN') {
            ADMIN_TOKEN = jwt.sign(
              {
                [claims]: { ...data, USERROLE: 'ADMINISTRATOR' },
              },
              key,
              {
                expiresIn: `${aliveDays} days`,
                issuer,
                jwtid: uuid(),
                subject: userdata.data.getUser.username,
              }
            );
          }
          const USER_TOKEN = jwt.sign(
            {
              [claims]: { ...data, USERROLE: 'USER' },
            },
            key,
            {
              expiresIn: `${aliveDays} days`,
              issuer,
              jwtid: uuid(),
              subject: userdata.data.getUser.username,
            }
          );
          // NOTE: I am returning a readable string back to the request making it clear how long the JWT is valid for.
          const expires = new Date();
          expires.setDate(expires.getDate() + aliveDays);
          // create a body to be used in the response back to the request
          const body = { token: USER_TOKEN, username: data.USERNAME, expires };
          // if the admin token was created, add it to the body to be sent back
          if (ADMIN_TOKEN) body.admin = ADMIN_TOKEN;
          return {
            headers,
            statusCode: 200,
            body: JSON.stringify(body),
          };
        }
        // TODO: this can probably be enhanced some to provide a statusCode 200 with a nice message about invalid username/pass
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Invalid' }),
        };
      })
      .catch((error) => ({
        // TODO: this can probably be enhanced some to provide a statusCode 200 with better error handling.
        statusCode: error.statusCode || 500,
        headers,
        body: JSON.stringify({ error: error || 'Server Error' }),
      }))
  );
};
