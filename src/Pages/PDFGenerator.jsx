import React, { useEffect, useState } from 'react';
import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import { styles } from './styles/PDFStyles.js';
import background from './assets/background.png'
import csvData from './CSVdata/Posts.csv'



const PDFGenerator = () => {


  const [data, setData] = useState([]);

  useEffect(() => {


    fetch(csvData) // Replace with the appropriate URL or file path if needed
      .then(response => response.text())
      .then(csvText => {
        // Pass the CSV text to the parseCSV function
        const rows = csvText.split('\n');
        const headers = rows[0].split(','); // Assuming the first row contains headers
        const results = [];

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i].split(',');
          const rowData = {};

          for (let j = 0; j < headers.length; j++) {
            rowData[headers[j]] = row[j];
          }

          results.push(rowData);
        }


        setData(results);
      })
      .catch(error => {
        console.error('Error reading CSV file:', error);
      });


  }, []);


  const MAX_POSTS_PER_PAGE = 4;

  const totalPosts = data.length;
  const totalPages = Math.ceil(totalPosts / MAX_POSTS_PER_PAGE);

  const getPageData = (page) => {
    const start = (page - 1) * MAX_POSTS_PER_PAGE;
    const end = start + MAX_POSTS_PER_PAGE;
    return data.slice(start, end);
  };



  return (
    <Document>
      {Array.from(Array(totalPages).keys()).map((page) => {
        
        <Page size="A4" style={styles.page} >
          <View style={styles.section}>
            <Image src={background} style={styles.backgroundImg} />
            <View style={styles.container}>

              <View>
                <View style={styles.postContainer}>
                  <View styles={styles.imageContainer}>
                    <Image src={background} style={styles.profilePicLeft} />
                    <Text style={styles.profileTextLeft}>John Doe</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.content}>{"post.content"}</Text>
                  </View>
                </View>

                <View style={styles.postContainer}>
                  <View style={styles.textContainerRight}>
                    <Text style={styles.content}>{"post.content"}</Text>
                  </View>
                  <View styles={styles.imageContainerRight}>
                    <Image src={background} style={styles.profilePicRight} />
                    <Text style={styles.profileTextRight}>John Doe</Text>
                  </View>
                </View>
              </View>

            </View>
          </View>
        </Page>
      })}
    </Document>
  );
};

export default PDFGenerator;
