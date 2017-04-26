import Auth from 'j-toker';
import env from '../env';

Auth.configure({
  apiUrl: env.SERVER_URL
});

export default Auth
