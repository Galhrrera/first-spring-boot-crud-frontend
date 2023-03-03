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
      estado: ['', Validators.required]
    });
  }

  guardarPersona(): void {

  }
}
