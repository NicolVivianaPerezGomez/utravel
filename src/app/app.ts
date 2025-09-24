import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Footer } from './component/footer/footer';
import { Header } from './component/header/header';
import { CommonModule } from '@angular/common';
import { AccecibilityControls } from './component/accecibility-controls/accecibility-controls';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Footer,
    Header,
    AccecibilityControls,
    HttpClientModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('utravel');
}
