import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Apple from '../assets/images/appleCompany.png'
import PayPal from '../assets/images/paypal.png';
import NetApp from '../assets/images/NetApp.png';
import PayU from '../assets/images/payu.jpg';
import {Link} from 'react-router-dom'

export default function CompanyWiseQuestionsList() {
    const companies = [Apple, PayPal, PayU, NetApp];
    return (
        <div style={{ display: "flex", marginTop: "100px", justifyContent: "space-evenly" }}>
            {companies.map((company) => {
                return (<CardComp company={company} />);
            })}
        </div>
    );
}

function CardComp({ company }) {
    return (
        <Link to='/companyWiseQuestions' style={{ textDecoration: 'none' }} >
            <Card sx={{ width: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140px"

                        image={company}
                        alt="company logo"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            TOP 50 QUESTIONS
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Top 50 most recently asked interview questions.
                            Boost your confidence before your next interview and get your dream job.
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}
