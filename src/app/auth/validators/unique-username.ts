import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  AsyncValidator, FormControl, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({providedIn: 'root'})
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService) {}
    validate= (control: FormControl): any => {

        const {value}= control;

        return this.authService.userNameAvailable(value).pipe(
            map(()=> {return null}),
            catchError((err)=> {
                return of({nonUniqueUsername: true})
            })
        ).subscribe((value)=> {

        })
    }
}
