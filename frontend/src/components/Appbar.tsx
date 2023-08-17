import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {Button, Link} from "@mui/material";
import {Box} from "@mui/system";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {useNavigate} from "react-router-dom";
import {userState} from "../recoil/atoms/user.ts";
import {isUserLoading} from "../recoil/selectors/isUserLoading.ts";
import {userEmailState} from "../recoil/selectors/userEmail.ts";
import leetcodeLogo from "../assets/images/leetcodeLogo.png";

function Appbar() {
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();
    if (userLoading) {
        return <></>
    }
    return (
        <AppBar position={"fixed"} color={"transparent"}>
            <Toolbar style={{justifyContent: "space-between"}}>
                <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
                    <Link href={"/"}><img style={{width:"2rem", height:"2rem",margin:"0"}} src={leetcodeLogo} alt="logo"/>
                    </Link>
                        <Link href="/" underline="none" color="inherit" sx={{fontWeight: "bold", padding:"0.5rem",fontSize: "1.5rem"}}>
                        Leetcode
                    </Link>
                </div>
                {   (userEmail===null) ?(
                        <Box sx={{display: "flex", justifyContent: "flex-end", gap: "25px"}}>
                            <Button variant="contained" onClick={() => navigate("/signup")}>
                                Sign Up
                            </Button>
                            <Button variant="contained" onClick={() => navigate("/login")}>
                                Login
                            </Button>
                        </Box>
                ):(
                    <Box sx={{display: "flex", gap: "25px"}}>
                        <Button variant="contained" onClick={() => navigate("/problemSet/all")}>
                            Problems
                        </Button>
                        {/*<AccountMenu />*/}
                        <Button
                            variant="contained"
                            onClick={() => {
                                localStorage.setItem("token","");
                                // Update the authState to indicate the user is not authenticated
                                setUser({
                                    isLoading: false,
                                    userEmail: null
                                });
                                navigate("/");
                            }}
                        >
                            Logout
                        </Button>
                    </Box>)
                }
            </Toolbar>
        </AppBar>
    );

}

export default Appbar;
