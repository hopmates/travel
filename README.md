# Travel Booking Application

A modern web application for travel booking and management built with Angular.

**🚧 This is currently a proof of concept (POC) focusing on the frontend implementation. The application will be further developed with a complete backend API and database integration.**

## 📋 Project Overview

This application provides a comprehensive travel booking system with interactive features including booking forms, map integration, and agent management capabilities.

### Current Status
- ✅ **Frontend**: Angular application with Material UI components
- 🚧 **Backend**: Planned .NET API (in development)
- 🚧 **Database**: Planned integration with SQL Server/PostgreSQL

### Live Demo
- 🌐 **Current URL**: [https://www.whatajoystays.com](https://www.whatajoystays.com)
- 🔄 **Future URL**: [https://www.hopmates.com](https://www.hopmates.com) *(migration planned)*

## 🏗️ Project Structure

```
travel/
├── frontend/
│   └── travel-booking/          # Angular application
│       ├── src/
│       │   ├── app/
│       │   │   ├── booking-form/    # Booking form component
│       │   │   ├── map/             # Interactive map component
│       │   │   ├── agent-page/      # Agent management
│       │   │   └── services/        # Data services
│       │   └── assets/              # Static assets (maps, images)
│       ├── package.json
│       └── angular.json
├── backend/          # this will be in .NET API
└── README.md
```

## 🚀 Features

- **Interactive Booking Forms** - User-friendly travel booking interface
- **Map Integration** - Visual location selection and display
- **Agent Management** - Travel agent dashboard and tools
- **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Technologies Used

### Frontend (Current)
- **Angular** - Frontend framework (v18)
- **Angular Material** - UI component library
- **RxJS** - Reactive programming library
- **TypeScript** - Programming language
- **SCSS** - Styling preprocessor
- **Angular CLI** - Development tools

### Backend (Planned)
- **.NET Core/ASP.NET** - Web API framework
- **Entity Framework** - ORM for database operations
- **SQL Server/PostgreSQL** - Database system
- **JWT Authentication** - Secure user authentication

## 📦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Angular CLI

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd travel
   ```

2. Navigate to the Angular app:
   ```bash
   cd frontend/travel-booking
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   ng serve
   ```

5. Open your browser and navigate to `http://localhost:4200`

> **Note**: Currently, this is a frontend-only application. Backend API integration will be added in future development phases.

## 🔧 Development

- **Development Server**: `ng serve` - Navigate to `http://localhost:4200`
- **Code Scaffolding**: `ng generate component component-name`
- **Build**: `ng build` - Build artifacts stored in `dist/` directory
- **Testing**: `ng test` - Execute unit tests via Karma
- **Linting**: `ng lint` - Run code linting

---

**Happy Coding!** 🌍✈️ 