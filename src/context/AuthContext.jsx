import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const url = "http://localhost:3000";

export function AuthContext({children}){
    const [user, setUser] = useState({});

    useEffect(() => {
        /* const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(storedUser);
        } */
       /* setUser({
            username: "pepper",
            name: "Dr. Pepper",
            password: "pepper",
            role: "doctor"
        }); */
    }, []);

    async function login(user, pass){
        await axios.get(`${url}/users?username=${user}`)
            .then(response => {
                console.log(response.data);
                if(response.data.length > 0 && response.data[0].password == pass)
                {
                    setUser(response.data[0]);
                    return true;
                }
                else return false;
            });
    }

    function logout(){
        setUser({});
    }

    const value = 
    {
        user,
        login,
        logout,
        isLogged: user.role != null && user.role != "",
        isDoctor: user.role == "doctor",
        isAdmin: user.role == "admin"
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export const useAuth = () => useContext(UserContext);