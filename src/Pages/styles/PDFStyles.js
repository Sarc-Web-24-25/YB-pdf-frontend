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
    transformOrigin: "center center"
  },

  imageContainerRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'rotate(10deg)',
    transformOrigin: "center center"
  },

  profilePicRight: {
    width: "1.7in",
    height: "1.7in",
    transform: 'rotate(10deg)',
    transformOrigin: "center center",
    objectFit: "cover"
  },

  smallerProfilePic: {
    width: "1.7in",
    height: "1.7in",
    transform: 'rotate(1deg)',
    transformOrigin: "center center",
    objectFit: "cover"
  },


   profileTextRight:{
    fontSize: 15,
    textAlign: "center",
    margin: 5,
    marginLeft: -8,
    transform: 'rotate(10deg)',
    transformOrigin: "center center"
  },

  profileTextLeft:{
    fontSize: 15,
    textAlign: "center",
    margin: 5,
    marginLeft: 25,
    transform: 'rotate(-10deg)',
    transformOrigin: "center center"
  },

  smallerProfileText:{
    fontSize: 15,
    textAlign: "center",
    transform: 'rotate(1deg)',
    transformOrigin: "center center"
  },


  profilePicLeft: {
    
    width: "1.7in",
    height: "1.7in",
    transform: 'rotate(-10deg)',
    transformOrigin: "center center",

    objectFit: "cover"
  },

 

  container: {
    display: "flex",
    paddingTop: "7vh",
    paddingBottom: "7vh",
    paddingLeft: "10%",
    paddingRight: "10%",
    height: "100vh",
    justifyContent: "space-between",
  },



  containerr: {
    display: "flex",
    paddingTop: "7vh",
    paddingBottom: "7vh",
    height: "100vh",
    justifyContent: "space-between",
  },

  postContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },


  // smallerPostContainer: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },


  smallHeight: {
    height: "21.5vh",
  },

  mediumHeight: {
    height: "28.66vh",
  },

  largeHeight: {
    height: "43vh",
  },

  largerHeight: {
    height: "85vh"
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
  },





  smallerPostsContaner: {
    display: "flex",
    width: "100vw",
    flexDirection: "row",
    justifyContent: "space-around"
  },


  smallerPostsContanerr: {
    display: "flex",
    width: "80vw",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  smallerPostContainer: {
    width: "40vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  smallerPostContainerr: {
    width: "40vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0.5in",
  },

  smallerPostsImageContainer: {
   
  },

  smallerTextContainer: {
    display: "flex",
  },


  smallerPostsImage: {
    width: "1.7in",
    height: "1.7in",
    objectFit: "cover"
  },

  smallerPostsText: {
    fontSize: 14,
  },

  smallerPostsContent: {
    width: "100%"
  }



});