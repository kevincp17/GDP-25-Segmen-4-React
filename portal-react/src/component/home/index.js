import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Home() {
    const [authenticated, setAuthenticated] = useState(Cookies.get("authenticated"));

    useEffect(() => {}, [authenticated])

    const logout = () => {
        setAuthenticated(false);
        Cookies.remove("authenticated");
      };

    if (!authenticated) {
        return <Navigate replace to="/" />;
    } else {
        return (
            <>
                <h1>THIS IS HOME</h1>
                <button onClick={logout}>logout</button>
            </>
        )
    }
}

export default Home;