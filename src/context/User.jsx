import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import jwtDecode from 'jwt-decode'
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const authToken = Cookies.get('auth');
    console.log(authToken);

    if (authToken) {
      const user = jwtDecode(authToken);
      if (user.isAdmin) setIsAdmin(true);
      else {
        setIsAdmin(false);
        // Redirect to the desired path using react-router or any other routing mechanism
        // navigate('/');
      }
    }
  }, []);
  return (
    <UserContext.Provider value={{ isAdmin, setIsAdmin  }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;