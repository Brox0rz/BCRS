import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) {}
  // findById API call
  findUserById(userId: number) {
    return this.http.get(`/api/users/${userId}`);
  }

  // Signin API call
  signIn(email: string, password: string) {
    return this.http.post('/api/security/signin', {
      email: email, password: password
    });
  }
  
  //Register API call
  register(user: any): Observable<any> {
    return this.http.post('/api/security/register', user);
  }

}