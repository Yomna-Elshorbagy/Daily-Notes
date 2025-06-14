import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { NotesComponent } from './pages/notes/notes.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { userdataGuard } from '../../gurd/userdata.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, title: 'Sign up page' },
  { path: 'signin', component: SigninComponent, title: 'Sign in page' },
  {
    path: 'notes',
    canActivate: [userdataGuard],
    component: NotesComponent,
    title: 'Notes page',
  },
  { path: '**', component: NotfoundComponent, title: 'Not found Path' },
];
