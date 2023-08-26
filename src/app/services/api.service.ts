import { Injectable, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  private id = new BehaviorSubject<string>('');

  listAll = new BehaviorSubject<[]>([]) ;
  length=0

  foo = signal(10)
  obtener = computed(()=> this.foo())
  // effect_foo = effect(()=> { console.log(`The value of "${this.foo()}" has changed`);  this.foo.set(this.foo()) } );
  arrayPeoples:WritableSignal<{
    id: number,
    name: string,
    lastname: string,
    phone: string
  }[]> = signal([])
  getArrayPeoples_computed = computed(()=> this.arrayPeoples())

  constructor( private http: HttpClient ) { 
  }

  setID(url:string|any){
    this.id.next(url);
  }

  getID(){
     return this.id.asObservable()
   }

  public getPeoples(): Observable<any> {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/users')
  }
  
  public getPeople(id:number): Observable<any> {
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/users/${id}`)
  }
  
  public sendPeople(formData:any): Observable<any> {
    return this.http.post<any>('https://jsonplaceholder.typicode.com/users', formData)
  }
  
  public UpdatePeople(IDselectedPeople:number, formData:any): Observable<any> {
    return this.http.put<any>(`https://jsonplaceholder.typicode.com/users/${IDselectedPeople}`, formData)
  }
  
  public deletePeople(IDselectedPeople:number): Observable<any> {
    return this.http.delete<any>(`https://jsonplaceholder.typicode.com/users/${IDselectedPeople}`)
  }

  setlistAll(peoples:any){
    this.listAll.next(peoples);
  }

  getlistAll(){
    return this.listAll.asObservable()
  }

}
