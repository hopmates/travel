import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BookingFormComponent } from '../booking-form/booking-form.component';

export interface City
{
  name: string;
  x: number; // X position as percentage
  y: number; // Y position as percentage
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, BookingFormComponent],
  template: `
      <div class="app-layout">
          <div class="map-section">
            <h2>Select Your Destination</h2>
            
            <div class="map-wrapper">
              <img 
                src="assets/nz-map.png" 
                alt="New Zealand Map" 
                class="map-image"
                (click)="onMapClick($event)">
              
              <button 
              *ngFor="let city of cities" 
              class="city-button"
              [class.selected-city]="isSelectedCity(city.name)"
              [style.left.%]="city.x"
              [style.top.%]="city.y"
              mat-raised-button
              [color]="isSelectedCity(city.name) ? 'warn' : 'primary'"
              (click)="toggleCity(city.name)"
              [attr.aria-label]="'Select ' + city.name">
              {{ city.name }}
            </button>
            </div>
            
            <!-- Debug info -->
            <div class="debug-info" *ngIf="debugMode()">
              <h3>🔧 Debug Mode - Click on city locations on the map</h3>
              <div *ngIf="lastClickX() > 0 || lastClickY() > 0">
                <p><strong>Last clicked coordinates:</strong></p>
                <p>X: {{ lastClickX() }}%, Y: {{ lastClickY() }}%</p>
                <p><strong>Copy this line for your cities array:</strong></p>
                <code>{{ getCityCodeString() }}</code>
              </div>
              <div *ngIf="lastClickX() === 0 && lastClickY() === 0">
                <p><em>Click anywhere on the map to get coordinates...</em></p>
              </div>
              <button mat-raised-button color="warn" (click)="toggleDebugMode()">Exit Debug Mode</button>
            </div>
            
            <div class="debug-controls" *ngIf="!debugMode()">
              <button mat-raised-button color="primary" (click)="toggleDebugMode()">🔧 Enable Debug Mode</button>
            </div>
          </div>
          
          <div class="booking-section" *ngIf="selectedCities().length > 0">
                          <app-booking-form 
              *ngFor="let cityName of selectedCities()"
              [cityName]="cityName"
                              (close)="closeForm(cityName)">
              </app-booking-form>
            </div>
        </div>
    `,
  styles: [`
      .app-layout {
      display: flex;
      gap: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      padding: 1rem;
      min-height: 100vh;
    }
    
    .map-section {
      flex: 1;
      min-width: 0;
    }
    
    .booking-section {
      flex: 0 0 600px;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
    }
    
    .map-wrapper {
      position: relative;
      display: block;
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .map-image {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .city-button {
      position: absolute;
      transform: translate(-50%, -50%);
      font-size: 0.75rem;
      padding: 0.4rem 0.8rem;
      min-width: auto;
      white-space: nowrap;
      z-index: 10;
      transition: all 0.3s ease;
      border-radius: 16px;
      font-weight: 500;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    .city-button.selected-city {
      background-color: #f44336 !important;
      color: white !important;
      box-shadow: 0 4px 12px rgba(244, 67, 54, 0.5);
      transform: translate(-50%, -50%) scale(1.15);
      border: 2px solid #d32f2f;
    }
    
    .city-button:hover {
      transform: translate(-50%, -50%) scale(1.05);
      box-shadow: 0 3px 6px rgba(0,0,0,0.3);
    }
    
    .city-button.selected-city:hover {
      transform: translate(-50%, -50%) scale(1.2);
    }
    
    @media (max-width: 1200px) {
      .app-layout {
        flex-direction: column;
      }
      
      .booking-section {
        flex: none;
        max-width: none;
      }
    }
    
    @media (max-width: 768px) {
      .city-button {
        font-size: 0.7rem;
        padding: 0.3rem 0.6rem;
      }
      
      .app-layout {
        gap: 1rem;
        padding: 0.5rem;
      }
    }
    
    @media (max-width: 480px) {
      .city-button {
        font-size: 0.6rem;
        padding: 0.2rem 0.4rem;
      }
    }
    
    .debug-info {
      margin-top: 1rem;
      padding: 1rem;
      background-color: #e3f2fd;
      border-radius: 8px;
      border: 2px solid #2196f3;
      box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);
    }
    
    .debug-info h3 {
      margin: 0 0 0.5rem 0;
      color: #1976d2;
    }
    
    .debug-info code {
      background-color: #fff;
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #ddd;
      display: block;
      margin-top: 0.5rem;
      font-family: 'Courier New', monospace;
      word-break: break-all;
    }
    
    .debug-controls {
      margin-top: 1rem;
      text-align: center;
    }
  `]
})
export class MapComponent
{
  selectedCities = signal<string[]>([]);
  debugMode = signal<boolean>(false);
  selectedCity = signal<string | null>(null);
  showForm = signal<boolean>(false);
  lastClickX = signal<number>(0);
  lastClickY = signal<number>(0);

