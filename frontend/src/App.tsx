import Appbar from "./components/Appbar.tsx";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login"
import Signup from "./components/Signup.tsx";
import Landing from "./components/Landing.tsx";
import ProblemSet from "./components/ProblemSet.tsx";
import Problem from "./components/Problem.tsx";
import NotFoundPage from "./components/NotFoundPage.tsx";
import WIPPage from "./components/WIPPage.tsx";
import './App.css'
import { InitUser } from "./components/InitUser.tsx";
function App() {

    return (
        <>
            <Appbar/>
            <InitUser />
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/problemSet/all" element={<ProblemSet/>}/>
                <Route path="/problemSet/:problemId" element={<Problem/>}/>
                <Route path="/companyWiseQuestions" element={<WIPPage/>}/>
                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </>
    );
}

export default App;
