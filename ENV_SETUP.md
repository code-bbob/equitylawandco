# Environment Variables Configuration

## Frontend Setup

All frontend API calls now use environment variables. Create a `.env.local` file in the `/frontend` directory with the following variables:

### Development (localhost)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_API_BASE=http://localhost:8000
NEXT_PUBLIC_API_PROTOCOL=http
NEXT_PUBLIC_API_HOST=localhost
NEXT_PUBLIC_API_PORT=8000
```

### Production Example
For deployment, replace with your production API server:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_API_BASE=https://api.yourdomain.com
NEXT_PUBLIC_API_PROTOCOL=https
NEXT_PUBLIC_API_HOST=api.yourdomain.com
NEXT_PUBLIC_API_PORT=443
```

## Files Updated

### Frontend Files Modified:
1. **app/practice-areas/[slug]/page.js** - Uses `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_API_BASE`
2. **app/components/ContactForm.js** - Uses `NEXT_PUBLIC_API_URL`
3. **app/hooks/usePracticeAreas.js** - Uses `NEXT_PUBLIC_API_URL`
4. **next.config.mjs** - Uses `NEXT_PUBLIC_API_PROTOCOL`, `NEXT_PUBLIC_API_HOST`, `NEXT_PUBLIC_API_PORT`

### Additional Files Already Using Environment Variables:
- **app/hooks/useAttorneys.js** - Already had env var support
- **app/hooks/useAttorney.js** - Already had env var support
- **app/hooks/useBlogs.js** - Already had env var support
- **app/hooks/useBlog.js** - Already had env var support
- **app/components/AppointmentForm.js** - Already had env var support

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_API_URL` | Base URL for API endpoints | `http://localhost:8000/api` |
| `NEXT_PUBLIC_API_BASE` | Base URL without /api suffix | `http://localhost:8000` |
| `NEXT_PUBLIC_API_PROTOCOL` | Protocol for image serving | `http` or `https` |
| `NEXT_PUBLIC_API_HOST` | Hostname for image serving | `localhost` or `api.yourdomain.com` |
| `NEXT_PUBLIC_API_PORT` | Port number for images | `8000` or `443` |

## For Deployment

1. Copy `.env.example` to `.env.local` in the frontend directory
2. Update all variables with your production server details
3. Ensure `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_API_BASE` point to your production API server
4. Update image serving configuration (`PROTOCOL`, `HOST`, `PORT`) to match your backend
5. Redeploy the frontend

All variables are **NEXT_PUBLIC_** prefixed, meaning they are baked into the frontend at build time. You'll need to rebuild the frontend after changing these values.
