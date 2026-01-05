# BWM Interactive Heritage Map - PDF Viewer

A React application that renders PDF files from Vercel Blob storage using `react-pdf` and Vite.

## Features

- 📄 PDF rendering from Vercel Blob storage
- 📖 PDF pagination (Previous/Next buttons)
- ⚡ Fast development with Vite
- 🎯 TypeScript support
- 📱 Responsive design
- 🔧 PDF.js worker properly configured

## Environment Setup

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_BLOB_URL=https://your-blob-storage-url.public.blob.vercel-storage.com
```

The PDF viewer will fetch `index.pdf` from this URL.

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server at `http://localhost:3000` with hot module replacement (HMR) and automatically opens in browser.

```bash
npm run dev:debug
```
Starts the development server with Node debugger enabled for debugging.

### Build
```bash
npm run build
```
Runs TypeScript type checking and creates an optimized production build in the `dist/` directory.

### Production Build
```bash
npm run build:prod
```
Creates a production build with `NODE_ENV=production` and type checking.

### Preview
```bash
npm run preview
```
Previews the production build locally without opening browser.

```bash
npm run preview:open
```
Previews the production build and automatically opens in browser.

### Type Checking
```bash
npm run type-check
```
Runs TypeScript type checking without emitting files.

```bash
npm run type-check:watch
```
Runs TypeScript type checking in watch mode for continuous validation.

## Project Structure

```
src/
├── index.tsx       # Main PDF Viewer component
└── main.tsx        # React entry point
index.html          # HTML template
vite.config.ts      # Vite configuration
tsconfig.json       # TypeScript configuration
package.json        # Dependencies and scripts
```

## Technical Details

- **Framework**: React 19
- **Build Tool**: Vite 7
- **PDF Rendering**: react-pdf with PDF.js
- **Storage**: Vercel Blob
- **Language**: TypeScript

The PDF.js worker is automatically configured and bundled for proper PDF rendering in the browser.

## Deployment

The built `dist/` folder is ready for deployment to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any CDN

## License

Private

