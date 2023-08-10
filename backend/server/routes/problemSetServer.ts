import express from 'express';
const router = express.Router();
import { authenticateJwt } from './../../middleware/auth';
const {searchRecord,createRecord} = require('../../dbms/schema/ProblemSchema');
import { IProblem } from '../types';


router.get('/all', authenticateJwt, async (req, res) => {
    try{
        const problems = await searchRecord({});
        res.status(200).send({ 'problemSet': problems });
    }catch(error){
        console.log(error);
        res.status(500);
    }
});

router.get('/:problemId', authenticateJwt, async (req, res) => {
    const problemId = req.params.problemId;
    const problem: IProblem = await searchRecord({ _id: problemId });
    res.status(200).send(problem);
});

router.post('/addProblem', authenticateJwt, async (req, res) => {
    const newProblem: IProblem = req.body;
    await createRecord(newProblem);
    res.status(201).send({ 'msg': 'Problem added' });
});
export default router;