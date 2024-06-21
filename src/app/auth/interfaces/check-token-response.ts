import { User } from "./user-interface";

export interface CheckTokenResposner { 
    user : User;
    token : string;
}