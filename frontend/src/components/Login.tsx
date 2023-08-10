import {useSetRecoilState} from "recoil";
import {authState} from "../recoil/atoms/atom";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Button, Link, TextField, Typography} from "@mui/material";
import '../assets/static/Login.css'
import leetcodeLogo from '../assets/images/leetcodeLogo.png'
import axios from "axios";
function Login() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();
    const [failMsg, setFailMsg] = useState(null);
    const setAuth = useSetRecoilState(authState)

    return (
        <div className={"body"}>
        <div className={"loginContainer"}>
            <div className={"logo"}>
                <img src={leetcodeLogo} alt={"logo"}/>
            </div>
            <div>
                <Typography >Leetcode</Typography>
            </div>
            <div className={"textfield"}>
            <TextField required size={"small"} fullWidth variant={"outlined"} label={"Email"} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className={"textfield"}>
                <TextField required size={"small"} fullWidth variant={"outlined"} label={"Password"} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className={"button"}>
                <Button variant={"contained"} fullWidth onClick={() => {
                    axios.post('http://localhost:3000/users/login', {}, {
                        headers: {
                            email: email,
                            password: password
                        }
                    }).then((response) => {
                            localStorage.setItem('token', response.data.jwtToken);
                            setAuth({
                                isAuthenticated: true
                            })
                            navigate('/problemSet/all')

                        }
                    ).catch((error) => {


                        setFailMsg(error.response?.data?.message || "An error occurred.");
                    })
                }}>Sign In</Button>
            </div>
            <div className={"forgot-password"}>

                    <Typography>Forgot Password?</Typography>

                    <Link href={"/signup"} underline={"none"}>Sign Up</Link>

            </div>

        </div>
        </div>
    );
}

export default Login;