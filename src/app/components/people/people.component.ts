import { Component, signal } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {

  peoples: {
    id: number,
    name: string,
    lastname: string,
    phone: string
  }[] = []
  peoplesInicio: any[] = []
  selectedPeople: number = 0;

  constructor(private apiService: ApiService) { 

  }
   
  getID(id:number){
    this.selectedPeople = id;
    this.apiService.setID(id);
  }

  delete(){
    const index = this.peoplesInicio.findIndex((v) => v.id === this.selectedPeople);

    this.apiService.deletePeople(this.selectedPeople).subscribe((data:any) => {

      this.peoples = this.peoples.filter((item) => item.id !== this.selectedPeople)
    });
  }

  //se agrega el nuevo elemento a la lista
  valueResponse(respuesta: any) {
    let newPeople = JSON.parse(respuesta)
    newPeople.id= this.peoples.length + 1
    // this.peoples.push(newPeople) 

    this.apiService.arrayPeoples.mutate(list => list.push(newPeople));
   }

  valueResponseUpdate(respuesta: any) {
    let upPeople = JSON.parse(respuesta)

    //Encuentra el índice del elemento del Array actualizado en el modal
    const index = this.peoplesInicio.findIndex((v) => v.id === upPeople.id);

    //Actualiza el elemento en la lista
    this.peoples.forEach(listOriginal => {
        if(listOriginal.id == upPeople.id){
          this.peoples[index] = upPeople
        }
    });
   }

  ngOnInit() {
    
    this.apiService.getPeoples().subscribe((data:any) => {

      for (let i = 0; i < data.length; i++) {

        const element = data[i];

        let array: string[] = element.name.split(' ')

          data.name = array[0]
          data.lastname = array[1]

          let obj = {
            id: element.id,
            name: array[0],
            lastname: array[1],
            phone: element.phone
          }

          this.peoples.push( obj)
          this.peoplesInicio.push( obj)
          
        }

        this.apiService.arrayPeoples.set( this.peoples );
    });

  }

}