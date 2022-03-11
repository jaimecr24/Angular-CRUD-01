import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Persona } from '../persona';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() persona?: Persona;
  @Output() close = new EventEmitter();

  getDate = (d: Date): string => new Date(d.toString()).toLocaleString("en-CA").slice(0,10);
  formatDate = (e: any): Date => new Date(e.target.value);

  constructor() { }

  ngOnInit(): void {
  }

}
