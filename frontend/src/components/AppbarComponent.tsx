import {
    Button, Box
} from "@mui/material";
import { userState } from "../recoil/atoms/user.js";
import { isUserLoading } from "../recoil/selectors/isUserLoading.js";
import { userEmailState } from "../recoil/selectors/userEmail.js";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

function AppbarComponent() {
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();
    if (userLoading) {
        return <></>
    }
    return (
        <>
            {(userEmail === null) ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "25px"
                    }}
                >
                    <Button variant="contained" onClick={() => navigate("/signup")}>
                        Sign Up
                    </Button>
                    <Button variant="contained" onClick={() => navigate("/login")}>
                        Login
                    </Button>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        gap: "25px",
                    }}
                >
                    <Button variant="contained" onClick={() => navigate("/problemSet/all")}>
                        Problems
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            localStorage.setItem("token", "");
                            // Update the authState to indicate the user is not authenticated
                            setUser({
                                isLoading: false,
                                userEmail: null,
                            });
                            navigate("/");
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            )}
        </>);
}
export default AppbarComponent;