import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState(null); // Initialize with null or default user object
console.log(userLogin)
  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;