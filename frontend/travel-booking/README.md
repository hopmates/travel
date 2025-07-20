# 🌍 Travel Booking App <span style="float: right; font-size: 16px; font-weight: normal; font-style: italic;">Last updated: 19 July 2025</span>

A modern, responsive travel booking application built with Angular 18 and Angular Material. Users can select New Zealand cities from an interactive map and book hotels, activities, and vehicles with real-time pricing.

## 🚀 Live Demo

**🌐 Production Website**: [https://whatajoystays.com](https://whatajoystays.com)

The application is deployed on a Raspberry Pi using Cloudflare Tunnel for global accessibility.

## 🚀 Features

### ✅ Interactive Map

- Static New Zealand map with clickable city buttons
- 23+ major New Zealand cities positioned accurately
- **Toggle functionality**: Click once to show form, click again to hide
- **Visual feedback**: Selected cities turn red with scaling and shadow effects
- **Multi-city selection**: Support for multiple simultaneous booking forms
- Mobile-responsive city labels with smooth interactions

### ✅ Dynamic Booking Forms

- **Side-by-side layout**: Map on left, booking forms on right (desktop)
- **Mobile-responsive**: Vertical stacking on smaller screens
- **Toggle behavior**: Cities can be selected/deselected individually
- **Multiple forms**: Stack multiple city booking forms vertically
- **Individual close buttons**: Each form has its own close button
- Three booking categories per city: **Hotels**, **Activities**, **Vehicles**
- **Immediate dropdown visibility**: Options appear instantly without clicking +
- Add (+) and Remove (-) buttons for each category
- Dropdown selectors with pricing information and placeholder options
- **Real-time subtotal calculation** per city
- **Visual indicators**: Red background for active form sections with items

### ✅ Mock Data Service

- Realistic mock data for major NZ cities:
  - Auckland, Christchurch, Queenstown, Wellington, Rotorua
- Varied pricing for different accommodation and activity types
- Fallback default options for cities without specific data

### ✅ Modern UI/UX

- Angular Material design system
- Mobile-first responsive layout
- Clean, professional interface
- Smooth animations and transitions

## 🛠️ Tech Stack

- **Framework**: Angular 18 (Standalone Components)
- **UI Library**: Angular Material
- **Styling**: SCSS with responsive design
- **State Management**: Angular Signals
- **Reactive Programming**: RxJS
- **Build Tool**: Angular CLI
- **TypeScript**: Latest version with strict mode
- **Hosting**: Raspberry Pi with Nginx
- **SSL/CDN**: Cloudflare Tunnel
- **Domain**: whatajoystays.com

## 📁 Project Structure

```
src/
├── app/
│   ├── map/
│   │   └── map.component.ts              # Interactive map with city selection
│   ├── booking-form/
│   │   └── booking-form.component.ts     # Modal booking form
│   ├── services/
│   │   └── booking-data.service.ts       # Mock data service
│   ├── app.component.ts                  # Root component
│   └── app.routes.ts                     # Routing configuration
├── assets/
│   └── nz-map.png                        # New Zealand map image (required)
├── index.html                            # Main HTML file
├── main.ts                               # Application bootstrap
└── styles.scss                           # Global styles
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Angular CLI (v18)

### Local Development

1. **Navigate to the project directory**:

   ```bash
   cd frontend/travel-booking
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Add the map image**:
   - Place your New Zealand map image in `src/assets/`
   - Name it `nz-map.png`
   - Or update the image path in `src/app/map/map.component.ts`

4. **Run the development server**:

   ```bash
   ng serve
   ```

5. **Open your browser**:
   - Navigate to `http://localhost:4200`
   - The app will automatically reload when you make changes

## 🌐 Production Deployment

### Current Production Setup

- **Live URL**: [https://whatajoystays.com](https://whatajoystays.com)
- **Infrastructure**: Raspberry Pi 4 with Ubuntu Server 24.04
- **Web Server**: Nginx (optimized for Angular SPA)
- **SSL/Security**: Cloudflare Tunnel with automatic HTTPS
- **Global CDN**: Cloudflare network for worldwide performance

### Build for Production

```bash
# Build the app for production
npm run build

# The build artifacts will be stored in the `dist/travel-booking/` directory
```

### Deployment Process

For detailed deployment instructions, see the comprehensive guide:
**📖 [README-RaspberryPi-Deployment.md](../../README-RaspberryPi-Deployment.md)**

Quick deployment steps:

1. **Build the application**: `npm run build`
2. **Transfer files to Pi**: `scp -r dist/travel-booking/* user@pi:/tmp/webapp/`
3. **Update web server**: Copy files to `/var/www/html/`
4. **Restart services**: `sudo systemctl restart nginx`

### Production Benefits

- ✅ **Global accessibility** - Available worldwide via Cloudflare
- ✅ **Automatic HTTPS** - SSL certificates managed by Cloudflare  
- ✅ **ISP-independent** - Bypasses port forwarding and ISP blocking
- ✅ **Auto-restart** - Services restart automatically on boot
- ✅ **Performance optimized** - Gzip compression and static asset caching

## 🎯 How to Use

1. **Select a City**: Click on any city name on the New Zealand map
   - City button turns red and shows scaling animation
   - Booking form appears on the right side (desktop) or below (mobile)
2. **Toggle Cities**: Click the same city again to hide its form
   - City button returns to blue color
   - Form disappears smoothly
3. **Multiple Cities**: Select multiple cities to see stacked booking forms
   - Each city maintains its own independent form
   - All forms are visible simultaneously
4. **Add Items**: Use the (+) buttons to add hotels, activities, or vehicles
   - Dropdowns appear immediately with selectable options
   - Form sections turn red when items are added
5. **Choose Options**: Select from dropdown menus with pricing
   - First option is always a placeholder (e.g., "Select a hotel")
   - Prices are shown in each dropdown option
6. **Remove Items**: Use the (-) buttons to remove items
   - Form sections return to normal color when empty
7. **View Total**: See the real-time subtotal at the bottom of each form
8. **Close Forms**: Click the X button on individual forms to close them

## 📱 Mobile Support

The application is built with mobile-first design principles:

- **Responsive layout**: Side-by-side on desktop, vertical stacking on mobile
- **Touch-friendly city buttons**: Optimized size and spacing for mobile taps
- **Smooth animations**: City selection and form transitions work seamlessly on touch devices
- **Flexible form layout**: Booking forms adapt to screen size automatically
- **Optimized dropdowns**: Easy selection on mobile devices
- **Scroll-friendly**: Multiple forms stack vertically with smooth scrolling

## 🗂️ Available Cities with Data

### Major Cities (Full Data)

- **Auckland**: Sky Tower, Harbor Bridge, Wine Tours
- **Christchurch**: Gondola, Botanical Gardens, Punting
- **Queenstown**: Skydiving, Milford Sound, Bungee Jumping
- **Wellington**: Te Papa Museum, Cable Car, Weta Workshop
- **Rotorua**: Geothermal Parks, Maori Culture, White Water Rafting

### Other Cities

All other cities use default options with generic hotels, activities, and vehicles.

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Build for production
npm run build

# Run tests
ng test

# Generate new component
ng generate component component-name

# Generate new service
ng generate service service-name

# Deploy to production (after build)
# See README-RaspberryPi-Deployment.md for full deployment guide
```

## 🌐 Build for Production

```bash
# Build the app for production
ng build --prod

# The build artifacts will be stored in the `dist/` directory
```

## 🔮 Future Enhancements

### Planned Features

- [ ] Real interactive map (Google Maps/Leaflet integration)
- [ ] **Backend API integration** (.NET Web API with Entity Framework)
- [ ] User authentication and login
- [ ] **Database integration** (Replace mock data with real database)
- [ ] Payment integration (Stripe/PayPal)
- [ ] Booking confirmation and email notifications
- [ ] User booking history and account management
- [ ] Advanced filtering and search functionality
- [ ] **Calendar integration** for date selection
- [ ] **Guest count selection** for bookings
- [ ] Multi-language support
- [ ] **Email/SMS notifications** for booking confirmations
- [ ] **Admin dashboard** for managing bookings and inventory

### Technical Improvements

- [ ] **Unit and integration tests** (Jest/Jasmine)
- [ ] **End-to-end testing** with Cypress or Playwright
- [ ] **State management** with NgRx (when backend integration is added)
- [ ] **PWA capabilities** (Service workers, offline support)
- [ ] **Performance optimization** (Lazy loading, OnPush change detection)
- [ ] **Accessibility improvements** (ARIA labels, keyboard navigation)
- [ ] **Docker containerization** for easy deployment
- [ ] **CI/CD pipeline** (GitHub Actions, Azure DevOps)
- [ ] **Error handling and logging** (Global error handling)
- [ ] **SEO optimization** (Angular Universal for SSR)

### Infrastructure Completed ✅

- [x] **Production hosting** on Raspberry Pi
- [x] **Custom domain** with SSL (whatajoystays.com)
- [x] **Global CDN** via Cloudflare
- [x] **Automated deployment** process documented
- [x] **ISP-independent hosting** via Cloudflare Tunnel

## 🐛 Troubleshooting

### Common Issues

1. **Map image not showing**:
   - Ensure `nz-map.png` is in `src/assets/`
   - Check the file path in `map.component.ts`

2. **Dependencies not installing**:
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

3. **Angular CLI not found**:
   - Install globally: `npm install -g @angular/cli`

4. **Port already in use**:
   - Use different port: `ng serve --port 4201`

## 📄 License

This project is for educational and demonstration purposes.

## 🤝 Contributing

This is a demo project, but feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or issues:

- Check the troubleshooting section above
- Review Angular documentation: <https://angular.io/docs>
- Check Angular Material docs: <https://material.angular.io/>

## 📖 Documentation

- **📱 Application Guide**: This README (frontend/travel-booking/README.md)
- **🚀 Deployment Guide**: [README-RaspberryPi-Deployment.md](../../README-RaspberryPi-Deployment.md)
- **🌐 Live Website**: [https://whatajoystays.com](https://whatajoystays.com)

---

**Built with ❤️ using Angular 18 and Angular Material**  
**Deployed on Raspberry Pi with Cloudflare Tunnel for global accessibility** 🌍
