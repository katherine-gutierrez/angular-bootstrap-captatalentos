import { Component, Input, computed } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-see-form',
  templateUrl: './see-form.component.html',
  styleUrls: ['./see-form.component.css']
})
export class SeeFormComponent {

  people  =  {
    id: 0,
    name: '',
    lastname: '',
    phone: ''
  }
  selectedPeople=0

  seeForm = new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    phone: new FormControl('')
  });

  constructor(private apiService: ApiService) { 
  }

  
  ngOnInit() { 
  
    this.apiService.getID().subscribe((value: any) => {

      this.selectedPeople = value; 
      
      //Visualizacion local de la lista de personas
      this.apiService.arrayPeoples().forEach(element => {
        let i = 0

        if( element.id == this.selectedPeople ){

          this.seeForm = new FormGroup({
            name: new FormControl( element.name),
            lastname: new FormControl(element.lastname),
            phone: new FormControl(element.phone)
          });

        }
        
      });

  });
    
  }


  /*
  subscripcion al observable de api update. Script comentado porque la api no realiza la actualizacion
  */
/*   ngOnInit() { 
  
    this.apiService.getID().subscribe((value: any) => {

      this.selectedPeople = value; 
      console.log( "this.selectedPeople" , this.selectedPeople )

      if(this.selectedPeople && this.selectedPeople<=10 ){

        console.log( this.apiService.arrayPeoples() , 'get')

        this.apiService.getPeople(this.selectedPeople).subscribe((data:any) => {
          
          const element = data;
  
          let array: string[] = element.name.split(' ')
  
            this.people =  {
              id: element.id,
              name: array[0],
              lastname: array[1],
              phone: element.phone
            }

            this.seeForm = new FormGroup({
              name: new FormControl( this.people.name),
              lastname: new FormControl( this.people.lastname),
              phone: new FormControl( this.people.phone)
            });
     
      });

    }else if(this.selectedPeople && this.selectedPeople>10){
      this.apiService.arrayPeoples().forEach(element => {
        let i = 0

        if( element.id == this.selectedPeople ){

          this.seeForm = new FormGroup({
            name: new FormControl( element.name),
            lastname: new FormControl(element.lastname),
            phone: new FormControl(element.phone)
          });

          
        }
        
      });

    }

  });
    
  } */

}//
