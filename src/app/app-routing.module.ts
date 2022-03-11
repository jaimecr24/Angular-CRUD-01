import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPersonaComponent } from './form-persona/form-persona.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: FormPersonaComponent },
  { path: 'update/:id', component: FormPersonaComponent },
  { path: 'delete/:id', component: FormPersonaComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
