import { userState } from "../recoil/atoms/user";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function InitUser() {
    const setUser = useSetRecoilState(userState);
    const init = async () => {
        try {
           
            const response = await axios.get(`${BASE_URL}/users/me`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            if (response.data.email) {
                setUser({
                    isLoading: false,
                    userEmail: response.data.email
                })
            } else {
                setUser({
                    isLoading: false,
                    userEmail: null
                })
            }
        } catch (e) {

            setUser({
                isLoading: false,
                userEmail: null
            })
        }
    };

    useEffect(() => {
        init();
    }, []);

    return <></>
}