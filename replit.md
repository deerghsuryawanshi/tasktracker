# Overview

This is a full-stack task management application built with React, Express.js, and PostgreSQL. The application provides a comprehensive todo/task management system with CRUD operations, status tracking, and a modern user interface. The frontend is built with React and uses shadcn/ui components for a polished design, while the backend provides a RESTful API for task management operations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development and building
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation resolvers
- **Build Tool**: Vite with hot module replacement and runtime error overlay

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with standard HTTP methods (GET, POST, PUT, DELETE)
- **Request Processing**: JSON body parsing and URL encoding support
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Development**: Custom middleware for request logging and performance monitoring

## Data Storage
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema pushing
- **Connection**: Connection pooling with WebSocket support for serverless environments
- **Validation**: Zod schemas for runtime type validation integrated with Drizzle

## Data Models
- **Tasks Table**: Core entity with id, title, description, status, and timestamps
- **Users Table**: User management structure (implemented but not actively used)
- **Status System**: Three-state task status (pending, in-progress, completed)
- **Auto-generated IDs**: UUID primary keys with PostgreSQL's gen_random_uuid()

## API Structure
- **GET /api/tasks**: Retrieve all tasks with descending creation order
- **GET /api/tasks/:id**: Retrieve specific task by ID
- **POST /api/tasks**: Create new task with validation
- **PUT /api/tasks/:id**: Update existing task with partial data support
- **DELETE /api/tasks/:id**: Remove task by ID

## Component Architecture
- **Modular Components**: Reusable UI components for forms, lists, and statistics
- **Smart/Dumb Pattern**: Separation of data fetching logic and presentation
- **Modal System**: Dialog-based editing with form state management
- **Statistics Dashboard**: Real-time task metrics and progress tracking

# External Dependencies

## Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing solution
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **@neondatabase/serverless**: PostgreSQL serverless driver

## UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for managing component variants
- **clsx**: Conditional className utility

## Development Tools
- **vite**: Frontend build tool and development server
- **tsx**: TypeScript execution for Node.js development
- **esbuild**: JavaScript bundler for production builds
- **drizzle-kit**: Database schema management and migrations

## Form and Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Integration layer for validation libraries
- **zod**: TypeScript-first schema validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

## Utility Libraries
- **date-fns**: Modern date manipulation library
- **nanoid**: URL-safe unique string ID generator
- **cmdk**: Command palette and search interface component