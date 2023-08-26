import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent {

  form = new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    phone: new FormControl('')
  });
  
  @Output() pushToList: EventEmitter<string> = new EventEmitter();

  constructor(private apiService: ApiService) { 
  }

  onSubmit() {

    if(this.form.value){

      this.apiService.sendPeople(this.form.value).subscribe((resp:any) => {
  
        this.pushToList.emit( JSON.stringify(resp) );
        Swal.fire('Registro exitoso','', 'success'); 
        this.form = new FormGroup({
          name: new FormControl(''),
          lastname: new FormControl(''),
          phone: new FormControl('')
        });

      }, (error) => {
        Swal.fire('Error','', 'error');
        console.log(error.message);
      }
      );
   }

  }

}
