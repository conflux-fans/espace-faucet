import axios from 'axios';
import qs from 'qs';

const CAPTCH_SECRET_KEY = '6Le6QDIfAAAAABEqZOrxo8eBiHsiy_Nd0zOFhDTn';

export async function verifyCaptcha(token) {
  const res = await axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    url: 'https://www.google.com/recaptcha/api/siteverify',
    data: qs.stringify({
      secret: CAPTCH_SECRET_KEY,
      response: token,
    }),
  });
  return res.data;
}

// verifyCaptcha('123').then(console.log);