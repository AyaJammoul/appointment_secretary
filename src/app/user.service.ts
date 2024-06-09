import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost/test1/src/index.php';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getTodayAppointments(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?today=true`);
  }

  addUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user).pipe(
      catchError(this.handleError)
    );
  }

  updateUserStatus(id: number, status: string): Observable<any> {
    return this.http.put(this.apiUrl, { id, status }).pipe(
      catchError(this.handleError)
    );
  }

  checkTimeAvailability(date: string, time: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?checkTime=true&date=${date}&time=${time}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
