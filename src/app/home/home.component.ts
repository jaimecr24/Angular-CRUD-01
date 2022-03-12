import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Persona, PersonaLista } from '../persona';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listaPersonas :PersonaLista = { total_items:0, items: [] }
  selectedPersona!: Persona;
  hideModal: boolean = true;
  searchText: string = '';

  constructor(private personaService :PersonaService) { }

  ngOnInit(): void {
    this.getPersonas();
  }

  getPersonas(): void {
    this.personaService.getPersonas()
      .subscribe(data => this.listaPersonas = data);
  }

  onSelect(persona: Persona): void {
    this.selectedPersona = persona;
    this.hideModal = false;
  }

  onCloseModal() {
    this.hideModal = true;
  }

  onChangeSearchText() {

  }
}

@Pipe({
  name: 'namePipe',
  pure: false
})
export class NamePipe implements PipeTransform {
  
  transform(items: Persona[], filter: string) :Persona[] {  
    if (!items || !filter) return items;
    return items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
  }
}
