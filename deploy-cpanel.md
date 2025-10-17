# cPanel Deployment Guide for Beachways Admin

## Deployment to http://admin.beachwaysgroup.com/

### 1. Build the Application
```bash
npm run build
```

### 2. Upload Files to cPanel
1. Login to your cPanel account
2. Go to **File Manager**
3. Navigate to the root directory for `admin.beachwaysgroup.com`
4. Upload ALL contents of the `dist` folder:
   - `index.html`
   - `assets/` folder (with all its contents)
   - `placeholder.svg`
   - `robots.txt`

### 3. Upload .htaccess File
Upload the `.htaccess` file (provided in this project) to enable proper routing for React Router.

### 4. Verify Deployment
1. Visit http://admin.beachwaysgroup.com/
2. Test all functionality including:
   - Dashboard with real data
   - Reports page with analytics
   - Customer management
   - Booking management

### 5. Environment Variables (if needed)
If your application requires environment variables, set them in cPanel:
1. Go to **Environment Variables** in cPanel
2. Add any required variables (like Supabase URLs/keys)

### 6. SSL Certificate (Recommended)
Enable SSL for your subdomain:
1. Go to **SSL/TLS** in cPanel
2. Install or generate a certificate for `admin.beachwaysgroup.com`

## Troubleshooting

### Common Issues:
1. **404 Errors on Page Refresh**: Ensure `.htaccess` is uploaded and working
2. **API Errors**: Check environment variables and CORS settings
3. **Build Errors**: Run `npm run build` locally first to catch issues

### File Structure on Server:
```
public_html/admin/
├── .htaccess
├── index.html
├── assets/
│   ├── index-*.js
│   ├── index-*.css
│   └── *.jpg
├── placeholder.svg
└── robots.txt
```

## Maintenance

- To update the application:
  1. Run `npm run build` locally
  2. Upload new `dist` contents to cPanel
  3. Clear browser cache if needed

- Monitor performance through cPanel's metrics and analytics tools