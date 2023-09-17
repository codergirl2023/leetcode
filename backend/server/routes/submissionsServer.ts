import { authenticateJwt } from './../../middleware/auth';
import express from 'express';
const router = express.Router();
const {searchRecord,createRecord} = require('../../dbms/schema/SubmissionsSchema');
const Users = require('../../dbms/schema/UserSchema');

import { ISubmission } from '../types';


//get all submissions of a particular user
router.get('/users/:userId/all', authenticateJwt, async (req, res) => {
    const userId = req.params.userId;
    const allSubmissionsOfReqUser:ISubmission[] = await searchRecord({ userId });
    const submissionsWithSpecificFields = allSubmissionsOfReqUser.map((submission:ISubmission)=>{
        return {
            "Language":submission.language,
            "Code":submission.code,
            "Problem Id":submission.problemId

        }
    })
    res.status(200).send(submissionsWithSpecificFields);
});

//get all submissions on a particular problem
router.get('/problems/:problemId/all', authenticateJwt, async (req, res) => {
    const problemId = req.params.problemId;
    const allSubmissionsOfReqUser = await searchRecord({ problemId });
    const submissionsWithSpecificFields = allSubmissionsOfReqUser.map((submission:ISubmission)=>{
        return {
            "Language":submission.language,
            "Code":submission.code,
            "User Id":submission.userId
        }
    })
    res.status(200).send(submissionsWithSpecificFields);
});
router.post('/',authenticateJwt,async (req, res)=>{
    const userQuery = searchRecord(Users, { email: req.body.userId }).select("_id");  //getting the user id from user email provided in request body
    const user = await userQuery.exec();
    const problemId = req.params.problemId;
    const problem = await searchRecord({ problemId });
    req.body.userId = user[0];
    req.body.problemId = problem[0]
    await createRecord(req.body)
    res.status(200).send({"msg":"Submitted successfully!"});
})

export default router;