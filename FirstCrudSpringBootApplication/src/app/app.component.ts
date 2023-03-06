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

  constructor(
    public fb: FormBuilder,
    public paisesService: PaisesService,
    public personasService: PersonasService,
    public estadosService: EstadosService
  ) { }

  ngOnInit(): void {
    this.personasForm = this.fb.group({
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

    this.personasForm.get('pais')?.valueChanges.subscribe(value=>{
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
      this.personasForm.reset()
    },
      error => {
        console.error(error)
      })
  }
}
