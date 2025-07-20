import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BookingDataService, BookingOption } from '../services/booking-data.service';

export interface SelectedItem
{
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: 'hotels' | 'activities' | 'vehicles';
}

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <mat-card class="booking-form">
      <mat-card-header>
        <mat-card-title>{{ cityName }}</mat-card-title>
        <button mat-icon-button (click)="onClose()" class="close-button">
          <mat-icon>close</mat-icon>
        </button>
      </mat-card-header>
      
      <mat-card-content>
        <!-- Hotels Section -->
        <div class="booking-section">
          <div class="section-header" [class.active-section]="hasItems('hotels')">
            <button mat-icon-button (click)="addItem('hotels')" [color]="hasItems('hotels') ? 'warn' : 'primary'">
              <mat-icon>add</mat-icon>
            </button>
            <button mat-icon-button (click)="removeLastItem('hotels')" [disabled]="!hasItems('hotels')" [color]="hasItems('hotels') ? 'warn' : 'primary'">
              <mat-icon>remove</mat-icon>
            </button>
            <span class="section-label">Hotels</span>
            <!-- <mat-icon class="dropdown-icon">expand_more</mat-icon> -->
          </div>
          
          <!-- Always show at least one dropdown -->
          <div *ngIf="!hasItems('hotels')" class="item-row">
            <mat-select placeholder="Select a hotel" (selectionChange)="selectAndAddItem('hotels', $event.value)" class="item-select">
              <mat-option value="">Select a hotel</mat-option>
              <mat-option *ngFor="let option of availableHotels()" [value]="option.id">
                {{ option.name }} - {{ formatPrice(option.price) }}
              </mat-option>
            </mat-select>
          </div>
          
          <div *ngFor="let item of getItemsByCategory('hotels'); trackBy: trackByFn" class="item-row">
            <mat-select [(value)]="item.id" (selectionChange)="updateItem(item, $event.value)" class="item-select">
              <mat-option value="">Select a hotel</mat-option>
              <mat-option *ngFor="let option of availableHotels()" [value]="option.id">
                {{ option.name }} - {{ formatPrice(option.price) }}
              </mat-option>
            </mat-select>
          </div>
        </div>

        <!-- Activities Section -->
        <div class="booking-section">
          <div class="section-header" [class.active-section]="hasItems('activities')">
            <button mat-icon-button (click)="addItem('activities')" [color]="hasItems('activities') ? 'warn' : 'primary'">
              <mat-icon>add</mat-icon>
            </button>
            <button mat-icon-button (click)="removeLastItem('activities')" [disabled]="!hasItems('activities')" [color]="hasItems('activities') ? 'warn' : 'primary'">
              <mat-icon>remove</mat-icon>
            </button>
            <span class="section-label">Activities</span>
            <!-- <mat-icon class="dropdown-icon">expand_more</mat-icon> -->
          </div>
          
          <!-- Always show at least one dropdown -->
          <div *ngIf="!hasItems('activities')" class="item-row">
            <mat-select placeholder="Select an activity" (selectionChange)="selectAndAddItem('activities', $event.value)" class="item-select">
              <mat-option value="">Select an activity</mat-option>
              <mat-option *ngFor="let option of availableActivities()" [value]="option.id">
                {{ option.name }} - {{ formatPrice(option.price) }}
              </mat-option>
            </mat-select>
          </div>
          
          <div *ngFor="let item of getItemsByCategory('activities'); trackBy: trackByFn" class="item-row">
            <mat-select [(value)]="item.id" (selectionChange)="updateItem(item, $event.value)" class="item-select">
              <mat-option value="">Select an activity</mat-option>
              <mat-option *ngFor="let option of availableActivities()" [value]="option.id">
                {{ option.name }} - {{ formatPrice(option.price) }}
              </mat-option>
            </mat-select>
          </div>
        </div>

        <!-- Vehicles Section -->
        <div class="booking-section">
          <div class="section-header" [class.active-section]="hasItems('vehicles')">
            <button mat-icon-button (click)="addItem('vehicles')" [color]="hasItems('vehicles') ? 'warn' : 'primary'">
              <mat-icon>add</mat-icon>
            </button>
            <button mat-icon-button (click)="removeLastItem('vehicles')" [disabled]="!hasItems('vehicles')" [color]="hasItems('vehicles') ? 'warn' : 'primary'">
              <mat-icon>remove</mat-icon>
            </button>
            <span class="section-label">Vehicles</span>
            <!-- <mat-icon class="dropdown-icon">expand_more</mat-icon> -->
          </div>
          
          <!-- Always show at least one dropdown -->
          <div *ngIf="!hasItems('vehicles')" class="item-row">
            <mat-select placeholder="Select a vehicle" (selectionChange)="selectAndAddItem('vehicles', $event.value)" class="item-select">
              <mat-option value="">Select a vehicle</mat-option>
              <mat-option *ngFor="let option of availableVehicles()" [value]="option.id">
                {{ option.name }} - {{ formatPrice(option.price) }}
              </mat-option>
            </mat-select>
          </div>
          
          <div *ngFor="let item of getItemsByCategory('vehicles'); trackBy: trackByFn" class="item-row">
            <mat-select [(value)]="item.id" (selectionChange)="updateItem(item, $event.value)" class="item-select">
              <mat-option value="">Select a vehicle</mat-option>
              <mat-option *ngFor="let option of availableVehicles()" [value]="option.id">
                {{ option.name }} - {{ formatPrice(option.price) }}
              </mat-option>
            </mat-select>
          </div>
        </div>

        <mat-divider class="total-divider"></mat-divider>
        
        <div class="subtotal-section">
          <h3>Subtotal: {{ formatPrice(subtotal()) }}</h3>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .booking-form {
      width: 100%;
      height: fit-content;
      max-height: calc(100vh - 2rem);
      overflow-y: auto;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border-radius: 8px;
    }
    
    .close-button {
      position: absolute;
      top: 8px;
      right: 8px;
    }
    
    .booking-section {
      margin: 1rem 0;
    }
    
    .section-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      padding: 0.5rem;
      background: #f5f5f5;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    }
    
    .section-header.active-section {
      background: #ffebee;
      border: 1px solid #f44336;
    }
    
    .section-label {
      flex: 1;
      font-weight: 500;
      font-size: 1.1rem;
    }
    
    .dropdown-icon {
      color: #666;
    }
    
    .item-row {
      margin: 0.5rem 0;
      padding: 0 1rem;
    }
    
    .item-select {
      width: 100%;
    }
    
    .total-divider {
      margin: 2rem 0 1rem 0;
    }
    
    .subtotal-section {
      text-align: center;
      padding: 1rem;
      background: #e3f2fd;
      border-radius: 4px;
    }
    
    .subtotal-section h3 {
      margin: 0;
      color: #1976d2;
      font-size: 1.5rem;
    }
    
    @media (max-width: 768px) {
      .booking-form {
        max-height: none;
      }
      
      .section-header {
        padding: 0.3rem;
      }
      
      .section-label {
        font-size: 1rem;
      }
    }
  `]
})
export class BookingFormComponent
{
  @Input() cityName!: string;
  @Output() close = new EventEmitter<void>();

  private selectedItems = signal<SelectedItem[]>([]);

  constructor(private bookingDataService: BookingDataService) { }

  availableHotels = computed(() => this.bookingDataService.getHotels(this.cityName));
  availableActivities = computed(() => this.bookingDataService.getActivities(this.cityName));
  availableVehicles = computed(() => this.bookingDataService.getVehicles(this.cityName));

  subtotal = computed(() =>
  {
    return this.selectedItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  });

  formatPrice(price: number): string
  {
    return `$${price}`;
  }

  onClose()
  {
    this.close.emit();
  }

  addItem(category: 'hotels' | 'activities' | 'vehicles')
  {
    const newItem: SelectedItem = {
      id: '', // Will be set when user selects from dropdown
      name: '',
      price: 0,
      quantity: 1,
      category
    };

    this.selectedItems.update(items => [...items, newItem]);
  }

  selectAndAddItem(category: 'hotels' | 'activities' | 'vehicles', optionId: string)
  {
    // Don't add anything if empty option is selected
    if (!optionId) return;

    let option: BookingOption | undefined;

    switch (category)
    {
      case 'hotels':
        option = this.availableHotels().find(h => h.id === optionId);
        break;
      case 'activities':
        option = this.availableActivities().find(a => a.id === optionId);
        break;
      case 'vehicles':
        option = this.availableVehicles().find(v => v.id === optionId);
        break;
    }

    if (option)
    {
      const newItem: SelectedItem = {
        id: option.id,
        name: option.name,
        price: option.price,
        quantity: 1,
        category
      };

      this.selectedItems.update(items => [...items, newItem]);
    }
  }

  removeLastItem(category: 'hotels' | 'activities' | 'vehicles')
  {
    this.selectedItems.update(items =>
    {
      const filtered = items.filter(item => item.category === category);
      if (filtered.length > 0)
      {
        const lastItem = filtered[filtered.length - 1];
        return items.filter(item => item !== lastItem);
      }
      return items;
    });
  }

  updateItem(item: SelectedItem, optionId: string)
  {
    let option: BookingOption | undefined;

    switch (item.category)
    {
      case 'hotels':
        option = this.availableHotels().find(h => h.id === optionId);
        break;
      case 'activities':
        option = this.availableActivities().find(a => a.id === optionId);
        break;
      case 'vehicles':
        option = this.availableVehicles().find(v => v.id === optionId);
        break;
    }

    if (option)
    {
      item.id = option.id;
      item.name = option.name;
      item.price = option.price;
      this.selectedItems.update(items => [...items]); // Trigger change detection
    }
  }

  getItemsByCategory(category: 'hotels' | 'activities' | 'vehicles'): SelectedItem[]
  {
    return this.selectedItems().filter(item => item.category === category);
  }

  hasItems(category: 'hotels' | 'activities' | 'vehicles'): boolean
  {
    return this.getItemsByCategory(category).length > 0;
  }

  trackByFn(index: number, item: SelectedItem): any
  {
    return index;
  }
} 