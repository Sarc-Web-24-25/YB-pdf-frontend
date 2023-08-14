import React, { useState, useEffect, useRef } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  PDFViewer,
} from "@react-pdf/renderer";
import PDFGenerator from "./Pages/PDFGenerator";

const App = () => {
  const idList = [205]; // Replace this with your actual list of ids

  const ids = [
    // 66, 47,
    //  63, 1578, 713, 1598, 1375, 59,
    // 1116, 70, 774, 1030, 1756, 339,
    // 772, 4063, 167, 2751, 23, 1719,
    //  976, 3675, 439, 904, 1568, 334, 1241, 729,
    // 484, 956, 626, 84, 888, 3855,
    938, 469, 839, 497, 1051, 22, 2777, 4722,
    3715, 1288, 502, 871, 912, 831,
    69, 238, 971, 749,
    1131, 3839, 58, 2762,
    989, 916,
  ];
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
          <PDFGenerator id={entry} idList={ids} />
        </PDFViewer>
      ))}
    </div>
  );
};

export default App;
