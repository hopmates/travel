import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <header>
        <h1>🌍 Travel Booking</h1>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    header {
      background: #3f51b5;
      color: white;
      padding: 1rem;
      text-align: center;
    }
    
    header h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    
    main {
      flex: 1;
      padding: 1rem;
    }
  `]
})
export class AppComponent
{
  title = 'Travel Booking App';
} 