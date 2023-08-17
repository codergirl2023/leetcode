import dreamJob from "../assets/images/DreamJob.png";
function Landing() {
    console.log("auth token = ",localStorage.getItem('token'));

    return (
        <div style={{
            display: "flex",
            width: "100%",
            position: "fixed",

        }}>
            <img style={{flex: 1}}
                 src={dreamJob}
                 alt='get dream job'

            />
        </div>
    )
}

export default Landing;