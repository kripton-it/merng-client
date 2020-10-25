import jwtDecode from 'jwt-decode';

export const getUser = () => {
  const authToken = localStorage.getItem('authToken');

  // Если токена нет
  if (!authToken) return null;

  const decodedToken = jwtDecode(authToken);

  // Если токен есть, но он просрочен
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('authToken');
    return null;
  }

  // Если токен в порядке
  return decodedToken;
}