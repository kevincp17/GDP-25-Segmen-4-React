import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Home() {
    const [authenticated, setAuthenticated] = useState(Cookies.get("authenticated"));

    useEffect(() => { }, [authenticated])

    const navigate = useNavigate();

    const logout = () => {
        setAuthenticated(false);
        // Cookies.remove("authenticated");
        Cookies.remove("user_id");
        Cookies.remove("role");
        Cookies.remove("email");
        navigate("/")
    };

    return (
        <>
            <h1>THIS IS HOME</h1>
            <button onClick={logout}>logout</button>
        </>
    )
    // }
}

export default Home;