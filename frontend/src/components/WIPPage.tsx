import WIP from '../assets/images/WorkInProgress.jpg';


export default function WorkInProgress(){
    return (
        <div style={{position:'fixed'}}>
            <img src={WIP} alt="work in progress" style={{padding:0,maxWidth:'100%',margin:'0',height:'auto'}}/>
        </div>
    )
}