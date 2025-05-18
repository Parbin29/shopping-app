import Cookies from 'js-cookie';

export function isUserAuthenticated() {
  const token = Cookies.get('jwt'); // 'jwt' must match the name set in backend cookie
  return !!token; // returns true if token exists, false otherwise
}
