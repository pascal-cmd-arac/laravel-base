# 🚀 Ecommerce Deployment Guide

## Quick Deployment Commands

For platforms like **Vercel**, **Netlify**, **Railway**, or **Heroku**, use these commands:

### 1. Database Migration
```bash
php artisan migrate --force
```

### 2. Seed Sample Data (Optional)
```bash
php artisan db:seed --force
```

### 3. Build Frontend Assets
```bash
npm ci
npm run build
```

### 4. Cache Configuration (Production)
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Environment Variables Required

Make sure these environment variables are set in your deployment platform:

```env
# Database (PostgreSQL recommended for production)
DB_CONNECTION=pgsql
DB_HOST=your-db-host
DB_PORT=5432
DB_DATABASE=your-db-name
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password

# Application
APP_NAME="Your Store Name"
APP_ENV=production
APP_KEY=base64:your-app-key-here
APP_DEBUG=false
APP_URL=https://your-domain.com

# Session & Cache
SESSION_DRIVER=database
CACHE_DRIVER=database
QUEUE_CONNECTION=database

# Mail (for order confirmations)
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@your-domain.com
MAIL_FROM_NAME="${APP_NAME}"
```

## Platform-Specific Instructions

### Vercel
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Add build command: `npm run build`
4. Add install command: `composer install --no-dev && npm ci`

### Railway
1. Connect GitHub repository
2. Add environment variables
3. Railway will auto-detect Laravel and handle deployment

### Heroku
1. Add Heroku Postgres addon
2. Set environment variables
3. Add buildpacks:
   - `heroku/php`
   - `heroku/nodejs`

### DigitalOcean App Platform
1. Connect GitHub repository
2. Configure environment variables
3. Set build command: `npm run build`

## Migration Order (Fixed)

The migrations now run in the correct dependency order:

1. ✅ `users`, `cache`, `jobs` (Laravel defaults)
2. ✅ `categories`, `brands` (no dependencies)
3. ✅ `orders`, `carts` (depend on users)
4. ✅ `products` (depends on categories, brands)
5. ✅ `addresses` (depends on users)
6. ✅ `order_items` (depends on orders, products)
7. ✅ `cart_items` (depends on carts, products)
8. ✅ `coupons` (no dependencies)
9. ✅ `reviews` (depends on products, users)
10. ✅ `wishlists` (depends on products, users)
11. ✅ `add_fields_to_users_table` (modifies users)

## Default Admin Access

After deployment and seeding:

- **Admin Email**: `admin@example.com`
- **Admin Password**: `password`
- **Admin URL**: `https://your-domain.com/admin`

**⚠️ Important**: Change the default admin password immediately after deployment!

## Post-Deployment Checklist

- [ ] ✅ Migrations completed successfully
- [ ] ✅ Sample data seeded (optional)
- [ ] ✅ Frontend assets built and served
- [ ] ✅ Admin login works
- [ ] ✅ Customer registration works
- [ ] ✅ Product catalog loads
- [ ] ✅ Shopping cart functions
- [ ] ✅ Checkout process works
- [ ] 🔒 Default admin password changed
- [ ] 📧 Email configuration tested
- [ ] 🔍 SEO meta tags configured
- [ ] 📊 Analytics tracking added (optional)

## Troubleshooting

### Migration Errors
If you encounter foreign key constraint errors:
```bash
php artisan migrate:fresh --force
php artisan db:seed --force
```

### Asset Build Errors
```bash
npm ci
npm run build
```

### Permission Errors
```bash
chmod -R 755 storage
chmod -R 755 bootstrap/cache
```

## Performance Optimization

For production, consider:

1. **CDN**: Use a CDN for static assets
2. **Redis**: Switch to Redis for cache and sessions
3. **Queue Workers**: Set up queue workers for background jobs
4. **Image Optimization**: Implement image resizing and optimization
5. **Database Indexing**: Monitor and optimize database queries

## Security Considerations

1. **SSL Certificate**: Ensure HTTPS is enabled
2. **Environment Variables**: Never commit `.env` files
3. **Admin Access**: Use strong passwords and 2FA
4. **Database**: Use read-only database users where possible
5. **File Uploads**: Implement proper file validation and storage

---

🎉 **Your ecommerce store is now ready for production!**
