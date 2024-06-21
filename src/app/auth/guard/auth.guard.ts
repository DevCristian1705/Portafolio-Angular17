import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { AuthStatus } from "../interfaces";
import { inject } from "@angular/core";

export const IsAuthGuard : CanActivateFn = (route, state) => {

    const authService = inject(AuthService);
    const router = inject(Router)


    if(authService.authStatus() === AuthStatus.authenticated){
        return true;
    }
  
    router.navigateByUrl('/auth/login')
    return false;
    
}