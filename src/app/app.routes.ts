import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { FrecQuestions } from './pages/frec-questions/frec-questions';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { PlaceDetails } from './pages/place-details/place-details';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'frec-questions', component: FrecQuestions },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'place-details', component: PlaceDetails },
    { path: '**', redirectTo: 'home' }
    
];
