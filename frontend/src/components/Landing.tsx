import dreamJob from "../assets/images/DreamJob.png";
function Landing() {

    return (
        <div className="landingContainer" style={{
            display: "flex"
         
        }}>
            <img style={{position:'fixed', padding:0,width:'100%',margin:'0',height:'auto'}}
                 src={dreamJob}
                 alt='get dream job'

            />
            
        </div>
    )
}

export default Landing;