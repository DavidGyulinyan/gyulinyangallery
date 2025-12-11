# Gyulinyan Gallery

A full-stack artist portfolio web application built with Next.js 14, TypeScript, Tailwind CSS, ShadCN UI, and Supabase.

## Features

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Supabase (PostgreSQL, Auth, Storage, RLS)
- **Image Hosting**: Supabase Storage
- **Deployment**: Vercel

### Public Features
- Responsive gallery with masonry-style grid
- Artwork filtering and search
- Lightbox modal for image viewing
- Artist bio and exhibitions
- Contact form with social links
- ISR for optimal performance

### Admin Features
- Protected admin dashboard
- Artwork upload and management
- Exhibition management
- Contact message inbox
- Image upload to Supabase Storage

## Setup Instructions

### 1. Environment Variables

Copy `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
```

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run the contents of `supabase/setup.sql`
3. Run the contents of `supabase/seed.sql` to add sample data
4. Set up authentication:
   - Go to Authentication > Users
   - Create an admin user with the email from `NEXT_PUBLIC_ADMIN_EMAIL`
   - Or update the RLS policies to match your admin email

### 3. Storage Setup

1. In Supabase Dashboard, go to Storage
2. The `setup.sql` creates an `artworks` bucket
3. Configure bucket policies as defined in `setup.sql`

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard
│   ├── artwork/[id]/      # Individual artwork pages
│   ├── gallery/           # Gallery page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # ShadCN UI components
│   └── contact-form.tsx  # Contact form component
├── lib/                  # Utility libraries
│   ├── supabase/         # Supabase client setup
│   ├── schemas.ts        # Zod validation schemas
│   └── database.types.ts # Database type definitions
└── supabase/             # Database setup files
    ├── setup.sql         # Tables and RLS policies
    └── seed.sql          # Sample data
```

## Admin Access

- Visit `/admin/login` to access the admin dashboard
- Use the admin email configured in your environment variables
- Set up the password in Supabase Auth

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Database Migration

For production, run the SQL files in your Supabase project:
- `supabase/setup.sql` for table creation and policies
- `supabase/seed.sql` for sample data

## Technologies Used

- **Frontend**: Next.js 14, React 19, TypeScript, Tailwind CSS
- **UI Components**: ShadCN UI, Lucide Icons
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Forms**: React Hook Form, Zod validation
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Development

- Uses Next.js App Router with Server Components
- Server-side data fetching with Supabase
- ISR (Incremental Static Regeneration) for public pages
- Row Level Security (RLS) for data protection
- Type-safe database operations with generated types
