import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  login(username: string, password: string) {
    console.log(username, password);
  }
}
