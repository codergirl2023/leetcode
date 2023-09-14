import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Link, TextField, Typography, Alert } from "@mui/material";
import '../assets/static/Signup.css'
import leetcodeLogo from '../assets/images/leetcodeLogo.png'
import axios, { AxiosError } from "axios";
import { userState } from "../recoil/atoms/user.ts";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [fullName, setFullName] = useState("");
    const [failMsg, setFailMsg] = useState<string | undefined>("");
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState);

    return (
        <>
            <div className="authentication">
                {failMsg && (<Alert variant="filled" severity="error">{failMsg}</Alert>)}

            </div>
            <div className={"bodySignup"}>
                <div className={"signupContainer"}>
                    <div className={"logo"}>
                        <img src={leetcodeLogo} alt={"logo"} />
                    </div>
                    <div>
                        <Typography>Leetcode</Typography>
                    </div>
                    <div className={"textfield"}>
                        <TextField autoFocus={true} required={true} size={"small"} variant={"outlined"} label={"First Name"} onChange={(e) => {
                            setFirstName(e.target.value)
                        }} margin={"dense"} fullWidth={true}
                        />
                    </div>
                    <div className={"textfield"}>
                        <TextField required size={"small"} fullWidth variant={"outlined"} label={"Last Name"} onChange={(e) => {
                            setLastName(e.target.value)
                        }} margin={"dense"} />
                    </div>
                    <div className={"textfield"}>
                        <TextField required size={"small"} variant={"outlined"} label={"Email"} onChange={(e) => {
                            setEmail(e.target.value)
                        }} margin={"dense"} />
                    </div>
                    <div className={"textfield"}>
                        <TextField required size={"small"} fullWidth variant={"outlined"} label={"Password"}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }} margin={"dense"} />
                    </div>

                    <div className={"button"}>
                        <Button variant={"contained"} onClick={async () => {
                            try {
                                setFullName(firstName + " " + lastName);
                                if (!fullName.length || !email.length || !password.length) {
                                    alert("All fields are mandatory");
                                }
                                const response = await axios.post("http://localhost:3000/users/signup", {
                                    fullName,
                                    email,
                                    password
                                }, {
                                    headers: {
                                        'content-type': 'application/json'
                                    }
                                });

                                localStorage.setItem("token", response.data.jwtToken);
                                setUser({
                                    isLoading: false,
                                    userEmail: response.data.userId
                                })
                                navigate('/problemset/all');
                            } catch (err) {
                                const error = err as AxiosError<Error>;

                                setFailMsg(error?.response?.data?.message)
                            }
                        }} fullWidth>Sign Up</Button>
                    </div>
                    <div className={"signin"}>

                        <Typography>Have an account?</Typography>
                        <Link href={"/login"} underline={"none"}>Sign In</Link>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Login;