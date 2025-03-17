import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private items: Array<string> = ["Easy", "Medium", "Difficult"];

  constructor(private http:HttpClient) { }
  getItems(){
    return this.items;
  }
  getQuestions():Observable<any> {
    return this.http.get('/assets/questions.json');
  }

}
