# supa-shop

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Supabase](https://img.shields.io/badge/Supabase-2.50.0-green.svg)](https://supabase.com/)

A modern, full-stack e-commerce platform built with React, TypeScript, and Supabase. This project implements a robust, scalable, and user-friendly shopping experience with advanced features and best practices in web development.

## 🚀 Project Overview

### Description

This e-commerce platform is a modern web application that provides a seamless shopping experience with features like real-time inventory management, secure authentication, and a responsive design. Built with performance and user experience in mind, it leverages the latest web technologies and follows industry best practices.

### Key Features

-   🔐 Secure authentication and authorization
-   🛒 Real-time shopping cart management
-   🌐 Internationalization support
-   📱 Responsive design for all devices
-   🎨 Modern UI with shadcn/ui components
-   🔄 Real-time data synchronization

## 🎨 Design

### Figma Design

This project is based on this [E-Commerce Website Design](https://www.figma.com/design/yn2DFQJla0UiSMvomFsqwT/E-Commerce-Website-%D9%90Almdrasa) . The design includes:

-   Modern and clean UI components
-   Responsive layouts for all devices
-   Consistent color scheme and typography
-   Interactive components and animations
-   User flow and navigation patterns

The implementation uses shadcn/ui components to match the design system while maintaining flexibility for customization.

## 🛠 Tech Stack & Architecture

### Frontend

-   **Framework**: React 19.0.0
-   **Language**: TypeScript 5.7.2
-   **Build Tool**: Vite 6.1.0
-   **UI Components**: shadcn/ui (based on Radix UI)
-   **State Management**:
    -   Zustand for global state
    -   TanStack Query for server state
-   **Routing**: TanStack Router
-   **Styling**:
    -   Tailwind CSS 4.1.10
    -   Tailwind Merge
    -   Class Variance Authority
-   **Icons**: Lucide React
-   **Internationalization**: i18next

### Backend & Database

-   **Platform**: Supabase
-   **Database**: PostgreSQL
-   **Authentication**: Supabase Auth
-   **Storage**: Supabase Storage

### Development Tools

-   **Package Manager**: pnpm
-   **Testing**: Vitest
-   **Linting**: ESLint
-   **Type Checking**: TypeScript
-   **Version Control**: Git

## 📁 Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components
├── lib/            # Utility functions and configurations
├── routes/         # Application routes
├── store/          # State management (Zustand)
├── utils/          # Helper functions
├── i18n.ts         # Internationalization setup
├── main.tsx        # Application entry point
└── styles.css      # Global styles
```

### Key Directories

-   `components/`: Reusable UI components built with shadcn/ui
-   `routes/`: Page components and route definitions
-   `store/`: Zustand store configurations
-   `lib/`: Shared utilities and configurations
-   `utils/`: Helper functions and constants

## 🎯 Features & Implementation Details

### Authentication

-   Email/password authentication
-   Social login integration
-   Protected routes

### Product Management

-   Product listing with pagination
-   Advanced filtering and search
-   Product categories

### Shopping Cart

-   Real-time cart updates
-   Persistent cart state
-   Quantity management
-   Price calculations
-   Cart validation

### ~~Checkout Process~~ **(not implemented yet)**

-   Multi-step checkout
-   Address management
-   Payment integration
-   Order confirmation
-   Email notifications

### User Profile **(not implemented yet)**

-   Profile management
-   Order history
-   Wishlist
-   Address book
-   Account settings

## 🚀 Development Setup

### Prerequisites

-   Node.js (v18 or higher)
-   pnpm
-   Git
-   Supabase account

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### ![Supabase](https://img.shields.io/badge/-3ECF8E?style=flat-square&logo=supabase&logoColor=white) Setup

1. **Create a Supabase Project**

    - Go to [Supabase Dashboard](https://app.supabase.com)
    - Click "New Project"
    - Choose a name and database password
    - Select a region closest to your users
    - Wait for the database to be provisioned

2. **Database Schema**

    - The complete database schema, including tables, policies, and indexes, is defined in [`supabase-pg-schema.sql`](./supabase-pg-schema.sql)
    - Run this SQL file in the Supabase SQL editor to set up your database
    - The schema includes:
        - Products
        - Cart
        - Wishlist
        - Row Level Security (RLS) policies
        - Storage policies
        - Performance indexes

3. **Storage Setup**

    - Create a new bucket called `products` for product images
    - Set the bucket's privacy to public
    - Start by adding a product image to the bucket
    - Then, add the image URL to the product in the database when creating a new product in product table

4. **Authentication Setup**

    - Enable Email/Password authentication in Authentication > Providers
    - Configure email templates in Authentication > Email Templates
    - Configure Google OAuth2:
        1. Go to [Google Cloud Console](https://console.cloud.google.com)
        2. Create a new project or select an existing one
        3. Navigate to "APIs & Services" > "Credentials"
        4. Click "Create Credentials" > "OAuth client ID"
        5. Set up the OAuth consent screen if prompted
        6. Choose "Web application" as the application type
        7. Add authorized redirect URI: `https://[YOUR_PROJECT_REF].supabase.co/auth/v1/callback`
        8. Copy the Client ID and Client Secret
        9. In Supabase Dashboard, go to Authentication > Providers > Google
        10. Enable Google auth and paste your Client ID and Client Secret

5. **API Configuration**
    - Get your project URL and anon key from Project Settings > API
    - Add these to your `.env` file
    - Configure CORS in Project Settings > API if needed

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/e-commerce-supabase.git

# Navigate to project directory
cd supa-shop

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Development Server

-   Development server runs on `http://localhost:3000`

### Build Process

```bash
# Build for production
pnpm build

# Preview production build
pnpm serve
```

### Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## 📚 API Documentation

### Supabase Tables

-   `users`: User profiles and authentication
-   `products`: Product catalog
-   `cart`: Shopping cart items
-   `wishlist`: Wishlist items

> **Note:** The `users` table is created by default when a Supabase project is created

### Authentication Methods

-   Email/password
-   OAuth providers

### Data Models

Detailed schema documentation available in the [`supabase-pg-schema.sql`](./supabase-pg-schema.sql) file.

## 🎨 Styling & UI

### Design System

-   Consistent color palette
-   Typography system
-   Spacing scale
-   Component variants
-   Responsive breakpoints

### Component Library

-   shadcn/ui components
-   Custom component extensions
-   Responsive design patterns
-   Accessibility features

### Theming

-   Custom theme configuration
-   CSS variables

## 🔒 Security

### Authentication Security

-   Supabase Auth

### API Security

-   Supabase RLS
-   Supabase Storage

## 📄 License & Credits

### License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

### Third-party Credits

-   [shadcn/ui](https://ui.shadcn.com/)
-   [Supabase](https://supabase.com/)
-   [TanStack](https://tanstack.com/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [E-Commerce Website Design](https://www.figma.com/design/yn2DFQJla0UiSMvomFsqwT/E-Commerce-Website-%D9%90Almdrasa) by Almdrasa

### Attribution Requirements

Please include appropriate attribution when using this project, including:

-   A link to this repository
-   The MIT license notice
-   Attribution to third-party libraries and resources used

---
