// Appbar.jsx
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {Button, Link} from "@mui/material";
import {Box} from "@mui/system";
import {useRecoilState} from "recoil";
import {useNavigate} from "react-router-dom";
import {authState} from "../recoil/atoms/atom.ts";
import leetcodeLogo from "../assets/images/leetcodeLogo.png";

function Appbar() {
    const [auth, setAuth] = useRecoilState(authState); // Get the Recoil setter function directly

    const navigate = useNavigate();

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
                {   !auth.isAuthenticated ?(
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
                                localStorage.setItem("token", "");
                                // Update the authState to indicate the user is not authenticated
                                setAuth({
                                    isAuthenticated: false
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
