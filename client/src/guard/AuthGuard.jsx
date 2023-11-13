import { connectIdentity } from "../AppConfig";
import { deleteToken, getToken, isTokenValid } from "../helper/userToken";

const AuthGuard = ({ children, levels }) => {

  const userToken = getToken();
  if (!isTokenValid(userToken)) {
    deleteToken();
    window.location.href = connectIdentity;
  } 

  return children;
  };
  
  export default AuthGuard;
  