import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,

} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userEmailState } from "../recoil/selectors/userEmail";
import { userState } from "../recoil/atoms/user";

function DrawerComponent() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);

    return (
        <>
            <Drawer anchor="bottom" open={openDrawer} onClose={() => setOpenDrawer(false)}  >
                {(userEmail === null) ? (<List>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/signup" style={{color:'#1976d2',textDecoration:'none'}}>Signup</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem >
                        <ListItemText onClick={() => setOpenDrawer(false)}>
                            <Link to="/login" style={{color:'#1976d2',textDecoration:'none'}}>Login</Link>
                        </ListItemText>
                    </ListItem>
                </List>) :
                    (<List>
                        <ListItem onClick={() => setOpenDrawer(false)}>
                            <ListItemText>
                                <Link to="/problemSet/all" style={{color:'#1976d2',textDecoration:'none'}}>Problems</Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem >
                            <ListItemText  onClick={() => {
                                setOpenDrawer(false);
                                localStorage.setItem("token", "");
                                // Update the authState to indicate the user is not authenticated
                                setUser({
                                    isLoading: false,
                                    userEmail: null,
                                });
                            }}>
                                <Link to="/" style={{color:'#1976d2',textDecoration:'none'}}>Logout</Link>
                            </ListItemText>
                        </ListItem>
                    </List>)
                }

            </Drawer>
            <IconButton
                sx={{ color: "black", marginLeft: "auto" }}
                onClick={() => setOpenDrawer(!openDrawer)} >
                <MenuIcon />
            </IconButton>
        </>);
}
export default DrawerComponent;