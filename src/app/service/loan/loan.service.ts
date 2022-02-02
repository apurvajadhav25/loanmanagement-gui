import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  getLoan(): Observable<any> {
    return this.http.get('http://localhost:8080/loan')
  }

  getLoanById(id: number){
    return this.http.get('http://localhost:8080/loan/'+id)
  }

  deleteLoan(data: any) {
    return this.http.delete('http://localhost:8080/loan'+'/'+data.id);
  }

  createLoan(data: any) {
    return this.http.post('http://localhost:8080/loan', data, {responseType: 'arraybuffer'});
  }

  editLoan(data: any) {
    console.log(data)
    return this.http.put('http://localhost:8080/loan'+'/'+data.id, data);
  }
}
