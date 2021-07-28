import History from "../routes/History";

// Service to check authentication for user and to signOut
const Auth = {
  signOut() {
    localStorage.removeItem("token");
    History.push(`/${localStorage.getItem("lang")}/login`);
  },
  isAuth() {
    return localStorage.getItem("token");
  },
};

export default Auth;
