import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const blobUrl = (import.meta.env as any).VITE_BLOB_URL || '';
const pdfUrl = `${blobUrl}/index.pdf`;

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
  }, [pdfUrl]);

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
      <h1>PDF Viewer</h1>
      <div style={{ marginBottom: '20px' }}>
        {loading && <p>Loading PDF...</p>}
        {error && <p style={{ color: 'red' }}>Error loading PDF: {error}</p>}
        {!loading && !error && numPages && (
          <p>
            Page {pageNumber} of {numPages}
          </p>
        )}
      </div>

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
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            style={{ marginRight: '10px', padding: '8px 16px' }}
          >
            Previous
          </button>
          <button
            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
            disabled={pageNumber >= numPages}
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

