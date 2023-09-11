import React, { useState, useEffect, useRef } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  PDFViewer,
} from "@react-pdf/renderer";
import PDFGenerator from "./Pages/PDFGenerator";

const App = () => {
  const idList = [66]; // Replace this with your actual list of ids

  const ids = [[
    // 205, 167, 891, 1578, 642, 23, 772, 339, 976, 1719, 2295, 515, 2751, 1288, 831, 60, 1323, 405, 47, 63, 80, 326, 70, 2754, 956, 391, 69, 1073, 3704, 626, 823, 2279, 3291, 2018, 2188, 235, 1256, 2711, 940, 130, 87, 749, 279, 152, 49, 2779, 1598, 43, 717, 2760, 76, 1002, 1760, 1822, 3715, 213, 447, 3657, 4222, 84, 1891, 1375, 5065, 991
  ]];
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
          {idList.map((entry, index) => (
            <PDFDownloadLink
              key={entry}
              document={<PDFGenerator id={entry} idList={ids[index]} />}
              fileName={`Yearbook(${entry})`}
            >
              {({ loading }) => (loading ? 'Loading document...' : `Yearbook(${entry})`)}
            </PDFDownloadLink>
          ))}
        </div> */}
      {idList.map((entry, index) => (
        <PDFViewer key={entry} style={{ width: "100%", height: "100%" }}>
          <PDFGenerator id={entry} idList={ids[index]} />
        </PDFViewer>
      ))}
    </div>
  );
};

export default App;
