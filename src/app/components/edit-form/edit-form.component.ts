import { Component, EventEmitter, Output, effect } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import swal from'sweetalert2';
import { ApiService } from 'src/app/services/api.service';
import { JsonPipe } from '@angular/common';

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
          // localStorage.setItem("dbPerson",JSON.stringify(resp) )
          swal.fire('Actualizacion exitosa','', 'success'); 

      }, (error) => {
        swal.fire('Error','No se encuentra el id en la ip publica', 'error');
        console.log(error.message);
      }
      );
   }
  
  }

  ngOnInit() { 
  
    this.apiService.getID().subscribe((value: any) => {

      this.selectedPeople = value; 
      
      //Visualizacion local de la lista de personas
      this.apiService.arrayPeoples().forEach(element => {
        let i = 0

        if( element.id == this.selectedPeople ){

          this.editForm = new FormGroup({
            name: new FormControl( element.name),
            lastname: new FormControl(element.lastname),
            phone: new FormControl(element.phone)
          });

        }
        
      });

  });
    
  }

}
