import { StyleSheet } from "@react-pdf/renderer";

let color = ["black", "blue", "red", "yellow"];

function randomColor() {
  return color[Math.floor(Math.random() * color.length)];
}

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
    objectFit: "cover",
    borderRadius: "6px",
  },

  smallerProfilePic: {
    width: "0.7in",
    height: "0.7in",
    transform: 'rotate(1deg)',
    transformOrigin: "center center",
    objectFit: "cover",
    borderRadius: "6px",
  },

  smallerProfilePicc: {
    width: "1in",
    height: "1in",
    transform: 'rotate(1deg)',
    transformOrigin: "center center",
    objectFit: "cover",
    borderRadius: "6px",
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

    objectFit: "cover",
    borderRadius: "6px",
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
    justifyContent: "flex-start",
  },

  postContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },


  // smallerPostContainer: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },


  smallHeight: {
    height: "7.81vh",
  },

  smallWidth: {
    width: "84%",
  },
  
  semiMediumHeight: {
    height: "9.55vh",
  },

  semiMediumWidth: {
    width: "82%",
  },

  mediumHeight: {
    height: "12.28vh",
  },

  mediumWidth: {
    width: "80%",
  },

  largeHeight: {
    height: "17.5vh",
  },

  apniHeight: {
    height: "22.5vh",
  },

  largeWidth: {
    width: "71%",
  },

  largerHeight: {
    height: "43vh"
  },

  largerWidth: {
    width: "70%",
  },

  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },


  textContainerRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },


  content: {
    fontSize: 8.5,
    fontFamily: "Roboto",
    // fontStyle: "normal",
    // fontWeight: 400,
  },





  smallerPostsContaner: {
    display: "flex",
    width: "100vw",
    paddingLeft: "7vw",
    paddingRight: "7vw",
    flexDirection: "row",
    justifyContent: "space-between"
  },


  smallerPostsContanerr: {
    display: "flex",
    width: "80vw",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  smallerPostContainer: {
    width: "43vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0.5in",
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
    fontSize: 12,
  },

  smallerPostsContent: {
    width: "100%"
  },



  smallProfilePic:{
    width: "0.7in",
    height: "0.7in",
  },

  semiMediumProfilePic:{
    width: "0.85in",
    height: "0.85in",
  },

  mediumProfilePic:{
    width: "1.1in",
    height: "1.1in",
  },


  largeProfilePic:{
    width: "1.3in",
    height: "1.3in",
  },

  largerProfilePic: {
    width: "1.4in",
    height: "1.4in",
  },


  smallProfileText:{
    position: "absolute",
    fontSize: 10,
    fontFamily: "Comic",
    fontWeight: 700,
    fontStyle: "italic",
    marginBottm: 10,
    right: 0,
  },

  mediumProfileText:{
    fontSize: 11,
  },

  largeProfileText:{
    fontSize: 12,
  },


  verified: {
    width: "0.1in",
    height: "0.1in",
  }



});