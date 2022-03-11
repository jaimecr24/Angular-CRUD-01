
export interface Persona {
    id_persona: string;
    usuario: string;
    password: string;
    name: string;
    surname: string;
    company_email: string;
    personal_email: string;
    city: string;
    imagen_url: string;
    active: Boolean;
    comments: string;
    created_date: Date;
    termination_date: Date;
  }

export interface PersonaLista {
  total_items: number;
  items: Persona[];
}