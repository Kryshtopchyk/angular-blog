import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbAuthRes, User} from '../Interfaces/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expiresDate = new Date(localStorage.getItem('fb-token-expires'));
    if (new Date() > expiresDate) {
      this.logout();
      return null;
    } else {
      return localStorage.getItem('fb-token');
    }
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      user
    ).pipe(
      tap(this.setToken),
      catchError(this.handleError.bind(this))
    );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('email не верный');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('password не верный');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('email не верный');
        break;
    }
    return throwError(error);
  }

  private setToken(res: FbAuthRes | null) {
    if (res) {
      const expiresDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
      localStorage.setItem('fb-token', res.idToken);
      localStorage.setItem('fb-token-expires', expiresDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
