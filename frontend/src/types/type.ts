import {SnackbarOrigin } from "@mui/material";

export interface State extends SnackbarOrigin {
    open: boolean;
}
export interface IExample {
    input: string;
    output: string;
    explanation?: string;
}
export type exampleArr = {
    examples: IExample[]
}

export interface IProblem {
    _id: string;
    title: string;
    description: string;
    examples?: string;
    acceptance?: string;
    difficulty?: string;
}
