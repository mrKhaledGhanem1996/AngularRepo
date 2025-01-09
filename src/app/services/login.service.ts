import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject, tap  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:5122/api/login';

  // Observable لمشاركة بيانات المستخدم
  private userSubject = new BehaviorSubject<string | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(this.apiUrl, loginData).pipe(
      tap((response) => {
        this.setUser(response.username); // تعيين اسم المستخدم
        console.log(response.username);
      })
    );
  }
  

  setUser(username: string): void {
    this.userSubject.next(username); // تحديث اسم المستخدم
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null); // إعادة اسم المستخدم إلى null
  }
}
