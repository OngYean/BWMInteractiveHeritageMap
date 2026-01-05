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

const App: React.FC<AppProps> = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plant, setPlant] = useState<Plant | null>(null);
  const [minPage, setMinPage] = useState(1);
  const [maxPage, setMaxPage] = useState(Infinity);

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

  return (
    <div style={{ padding: '20px' }}>

      {pdfUrl && (
        <div style={{ border: '1px solid #ccc', padding: '10px', maxWidth: '800px' }}>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<p>Loading document...</p>}
          >
            {loading ? (
              <p>Initializing PDF...</p>
            ) : (
              <Page pageNumber={pageNumber} />
            )}
          </Document>
        </div>
      )}

      {numPages && !loading && !error && (
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => setPageNumber(prev => Math.max(prev - 1, minPage))}
            disabled={pageNumber <= minPage}
            style={{ marginRight: '10px', padding: '8px 16px' }}
          >
            Previous
          </button>
          <button
            onClick={() => setPageNumber(prev => Math.min(prev + 1, maxPage))}
            disabled={pageNumber >= maxPage}
            style={{ padding: '8px 16px' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

