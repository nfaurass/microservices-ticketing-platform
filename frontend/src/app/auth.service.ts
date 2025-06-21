import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface UserProfile {
  name: string;
  email: string;
  userId: string;
  type: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api/auth';

  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);
  userProfile$ = this.userProfileSubject.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  login(email: string, password: string, type: string): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/login`, {email, password, type}).pipe(
      tap((res: any) => {
        if (res.accessToken) {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('userId', res.userId);
        }
      })
    );
  }

  register(email: string, password: string, name: string, type: string): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/register`, {email, password, name, type}).pipe(
      tap((res: any) => {
        if (res.accessToken) {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('userId', res.userId);
        }
      })
    );
  }

  profile(): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(`${this.API_URL}/profile`, {
      headers: {Authorization: `Bearer ${this.getAccessToken()}`}
    }).pipe(
      tap(profile => this.userProfileSubject.next(profile))
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  getUserType(): string | null {
    return this.userProfileSubject.value?.type ?? null;
  }

}
