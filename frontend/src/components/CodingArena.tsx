import axios from 'axios';
import { useState } from 'react';
import { userEmailState } from "../recoil/selectors/userEmail";
import { useRecoilValue } from "recoil";
import { Alert,Snackbar, Button, InputLabel, MenuItem, Select, TextField,} from '@mui/material';
import { IProblem, State } from '../types/type';

const BASE_URL = import.meta.env.VITE_BASE_URL || 10000;

const CodingArena = ({ problem }:{problem:IProblem}) => {
  const userEmail = useRecoilValue(userEmailState);
  const [solutionAccepted, setSolutionAccepted] = useState(0);
  const [solution, setSolution] = useState("");
  const [language, setLanguage] = useState("1")
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
};

  async function onSubmit() {
    try {
      const acceptanceProbability = Math.random();
      if (acceptanceProbability > 0.5) {
        setSolutionAccepted(1);

        await axios.post(
          `${BASE_URL}/submissions/`,
          {
            "code": solution,
            "problemId": problem._id,
            "language": language,
            "userId": userEmail
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

  return (
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
  )
}

export default CodingArena