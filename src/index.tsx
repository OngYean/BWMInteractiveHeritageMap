import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import plantsData from './plants.json';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const blobUrl = (import.meta.env as any).VITE_BLOB_URL || '';
const pdfUrl = `${blobUrl}/index.pdf`;

interface Plant {
  name_MS: string;
  name_EN: string;
  name: string;
  category: string;
  pgStart: string;
  pgEnd: string;
}

interface AppProps {}

const getPlantTitle = (plant: Plant): string => {
  const { name_MS, name_EN, name } = plant;

  // All three are the same
  if (name_MS === name_EN && name_EN === name) {
    return name;
  }

  // Malay and English are the same
  if (name_MS === name_EN) {
    return `${name_MS} - ${name}`;
  }

  // All different or only scientific is different
  return `${name_MS} / ${name_EN} - ${name}`;
};

// Media query hook for responsive design
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const App: React.FC<AppProps> = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plant, setPlant] = useState<Plant | null>(null);
  const [minPage, setMinPage] = useState(1);
  const [maxPage, setMaxPage] = useState(Infinity);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Get plant index from URL query parameter
    const params = new URLSearchParams(window.location.search);
    const plantIndex = params.get('index');

    if (plantIndex !== null) {
      const index = parseInt(plantIndex, 10);
      if (index >= 0 && index < plantsData.length) {
        const selectedPlant = plantsData[index] as Plant;
        setPlant(selectedPlant);

        // Set page range
        const pgStart = parseInt(selectedPlant.pgStart, 10);
        const pgEnd = parseInt(selectedPlant.pgEnd, 10);
        setMinPage(pgStart);
        setMaxPage(pgEnd);
        setPageNumber(pgStart);

        // Set document title
        const title = getPlantTitle(selectedPlant);
        document.title = title;
      } else {
        setError('Invalid plant index');
      }
    }

    setLoading(true);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error: Error) => {
    setError(error.message);
    setLoading(false);
  };

  const buttonSize = isMobile ? '40px' : '50px';
  const buttonFontSize = isMobile ? '18px' : '24px';
  const buttonTop = isMobile ? '10px' : '20px';
  const buttonSide = isMobile ? '10px' : '20px';
  const containerPadding = isMobile ? '10px' : '20px';

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: containerPadding,
      backgroundColor: '#f5f5f5'
    }}>
      {/* Floating Previous Button - Top Left */}
      {numPages && !loading && !error && (
        <button
          onClick={() => setPageNumber(prev => Math.max(prev - 1, minPage))}
          disabled={pageNumber <= minPage}
          style={{
            position: 'fixed',
            top: buttonTop,
            left: buttonSide,
            width: buttonSize,
            height: buttonSize,
            borderRadius: '50%',
            border: 'none',
            backgroundColor: pageNumber <= minPage ? '#cccccc' : '#333333',
            color: 'white',
            fontSize: buttonFontSize,
            cursor: pageNumber <= minPage ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            transition: 'background-color 0.3s ease',
          }}
          title="Previous page"
        >
          &#8249;
        </button>
      )}

      {/* Floating Next Button - Top Right */}
      {numPages && !loading && !error && (
        <button
          onClick={() => setPageNumber(prev => Math.min(prev + 1, maxPage))}
          disabled={pageNumber >= maxPage}
          style={{
            position: 'fixed',
            top: buttonTop,
            right: buttonSide,
            width: buttonSize,
            height: buttonSize,
            borderRadius: '50%',
            border: 'none',
            backgroundColor: pageNumber >= maxPage ? '#cccccc' : '#333333',
            color: 'white',
            fontSize: buttonFontSize,
            cursor: pageNumber >= maxPage ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            transition: 'background-color 0.3s ease',
          }}
          title="Next page"
        >
          &#8250;
        </button>
      )}

      {pdfUrl && (
        <div style={{
          border: '1px solid #ddd',
          padding: isMobile ? '5px' : '10px',
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: isMobile ? '100%' : 'auto',
          overflow: 'auto'
        }}>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<p>Loading document...</p>}
          >
            {loading ? (
              <p>Initializing PDF...</p>
            ) : (
              <Page
                pageNumber={pageNumber}
                scale={isMobile ? 1.0 : 1.5}
                width={isMobile ? window.innerWidth - 30 : undefined}
              />
            )}
          </Document>
        </div>
      )}
    </div>
  );
};

export default App;

