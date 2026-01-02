
# Movies Explorer Frontend

A modern, responsive React application for exploring movies, actors, and directors. Built with TypeScript, Tailwind CSS, and state-of-the-art frontend technologies.

## 🚀 Features

### Core Functionality

- **Movie Browsing**: Browse and search through extensive movie collection
- **Advanced Filtering**: Filter by genre, director, actor, year, and rating
- **Movie Details**: Comprehensive movie pages with cast, crew, and reviews
- **Favorites System**: Add/remove movies from favorites (localStorage)
- **Actor & Director Profiles**: Explore filmographies and biographies
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Technical Features

- **TypeScript**: Full type safety and better developer experience
- **React Query**: Efficient data fetching, caching, and synchronization
- **React Router**: Client-side routing with proper navigation
- **Tailwind CSS**: Modern utility-first CSS framework
- **Component Architecture**: Modular, reusable components following DRY principles
- **Performance Optimized**: Lazy loading, pagination, and optimized queries

## 🛠️ Tech Stack

- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 3.x
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **Utilities**: clsx, tailwind-merge

## 🔧 Installation & Setup

1. **Install Dependencies**

   ```bash
   npm install
   ```
2. **Start Development Server**

   ```bash
   npm run dev
   ```
3. **Build for Production**

   ```bash
   npm run build
   ```

## 🌐 API Integration

The frontend connects to the Django REST API backend:

- **Base URL**: `http://localhost:8000/api`
- **Endpoints**: Movies, Actors, Directors, Genres, Reviews
- **Features**: Pagination, filtering, search, detailed views

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

### Grid Systems

- **Movie Grid**: 1 → 2 → 3 → 4 columns
- **Actor/Director Grid**: 1 → 2 → 3 → 4 columns

## 🎯 Key Features

- **Favorites System**: Persisted in localStorage
- **Advanced Filtering**: Multiple filter options
- **Pagination**: Efficient data loading
- **Search**: Real-time search functionality
- **Mobile Responsive**: Works on all devices

## 🚀 Performance Optimizations

- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Images and components loaded on demand
- **Caching**: React Query for intelligent data caching
- **Debouncing**: Search input debouncing for API calls

## 📄 License

This project is licensed under the MIT License.
