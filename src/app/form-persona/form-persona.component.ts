import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PersonaService } from '../persona.service';
import { Persona } from '../persona';

@Component({
  selector: 'app-form-persona',
  templateUrl: './form-persona.component.html',
  styleUrls: ['./form-persona.component.css']
})
export class FormPersonaComponent implements OnInit {

  persona :Persona | undefined;
  title: String | undefined;
  disabled: boolean = true;
  url: String | undefined;

  getDate = (d: Date): string => new Date(d.toString()).toLocaleString("en-CA").slice(0,10);
  formatDate = (e: any): Date => new Date(e.target.value);

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private personaService: PersonaService) { }

  ngOnInit(): void {
    
    const routeParams = this.route.snapshot.paramMap;
    const personaId = routeParams.get('id');
    this.url = (this.route.snapshot.url[0]) ? this.route.snapshot.url[0].path : 'select';
    // Llamada a personaService para recuperar datos de la persona, si es update o delete.
 
    this.disabled = (this.url==='' || this.url==='delete');
    switch (this.url) {
      case 'add':
        this.title = 'Añadir persona';
        this.persona = {
          id_persona:"", usuario:"",
          password:"", name:"",
          surname:"", company_email:"",
          personal_email:"", city:"",
          active:false, created_date: new Date(),
          termination_date: new Date(),
          imagen_url: "", comments:""
        }
        break;
      case 'select': this.title = 'Detalle persona'; break;
      case 'update':
        this.title = 'Actualizar persona';
        this.personaService.getPersona(personaId!)
          .subscribe(data => this.persona = data)
        break;
      case 'delete':
        this.title = 'Borrar persona';
        this.personaService.getPersona(personaId!)
          .subscribe(data => this.persona = data)
        break;
      default: this.title = '';
    }
  }
  
  handleSubmit(): void {
    if (this.url=='add') {
      this.personaService.addPersona(this.persona!).
        subscribe(data => {
          this.persona!.id_persona = data.id_persona;
          alert("Persona añadida con id: "+data.id_persona);
          this.goBack();
        });
    }
    else {
      this.personaService.updatePersona(this.persona!.id_persona, this.persona!)
        .subscribe(data => {
          alert("Persona modificada");
          this.goBack();
        });
    }
  }

  handleDelete(): void {
    if (confirm("¿Borrar persona con id: "+this.persona?.id_persona+"?")) {
      this.personaService.deletePersona(this.persona!.id_persona)
        .subscribe(data => {
          alert("Persona borrada");
          this.goBack();
        });
    }
  }

  goBack(): void {
    this.location.back();
  }

}
