import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Link, TextField, Typography, Alert } from "@mui/material";
import {userState} from "../recoil/atoms/user.ts";
import leetcodeLogo from '../assets/images/leetcodeLogo.png'
import axios from "axios";
import '../assets/static/Login.css';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failMsg, setFailMsg] = useState(null);
    const setUser = useSetRecoilState(userState);

    const navigate = useNavigate();

    return (
        <>
            <div className="authentication">
                {failMsg && (<Alert variant="filled" severity="error">{failMsg}</Alert>)}

            </div>
            <div className="bodyComplete">
            <div className={"bodyLogin"}>

                <div className={"loginContainer"} >
                    <div className={"logo"}>
                        <img src={leetcodeLogo} alt={"logo"} />
                    </div>
                    <div>
                        <Typography >Leetcode</Typography>
                    </div>
                    <div className={"textfield"}>
                        <TextField autoFocus={true} size={"small"} required={true} fullWidth variant={"outlined"} label={"Email"} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className={"textfield"}>
                        <TextField required size={"small"} fullWidth variant={"outlined"} label={"Password"} type="password" onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div className={"loginButton"}>
                        <Button variant={"contained"} fullWidth onClick={() => {
                            axios.post(`${BASE_URL}/users/login`, {}, {
                                headers: {
                                    email: email,
                                    password: password
                                }
                            }).then((response) => {
                                localStorage.setItem('token', response.data.jwtToken);
                                setUser({
                                    isLoading: false,
                                    userEmail: response.data.userId
                                })
                                navigate('/problemSet/all')

                            }
                            ).catch((error) => {
                                setFailMsg(error.response?.data?.msg);
                            })
                        }}>Sign In</Button>
                    </div>

                    <div className={"forgot-password"}>

                        <Typography>Forgot Password?</Typography>

                        <Link href={"/signup"} underline={"none"}>Sign Up</Link>

                    </div>

                </div>
            </div>
            </div>
        </>
    );
}

export default Login;