import { auth } from "express-oauth2-jwt-bearer";


export const jwtCheck = auth({
    audience: process.env.Auth0_AUDIENCE,
    issuerBaseURL: process.env.Auth0_ISSUEBASEURL,
    tokenSigningAlg: 'RS256'
});

