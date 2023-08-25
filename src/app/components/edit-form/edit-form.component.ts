import { Component, EventEmitter, Output, effect } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import swal from'sweetalert2';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent {

  people  =  {
    id: 0,
    name: '',
    lastname: '',
    phone: ''
  }

  selectedPeople:any

  editForm : FormGroup;

  @Output() updateToList: EventEmitter<string> = new EventEmitter();

  constructor(private apiService: ApiService) { 

    this.editForm = new FormGroup({
      name: new FormControl(''),
      lastname: new FormControl(''),
      phone: new FormControl('')
    });

  }

  onSubmit() {
  
    if(this.editForm.value){

      this.apiService.UpdatePeople(this.selectedPeople, this.editForm.value).subscribe((resp:any) => {
          this.updateToList.emit( JSON.stringify(resp) );
          swal.fire('Actualizacion exitosa','', 'success'); 

      }, (error) => {
        swal.fire('Error','No se encuentra el id en la ip publica', 'error');
        console.log(error.message);
      }
      );
   }
  
  }

  ngOnInit() {

    this.apiService.getPeoples().subscribe((data:any) => data.length );

    this.apiService.getID().subscribe((value: any) => {
      this.selectedPeople = value; 

      if(this.selectedPeople && this.apiService.obtener() == 10 ){

        this.apiService.getPeople(this.selectedPeople).subscribe((data:any) => {

          const element = data;
  
          let array: string[] = element.name.split(' ')
  
            this.people =  {
              id: element.id,
              name: array[0],
              lastname: array[1],
              phone: element.phone
            }

            this.editForm = new FormGroup({
              name: new FormControl( this.people.name),
              lastname: new FormControl( this.people.lastname),
              phone: new FormControl( this.people.phone)
            });
     
      }, (error) => {
        console.log(error.message);
      });

    }
  });
    
  }
/*  ngOnInit() {
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

            this.editForm = new FormGroup({
              name: new FormControl( this.people.name),
              lastname: new FormControl( this.people.lastname),
              phone: new FormControl( this.people.phone)
            });
     
      });

    }

  });
    
  } */

}
