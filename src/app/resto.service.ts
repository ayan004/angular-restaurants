import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RestoService {

  saveRe() {
    throw new Error('Method not implemented.');
  }

  url = "http://localhost:3000/restaurants";

  constructor(private http: HttpClient) { }

  getList(){
    return this.http.get(this.url);
  }

  getById(id : any){
    return this.http.get(`${this.url}/${id}`);
  }

  saveResto(data: any){
    return this.http.post(this.url, data);
  }

  deleteItem(id: any){
    // console.log(id);
    return this.http.delete(`${this.url}/${id}`);
  }

  getCurrentResto(id: any){
    return this.http.get(`${this.url}/${id}`);
  }

  updateResto(id: any, data: any){
    return this.http.put(`${this.url}/${id}`, data);
  }

}


