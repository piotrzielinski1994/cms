import { setCookie } from 'typescript-cookie';

const setPermament = (name: string, value: string | number | boolean | object) => {
  setCookie(name, value.toString(), { expires: 365 * 10, path: '/' });
};

const cookies = { setPermament };

export default cookies;
