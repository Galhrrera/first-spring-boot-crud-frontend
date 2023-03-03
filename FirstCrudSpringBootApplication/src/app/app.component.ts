import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {EstadosService} from './services/estados/estados.service';
import {PersonasService} from './services/personas/personas.service';
import {PaisesService} from './services/paises/paises.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'First CRUD App SpringBoot';

  constructor(
    public fb: FormBuilder;
  ){

  }

  ngOnInit(): void {
      
  }
}
