import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadosService } from './services/estados/estados.service';
import { PersonasService } from './services/personas/personas.service';
import { PaisesService } from './services/paises/paises.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  personasForm!: FormGroup;
  paises: any;
  estados: any;
  personas: any;

  constructor(
    public fb: FormBuilder,
    public paisesService: PaisesService,
    public personasService: PersonasService,
    public estadosService: EstadosService
  ) { }

  ngOnInit(): void {
    this.personasForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required]
    });;

    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp;
    },
      error => {
        console.error(error)
      })

    this.personasService.getAllPersonas().subscribe(resp => {
      this.personas = resp;
    },
      error => {
        console.error(error)
      })

    this.personasForm.get('pais')?.valueChanges.subscribe(value => {
      this.estadosService.getAllEstadosByPais(value).subscribe(resp => {
        this.estados = resp;
      },
        error => {
          console.error(error)
        })
    })
  }

  guardarPersona(): void {
    console.log(this.personasForm.value)
    this.personasService.savePersona(this.personasForm.value).subscribe(resp => {
      this.personasForm.reset();
      this.personas= this.personas.filter((persona: { id: any; })=> resp.id!=persona.id);
      this.personas.push(resp);
    },
      error => {
        console.error(error)
      })
  }


  eliminarPersona(persona:any){
    //console.log("EL ID ES: "+ persona.id)
    this.personasService.deletePersona(persona.id).subscribe(resp =>{
      console.log(resp)
      if (resp === true){
        this.personas.pop(persona)
      }
    })
  }


  editarPersona(persona:any){
    this.personasForm.setValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      edad: persona.edad,
      pais: persona.pais,
      estado: persona.estado
    })
  }
}
