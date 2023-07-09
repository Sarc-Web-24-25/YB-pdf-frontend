import { StyleSheet } from "@react-pdf/renderer";


export const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  backgroundImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  section: {
    position: "relative",
    zIndex: 1,
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    fontFamily: "Helvetica"
  }
});