import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, InputLabel, MenuItem, Select, TextField, Typography, Snackbar } from "@mui/material";
import '../assets/static/Problem.css'
import {IProblem, State, exampleArr} from '../types/type';

/**
 * 
 * Sample response of /problemset/id->[
    {
        "_id": "64bff4d02e0034b5e491263e",
        "title": "Product of Array Except Self",
        "description": "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.\nYou must write an algorithm that runs in O(n) time and without using the division operation.",
        "examples": "[{\"example1\":{\"input\":\"nums = [1,2,3,4]\",\"output\":\"[24,12,8,6]\"}},{\"example2\":{\"input\":\"nums = [1,2,3,4]\",\"output\":\"[24,12,8,6]\"}}]",
        "acceptance": "65.1%",
        "difficulty": "Medium",
        "__v": 0
    }
]
 */
export default function Problem() {
    const initialProblemState: IProblem = {
        // Initialize with default values as needed
        _id:"",
        title: "",
        description: "",
        examples: "", // Initialize examples with an empty array
        acceptance: "",
        difficulty: "",
    };

    const { problemId } = useParams();
    const [problem, setProblem] = useState<IProblem>(initialProblemState);
    const [language, setLanguage] = useState("1")
    const [solution, setSolution] = useState("")
    const [solutionAccepted, setSolutionAccepted] = useState(0);
    const [state, setState] = useState<State>({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;
    useEffect(() => {
        axios
            .get("http://localhost:3000/problemset/" + problemId, {
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setProblem(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    let examples: exampleArr = { examples: [] };
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

    if (Object.keys(problem).length > 0 && problem.examples) {
        examples = JSON.parse(problem.examples);
    }
    

    return (
        <div className={"bodyProblem"}>

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
                        Object.values(examples).map((exp, index) => {
                            const example = Object.values(exp)[0];
                            let input, output, explanation;
                            
                                input = example?.input;
                            
                            
                                output = example?.output;
                            
                            
                                explanation = example?.explanation;
                            
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
                        <MenuItem value={"1"}>C++</MenuItem>
                        <MenuItem value={"2"}>Java</MenuItem>
                        <MenuItem value={"3"}>JavaScript</MenuItem>
                        <MenuItem value={"4"}>Python</MenuItem>
                        <MenuItem value={"5"}>Scala</MenuItem>
                        <MenuItem value={"6"}>GoLang</MenuItem>
                        <MenuItem value={"7"}>C</MenuItem>
                        <MenuItem value={"8"}>TypeScript</MenuItem>
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