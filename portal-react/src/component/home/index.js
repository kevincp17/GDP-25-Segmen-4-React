import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
        // const [authenticated, setAuthenticated] = useState(false);

        // useEffect(() => {
        //     const loggedInUser = localStorage.getItem("authenticated");
        //     if (loggedInUser) {
        //         setAuthenticated(true);
        //     }
        // }, []);

        // if (!authenticated) {
        //     return <Navigate replace to="/tes" />;
        // } else {
            return (
                <>
                    <h1>THIS IS HOME</h1>
                </>
            )
        // }
    }

    export default Home;