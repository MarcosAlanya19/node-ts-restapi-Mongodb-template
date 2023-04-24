import { OAuth2Client } from 'google-auth-library';
import { config } from '../config';
import { IGoogleAuthResponse } from '../interface/google.interface';

const client = new OAuth2Client(config.SGOOGLE_CLIENT_ID);
export async function googleVerify(token = '') {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: config.SGOOGLE_CLIENT_ID,
  });

  const { name, picture, email } = ticket.getPayload() as IGoogleAuthResponse;

  return { name, img: picture, email };
}

googleVerify().catch(console.error);
