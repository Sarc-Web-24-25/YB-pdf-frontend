import React, { useState, useEffect, useRef } from "react";
import { PDFDownloadLink, Document, Page, PDFViewer } from "@react-pdf/renderer";
import PDFGenerator from "./Pages/PDFGenerator";

const App = () => {
  const idList = [23, 84]; // Replace this with your actual list of ids
  const downloadAnchorRef = useRef(null);
  const [readyToDownload, setReadyToDownload] = useState(false);

  useEffect(() => {
    const generatePDFs = async () => {
      for (const id of idList) {
        // Simulate the asynchronous PDF generation process with a timeout
        await new Promise((resolve) => setTimeout(resolve, 5000));
        // Actual PDF generation logic can be placed here
      }
      setReadyToDownload(true);
      // download()
    };

    generatePDFs();
  }, []);

  // function download(){
  //   const downloadLinks = downloadAnchorRef.current.querySelectorAll('a');
  //   downloadLinks.forEach((link) => link.click());
  // }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {/* <div ref={downloadAnchorRef}>
          {idList.map((entry) => (
            <PDFDownloadLink
              key={entry}
              document={<PDFGenerator id={entry} />}
              fileName={`Yearbook(${entry})`}
            >
              {({ loading }) => (loading ? 'Loading document...' : `Yearbook(${entry})`)}
            </PDFDownloadLink>
          ))}
        </div> */}
      {idList.map((entry) => (
        <PDFViewer key={entry} style={{ width: "100%", height: "100%" }}>
          <PDFGenerator id={entry} />
        </PDFViewer>
      ))}
    </div>
  );
};

export default App;
