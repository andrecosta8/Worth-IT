import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const[admin, setAdmin] = useState(null);

  const addUserToContext = (user) => {
    console.log(user)
    if (user !== null) return;
    setUser(user);
  };

  const removeUserFromContext = () => {
    setUser(null);
  };

  const addAdminToContext =(admin) =>{
    console.log(admin)
    if(admin!== null) return;
    setAdmin(admin);
  };

  const removeAdminFromContext = () => {
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, addUserToContext, removeUserFromContext, admin, addAdminToContext, removeAdminFromContext  }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}