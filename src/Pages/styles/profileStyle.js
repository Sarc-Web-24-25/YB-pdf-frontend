import { StyleSheet } from "@react-pdf/renderer";

export const stylesProfile = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  backgroundImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    opacity: 1, // Adjust the opacity value as needed
  },
  section: {
    // position: "relative",
    zIndex: 1,
    margin: 0,
    padding: 0,
    flexGrow: 1,
  },
  text: {
    fontFamily: "Lobster",
    fontSize: 11.5,
    paddingRight: '10px',
    color: 'black',
    textAlign: 'justify',
    lineHeight: 2.5,
    position: 'absolute',
  },
  contentContainer: {
    flexDirection: 'row',
  },
  contentContainer1: {
    flexDirection: 'row',
    transform: 'rotate(5deg)',
  },
  leftContainer: {
    marginTop: '60px',
    marginLeft: '60px',
    width: '400px',
    // marginRight: '10mm',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftImage: {
    width: '230px',
    height: '230px',
    borderRadius: '0%',
    borderStyle: 'solid',
    borderWidth: 6,
    borderColor: 'white',
    padding: 6,
    objectFit: 'cover',
  },
  rightContainer: {
    marginTop: '40px',
    width: '76%',
    marginRight: '10px',
    paddingRight: "10px"
  },
  leftContainer1: {
    marginTop: '110px',
    marginLeft: '30px',
    width: '80%',
    marginRight: '0mm',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '-20px',
  },
  leftImage1: {
    width: '220px',
    height: '220px', // Adjust the desired height here
    objectFit: 'cover !important',
    // borderRadius: 4,
    // marginBottom: '10px',
    // borderStyle: 'solid',
    // borderWidth: 6,
    // borderColor: 'white',
    // padding: 6,
  },
  rightContainer1: {
    marginTop: '110px',
    width: '80%',
    marginLeft: '-20px',
  },
  nameText: {
    textAlign: 'justify',
    marginTop: '10mm',
    fontSize: 18,
  },
  nicknameText: {
    textAlign: 'justify',
    marginTop: '20mm',
  },
  dobText: {
    textAlign: 'justify',
    marginTop: '26mm',
  },
  emailText: {
    textAlign: 'justify',
    marginTop: '32mm',
  },
  hostelText: {
    textAlign: 'justify',
    marginTop: '38mm',
  },
  room_noText: {
    textAlign: 'justify',
    marginTop: '44mm',
  },
  departmentText: {
    textAlign: 'justify',
    marginTop: '50mm',
  },
  programText: {
    textAlign: 'justify',
    marginTop: '56mm',
  },
  degreeText: {
    textAlign: 'justify',
    marginTop: '62mm',
  },
  join_yearText: {
    textAlign: 'justify',
    marginTop: '68mm',
  },
  graduation_yearText: {
    textAlign: 'justify',
    marginTop: '74mm',
  },
  careerText: {
    textAlign: 'justify',
    marginTop: '80mm',
  },
  taglineText: {
    textAlign: 'justify',
    marginTop: '86mm',
    lineHeight: '1'
  },
  topImageContainer: {
    width: '96%',
    marginLeft: '2%',
    marginRight: '2%',
    height: '120px',
    backgroundColor: '#000000',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topImage: {
    width: '90%',
    height: '100%',
    marginLeft: '5%',
    marginRight: '5%',
    // objectFit: 'cover',
    objectPosition: 'top'
  },
  container: {
    marginTop: '70px',
    marginLeft: '10%',
    marginRight: '10%',
    width: '80%',
    height: '420px',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    transform: 'rotate(0deg)',
    transformOrigin: 'center center',
  },
  gradientBox: {
    marginLeft: '10%',
    marginRight: '10%',
    width: '80%',
    height: '420px',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #F0F0F0 100%)',
    opacity: 0.6,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10px',
    marginLeft: '8px',
    marginRight: '8px',
    marginTop: '-1px'
  },
  imageContainer: {
    // width: '160px',
    // height: '180px',
    padding: '5px',
    borderRadius: 5,
  },
  image: {
    width: '175px',
    height: '180px',
    objectFit: 'cover',
    borderRadius: 5,
  },

});