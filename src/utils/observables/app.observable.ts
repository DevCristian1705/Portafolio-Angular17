import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUser } from "../interface/user.interface";
 
@Injectable({
    providedIn: 'root'
})

export class AppObservable {

    user! : IUser; 
    listUser! : IUser[];

    private profile = new BehaviorSubject<IUser>(this.user);
    public profile$ = this.profile.asObservable();

    private listUsers = new BehaviorSubject<IUser[]>(this.listUser);
    public listUsers$ = this.listUsers.asObservable();
 
    constructor() { }
 
    getProfile(): any {
        return this.profile.getValue();
    }

    setProfile(user : IUser) {
        this.profile.next(user);
    }


    getListUser(): any {
        return this.listUsers.getValue();
    }

    setListUser(users : IUser[]) {
        this.listUsers.next(users);
    }


}
