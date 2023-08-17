import { Link } from 'react-router-dom';
import PageNotFound from "../assets/images/PageNotFound.jpeg";
import { Typography } from '@mui/material';

export default function NotFoundPage(){
    return (
        <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100vw",position:"fixed"}}>
        <Typography variant="h1" gutterBottom noWrap={true} >
        PAGE NOT FOUND
      </Typography>
        <Link to="/">
          Go to home
        </Link>
        <img  style={{width:"100vw"}}src={PageNotFound} alt="page not found"/> 
         
        
      </div>
    );
}