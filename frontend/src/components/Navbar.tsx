import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
    Link, useMediaQuery,
    createTheme
} from "@mui/material";
import leetcodeLogo from "../assets/images/leetcodeLogo.png";
import DrawerSmallScreenComponent from "./DrawerComponent.tsx";
import AppbarComponent from "./AppbarComponent.tsx";

function Navbar() {
    const theme = createTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <AppBar position="fixed" color="inherit">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Link href="/">
                        <img
                            style={{ width: "2rem", height: "2rem", margin: "0" }}
                            src={leetcodeLogo}
                            alt="logo"
                        />
                    </Link>
                    <Link
                        href="/"
                        underline="none"
                        color="inherit"
                        sx={{ fontWeight: "bold", padding: "0.5rem", fontSize: "1.5rem" }}
                    >
                        Leetcode
                    </Link>
                </div>
                {isMobile ? (<DrawerSmallScreenComponent />) : (<AppbarComponent />)}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;

