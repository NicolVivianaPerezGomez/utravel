import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { FrecQuestions } from './pages/frec-questions/frec-questions';
import { LoginComponent } from './pages/login/login';
import { Register } from './pages/register/register';
import { PlaceDetails } from './pages/place-details/place-details';
import { Lugares } from './pages/lugares/lugares';
import { Nosotros } from './pages/nosotros/nosotros';
import { RutasturisticasList } from './pages/rutasturisticas/rutasturisticas';
import { RutastturisticasCrear } from './pages/rutasturisticas/rutasturisticas-crear';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'frec-questions', component: FrecQuestions },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: Register },
    { path: 'place-details', component: PlaceDetails },
    { path: 'lugares', component: Lugares},
    { path: 'nosotros', component: Nosotros },
    { path: 'rutasturisticas', component: RutasturisticasList },
    { path: 'rutasturisticas/crear', component: RutastturisticasCrear },
    { path: '**', redirectTo: 'home' }
];
