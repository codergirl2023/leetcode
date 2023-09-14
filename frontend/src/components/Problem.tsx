import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, InputLabel, MenuItem, Select, TextField, Typography, Snackbar, SnackbarOrigin } from "@mui/material";
import '../assets/static/Problem.css'

interface State extends SnackbarOrigin {
    open: boolean;
}

export default function Problem() {
    const { problemId } = useParams();
    const [problem, setProblem] = useState([]);
    const [language, setLanguage] = useState(1)
    const [solution, setSolution] = useState("")
    const [solutionAccepted, setSolutionAccepted] = useState(0);
    const [state, setState] = useState<State>({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;


    const handleClose = () => {
        setState({ ...state, open: false });
    };


    let examples = "";
    async function onSubmit() {
        try {
            const acceptanceProbability = Math.random();
            if (acceptanceProbability > 0.5) {
                setSolutionAccepted(1);

                await axios.post(
                    'http://localhost:3000/submissions/',
                    {
                        "code": solution,
                        "problemTitle": problem.title,
                        "language": language,
                        "userId": user
                    },
                    {
                        headers: {
                            "authorization": "Bearer " + localStorage.getItem('token'), // Use "Authorization" key
                            "Content-Type": "application/json" // Use "Content-Type" key
                        }
                    }
                )
            } else {
                setSolutionAccepted(2);
            }
        } catch (error) {
            console.log(error);
        }
    }
 

    useEffect(() => {
        axios
            .get("http://localhost:3000/problemset/" + problemId, {
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setProblem(response.data[0]);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (Object.keys(problem).length > 0 && Object.keys(problem.examples).length > 0) {
        examples = JSON.parse(problem.examples);
    }

    return (
        <div className={"body1"}>

            <div className={"problemDefinition"}>
                <div >
                    <Typography variant={"h4"} gutterBottom margin={"dense"}>{problem.title}</Typography>
                </div>
                <div >
                    <Typography variant={"body1"} gutterBottom>{problem.description}</Typography>
                </div>
                <div>
                    <Typography variant={"overline"}>{"Examples:"}</Typography>
                </div>
                <div>
                    {examples &&
                        Object.values(examples).map((example, index) => {
                            const exp = Object.values(example)[0];
                            let input, output, explanation;
                            if (exp.input !== undefined) {
                                input = exp.input;
                            }
                            if (exp.output !== undefined) {
                                output = exp.output;
                            }
                            if (exp.explanation !== undefined) {
                                explanation = exp.explanation;
                            }
                            return (
                                <div key={index}>
                                    <Typography variant="button">Example {index + 1}</Typography>
                                    {input && (
                                        <div>
                                            <Typography variant="overline">Input: {input}</Typography>
                                        </div>
                                    )}
                                    {output && (
                                        <div>
                                            <Typography variant="overline">Output: {output}</Typography>
                                        </div>
                                    )}
                                    {explanation && (
                                        <div>
                                            <Typography variant="overline">Explanation: {explanation}</Typography>
                                        </div>
                                    )}
                                    <br />
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className={"codingArena"}>
                <div className={"solutionAccepted"}>
                    <Snackbar
                        
                        anchorOrigin={{ vertical, horizontal }}
                        open={solutionAccepted === 1 || solutionAccepted === 2} // Set open to true when conditions are met
                        onClose={handleClose}
                        key={vertical + horizontal}

                    >
                        {solutionAccepted === 1 ? (
                            <Alert severity="success">Solution Accepted!</Alert>
                        ) : (
                            <Alert severity="error">Solution Rejected!</Alert>
                        )}
                    </Snackbar>

                </div>
                <div>
                    <InputLabel margin={"dense"}>Language</InputLabel>
                    <Select
                        id="language"
                        value={language}
                        label="Language"
                        margin={"dense"}
                        autoWidth
                        onChange={(e) => {
                            setLanguage(e.target.value);
                        }}
                    >
                        <MenuItem value={1}>C++</MenuItem>
                        <MenuItem value={2}>Java</MenuItem>
                        <MenuItem value={3}>JavaScript</MenuItem>
                        <MenuItem value={4}>Python</MenuItem>
                        <MenuItem value={5}>Scala</MenuItem>
                        <MenuItem value={6}>GoLang</MenuItem>
                        <MenuItem value={7}>C</MenuItem>
                        <MenuItem value={8}>TypeScript</MenuItem>
                    </Select>
                </div>
                <div>
                    <TextField multiline placeholder={"Enter your solution"} margin={"dense"} fullWidth={true} onChange={(e) => { setSolution(e.target.value) }} />
                </div>
                <div>
                    <Button variant={"contained"} fullWidth onClick={onSubmit}
                    >Submit</Button>
                </div>
                <div></div>
            </div>
        </div>
    );
}
