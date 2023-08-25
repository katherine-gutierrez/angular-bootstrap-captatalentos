import { Component, Input } from '@angular/core';
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

      if(this.selectedPeople){

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

    }

  });
    
  }

}
