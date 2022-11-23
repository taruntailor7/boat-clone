import { createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({children})=>{
    // const [isAuth, setIsAuth] = useState(localStorage.getItem('auth')||"false");

    const handleLogout = () =>{
        // setIsAuth(false)
        localStorage.setItem("isAuth", false);
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
    }
   
    return <AuthContext.Provider value={{handleLogout}}>
        {children}
    </AuthContext.Provider>
}
export default AuthContextProvider