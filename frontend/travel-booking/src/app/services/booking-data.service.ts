import { Injectable } from '@angular/core';

export interface BookingOption
{
    id: string;
    name: string;
    price: number;
}

export interface BookingItem
{
    hotels: BookingOption[];
    activities: BookingOption[];
    vehicles: BookingOption[];
}

@Injectable({
    providedIn: 'root'
})
export class BookingDataService
{
    private mockData: { [cityName: string]: BookingItem } = {
        'Auckland': {
            hotels: [
                { id: 'auck-h1', name: 'SkyCity Hotel', price: 200 },
                { id: 'auck-h2', name: 'Hilton Auckland', price: 300 },
                { id: 'auck-h3', name: 'Grand Hyatt Auckland', price: 350 }
            ],
            activities: [
                { id: 'auck-a1', name: 'Sky Tower Experience', price: 80 },
                { id: 'auck-a2', name: 'Harbor Bridge Climb', price: 120 },
                { id: 'auck-a3', name: 'Wine Island Tour', price: 150 }
            ],
            vehicles: [
                { id: 'auck-v1', name: 'Economy Car Rental', price: 50 },
                { id: 'auck-v2', name: 'SUV Rental', price: 80 },
                { id: 'auck-v3', name: 'Luxury Sedan', price: 120 }
            ]
        },
        'Christchurch': {
            hotels: [
                { id: 'chch-h1', name: 'The George Hotel', price: 180 },
                { id: 'chch-h2', name: 'Heritage Christchurch', price: 160 },
                { id: 'chch-h3', name: 'Novotel Cathedral Square', price: 140 }
            ],
            activities: [
                { id: 'chch-a1', name: 'Christchurch Gondola', price: 45 },
                { id: 'chch-a2', name: 'Botanical Gardens Tour', price: 30 },
                { id: 'chch-a3', name: 'Punting on the Avon', price: 40 }
            ],
            vehicles: [
                { id: 'chch-v1', name: 'Compact Car', price: 45 },
                { id: 'chch-v2', name: 'Station Wagon', price: 65 },
                { id: 'chch-v3', name: 'Campervan', price: 100 }
            ]
        },
        'Queenstown': {
            hotels: [
                { id: 'qtown-h1', name: 'Eichardt\'s Private Hotel', price: 800 },
                { id: 'qtown-h2', name: 'The Rees Hotel', price: 400 },
                { id: 'qtown-h3', name: 'Copthorne Lakefront', price: 200 }
            ],
            activities: [
                { id: 'qtown-a1', name: 'Skydiving Experience', price: 300 },
                { id: 'qtown-a2', name: 'Milford Sound Cruise', price: 250 },
                { id: 'qtown-a3', name: 'Bungee Jumping', price: 180 }
            ],
            vehicles: [
                { id: 'qtown-v1', name: 'Motorcycle Rental', price: 80 },
                { id: 'qtown-v2', name: 'Jeep 4WD', price: 120 },
                { id: 'qtown-v3', name: 'Luxury Car', price: 200 }
            ]
        },
        'Wellington': {
            hotels: [
                { id: 'wgtn-h1', name: 'InterContinental Wellington', price: 280 },
                { id: 'wgtn-h2', name: 'Hotel Bolton', price: 200 },
                { id: 'wgtn-h3', name: 'CityLife Wellington', price: 150 }
            ],
            activities: [
                { id: 'wgtn-a1', name: 'Te Papa Museum', price: 25 },
                { id: 'wgtn-a2', name: 'Cable Car & Botanic Garden', price: 35 },
                { id: 'wgtn-a3', name: 'Weta Workshop Tour', price: 75 }
            ],
            vehicles: [
                { id: 'wgtn-v1', name: 'Electric Car', price: 70 },
                { id: 'wgtn-v2', name: 'Hybrid SUV', price: 90 },
                { id: 'wgtn-v3', name: 'Convertible', price: 130 }
            ]
        },
        'Rotorua': {
            hotels: [
                { id: 'roto-h1', name: 'Treetops Lodge', price: 450 },
                { id: 'roto-h2', name: 'Millennium Hotel Rotorua', price: 180 },
                { id: 'roto-h3', name: 'Regent of Rotorua', price: 160 }
            ],
            activities: [
                { id: 'roto-a1', name: 'Geothermal Park Visit', price: 50 },
                { id: 'roto-a2', name: 'Maori Cultural Experience', price: 95 },
                { id: 'roto-a3', name: 'White Water Rafting', price: 120 }
            ],
            vehicles: [
                { id: 'roto-v1', name: 'Standard Car', price: 55 },
                { id: 'roto-v2', name: 'All-Terrain Vehicle', price: 85 },
                { id: 'roto-v3', name: 'Tourist Bus', price: 150 }
            ]
        }
    };

    getHotels(cityName: string): BookingOption[]
    {
        return this.mockData[cityName]?.hotels || this.getDefaultOptions('hotels');
    }

    getActivities(cityName: string): BookingOption[]
    {
        return this.mockData[cityName]?.activities || this.getDefaultOptions('activities');
    }

    getVehicles(cityName: string): BookingOption[]
    {
        return this.mockData[cityName]?.vehicles || this.getDefaultOptions('vehicles');
    }

    private getDefaultOptions(category: 'hotels' | 'activities' | 'vehicles'): BookingOption[]
    {
        const defaults = {
            hotels: [
                { id: 'default-h1', name: 'Local Hotel', price: 120 },
                { id: 'default-h2', name: 'Budget Inn', price: 80 },
                { id: 'default-h3', name: 'Luxury Resort', price: 250 }
            ],
            activities: [
                { id: 'default-a1', name: 'City Tour', price: 60 },
                { id: 'default-a2', name: 'Nature Walk', price: 40 },
                { id: 'default-a3', name: 'Cultural Experience', price: 90 }
            ],
            vehicles: [
                { id: 'default-v1', name: 'Economy Car', price: 50 },
                { id: 'default-v2', name: 'Standard SUV', price: 75 },
                { id: 'default-v3', name: 'Premium Vehicle', price: 110 }
            ]
        };

        return defaults[category];
    }
} 