  cities: City[] = [
    // North Island - Northland
    { name: 'Whangarei', x: 71.5, y: 9.6 },

    // North Island - Auckland Region
    { name: 'Auckland', x: 43.8, y: 20.3 },

    // North Island - Waikato/Bay of Plenty
    { name: 'Hamilton', x: 44.9, y: 25.9 },
    { name: 'Tauranga', x: 77.5, y: 18.4 },
    { name: 'Rotorua', x: 80.5, y: 22.9 },

    // North Island - Central
    { name: 'Taupo', x: 49.5, y: 30.2 },
    { name: 'New Plymouth', x: 37.6, y: 34.1 },
    { name: 'Gisborne', x: 87.6, y: 34.1 },
    { name: 'Napier', x: 79.1, y: 39.2 },
    { name: 'Hastings', x: 78.5, y: 43.4 },

    // North Island - Lower
    { name: 'Wanganui', x: 43.4, y: 40.1 },
    { name: 'Palmerston North', x: 78, y: 47.5 },
    { name: 'Wellington', x: 74, y: 53.4 },

    // South Island - Marlborough/Tasman
    { name: 'Nelson', x: 33.9, y: 44.2 },
    { name: 'Blenheim', x: 56.6, y: 60 },
    { name: 'Westport', x: 24.4, y: 50.9 },

    // South Island - Canterbury/West Coast
    { name: 'Greymouth', x: 25.4, y: 56.7 },
    { name: 'Christchurch', x: 56.9, y: 66.4 },
    { name: 'Timaru', x: 44.1, y: 74.3 },

    // South Island - Otago/Southland
    { name: 'Queenstown', x: 20.6, y: 64.3 },
    { name: 'Dunedin', x: 41.5, y: 82.6 },
    { name: 'Invercargill', x: 29.1, y: 90.7 },

    // Stewart Island
    { name: 'Stewart Island', x: 17.5, y: 95.1 }
  ];

  isSelectedCity(cityName: string): boolean
  {
    return this.selectedCities().includes(cityName);
  }

  toggleCity(cityName: string)
  {
    this.selectedCities.update(cities =>
    {
      if (cities.includes(cityName))
      {
        // Remove city if already selected (toggle off)
        return cities.filter(city => city !== cityName);
      } else
      {
        // Add city if not selected (toggle on)
        return [...cities, cityName];
      }
    });
  }

  closeForm(cityName: string)
  {
    this.selectedCities.update(cities => cities.filter(city => city !== cityName));
  }

  onMapClick(event: MouseEvent)
  {
    if (this.debugMode())
    {
      const target = event.target as HTMLImageElement;
      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      // Round to 1 decimal place for cleaner coordinates
      const roundedX = Math.round(x * 10) / 10;
      const roundedY = Math.round(y * 10) / 10;

      this.lastClickX.set(roundedX);
      this.lastClickY.set(roundedY);

      console.log(`Clicked at X: ${roundedX}%, Y: ${roundedY}%`);
      console.log(`Copy this: { name: 'CityName', x: ${roundedX}, y: ${roundedY} }`);
    }
  }

  toggleDebugMode()
  {
    this.debugMode.update(mode => !mode);
  }

  getCityCodeString(): string
  {
    return `{ name: 'CityName', x: ${this.lastClickX()}, y: ${this.lastClickY()} }`;
  }
} 