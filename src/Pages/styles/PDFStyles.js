import { StyleSheet } from "@react-pdf/renderer";


export const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  backgroundImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  section: {
    position: "relative",
    zIndex: 1,
    flexGrow: 1,
  },

  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'rotate(-10deg)',
  },

  imageContainerRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'rotate(10deg)',
  },

  profileTextLeft:{
    margin: 5,
    marginLeft: 25,
    transform: 'rotate(-10deg)',
  },

  profileTextRight:{
    margin: 5,
    marginRight: 25,
    transform: 'rotate(10deg)',
  },

  profilePicLeft: {
    width: "1.7in",
    height: "1.7in",
    transform: 'rotate(-10deg)',
  },

  profilePicRight: {
    width: "1.7in",
    height: "1.7in",
    transform: 'rotate(10deg)',
  },

  container: {
    paddingTop: "12%",
    paddingBottom: "12%",
    paddingLeft: "10%",
    paddingRight: "10%",
  },

  postContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  textContainer: {
    width: "70%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },


  textContainerRight: {
    width: "70%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },


  content: {
    fontSize: 12,
  }
});