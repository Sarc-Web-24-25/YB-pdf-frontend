import React from 'react';
import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import { styles } from './styles/PDFStyles.js';
import background from './assets/background.jpg'

const PDFGenerator = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page} >
        <View style={styles.section}>
          <Image src={background} style={styles.backgroundImg} />
          <Text style={styles.text}>First Page</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFGenerator;
