import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDFGenerator from './Pages/PDFGenerator';

const App = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        <PDFGenerator />
      </PDFViewer>
    </div>
  );
};

export default App;
