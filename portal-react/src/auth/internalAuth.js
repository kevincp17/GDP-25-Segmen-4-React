import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function InternalAuth({children}) {
    // const [authenticated, setAuthenticated] = useState(Cookies.get("authenticated"));
    const [role, setRole] = useState(Cookies.get("role"));

    useEffect(() => {}, [role])

    if (role === 'applicant') {
        return <Navigate replace to="/" />;
    } else {
        return children;
    }
}

export default InternalAuth;