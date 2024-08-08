import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent {

  resultado=''

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}') ])
  });
  
  @Output() pushToList: EventEmitter<string> = new EventEmitter();

  constructor(private apiService: ApiService, private formBuilder : FormBuilder ) { 
  }

  onSubmit() {

    if (this.form.valid)
      this.resultado = "Todos los datos son válidos";
    else
      this.resultado = "Hay datos inválidos en el formulario";

    if(this.form.valid){

      const datos = {
        name: this.form.value.name,
        lastname:  this.form.value.lastname,
        phone: this.form.value.phone,
      }

      // Reinicia el formulario después del envío
      this.apiService.sendPeople(datos)
      .subscribe(
        (resp:any) => {

            this.resultado="";
            this.form.reset(); 
  
            this.pushToList.emit( JSON.stringify(resp) );
            Swal.fire('Registro exitoso','', 'success'); 

      }, (error) => {
        //Error en el envío
        Swal.fire('Error','', 'error');
        console.log(error.message);
      }
      );
   }else{
     // Formulario inválido
   }
      
  }

}