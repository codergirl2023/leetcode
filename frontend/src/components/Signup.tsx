import {useSetRecoilState} from "recoil";
import {authState} from "../recoil/atoms/atom";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Button, Link, TextField, Typography} from "@mui/material";
import '../assets/static/Signup.css'
import leetcodeLogo from '../assets/images/leetcodeLogo.png'
import axios from "axios";

function Login() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);
    let fullName = firstName + lastName;
    const navigate = useNavigate();
    const setAuth = useSetRecoilState(authState)

    return (
        <div className={"body"}>
            <div className={"signupContainer"}>
                <div className={"logo"}>
                    <img src={leetcodeLogo} alt={"logo"}/>
                </div>
                <div>
                    <Typography>Leetcode</Typography>
                </div>
                <div className={"textfield"}>
                    <TextField required size={"small"} variant={"outlined"} label={"First Name"} onChange={(e) => {
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
                    <TextField required size={"small"}  variant={"outlined"} label={"Email"} onChange={(e) => {
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
                   fullName = firstName+lastName;
                    <Button variant={"contained"} onClick={async () => {
                        try {
                            const response = await axios.post("http://localhost:3000/users/signup", {
                                "fullName": fullName,
                                email,
                                password
                            }, {
                                headers: {
                                    'content-type': 'application/json'
                                }
                            });

                            localStorage.setItem("token", response.data.jwtToken);
                            setAuth({
                                isAuthenticated: true
                            });
                            navigate('/problemset/all');
                        } catch (error) {
                            console.log(error);

                        }
                    }} fullWidth>Sign Up</Button>
                </div>
                <div className={"signin"}>

                    <Typography>Have an account?</Typography>
                    <Link href={"/login"} underline={"none"}>Sign In</Link>

                </div>

            </div>
        </div>
    );
}

export default Login;