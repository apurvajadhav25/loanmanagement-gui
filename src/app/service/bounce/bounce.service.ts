import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BounceService {

  constructor(private http: HttpClient) { }

  getBounces(): Observable<any> {
    return this.http.get('http://localhost:8080/bounces')
  }

  getBounceById(id: number){
    return this.http.get('http://localhost:8080/bounces/'+id)
  }

  deleteBounce(data: any) {
    return this.http.delete('http://localhost:8080/bounces'+'/'+data.id);
  }

  createBounce(data: any) {
    console.log(data)
    return this.http.post('http://localhost:8080/bounces', data,{
      params: {
        "accountNumber": data.accountNumber
      }
    });
  }

  editBounce(data: any) {
    console.log(data.accountNumber)
    return this.http.put('http://localhost:8080/bounces'+'/'+data.id, data, {
      params: {
        "accountNumber": data.accountNumber
      }
    });
  }
}
