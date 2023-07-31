import React, { useEffect, useState } from 'react';
import { Page, Text, View, Image, Document, StyleSheet, Font, Svg } from '@react-pdf/renderer';
import { styles } from './styles/PDFStyles.js';
import background from './assets/background.png'
import pic from './assets/background.jpg';
import csvData from './CSVdata/Posts.csv'
import { useFetchPosts } from '../hooks/useFetchPosts.jsx';
import axios from 'axios';
import replacement from './assets/background.jpg';
import defaultImage from './assets/default.jpg';
import Comic from './Fonts/Comic/ComicNeue-Regular.ttf';
import ComicBold from './Fonts/Comic/ComicNeue-BoldItalic.ttf';
import ComicItalic from './Fonts/Comic/ComicNeue-Italic.ttf';
import Roboto from './Fonts/Roboto/Roboto-Regular.ttf';
import RobotoBold from './Fonts/Roboto/Roboto-Bold.ttf';
import RobotoItalic from './Fonts/Roboto/Roboto-Italic.ttf';
import verified from './assets/verified.png';
const { createCanvas, loadImage } = require('canvas');
const pixelmatch = require('pixelmatch');


const removeLineBreaks = (text) => {
  // Replace all line breaks with a space
  return text.replace(/(\r\n|\n|\r)/gm, ' ');
};



Font.register({
  family: 'Comic', fonts: [
    { src: Comic },
    { src: ComicBold, fontStyle: 'italic', fontWeight: 700 },
    { src: ComicItalic, fontStyle: 'italic', fontWeight: 400 },
  ]
});


Font.register({
  family: 'Roboto', fonts: [
    { src: Roboto },
    { src: RobotoBold, fontStyle: 'normal', fontWeight: 700 },
    { src: RobotoItalic, fontStyle: 'italic', fontWeight: 400 },
  ]
});

Font.registerEmojiSource({
  format: 'png',
  url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
});



const PDFGenerator = ({ id }) => {

  const [responseMessage, setResponseMessage] = useState('');

  const handleApiCall = async (posts) => {
    const apiUrl = 'http://localhost:8000/api/'; // Replace with your Django API endpoint URL

    const postData = { "posts": posts };

    axios
      .post(apiUrl, postData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error occurred during API call:', error);
        setResponseMessage('Error occurred during API call.');
      });
  };



  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzNzc3OTI2LCJpYXQiOjE2ODg1OTM5MjYsImp0aSI6IjEyMWU1MWYwYzQ0MTQzOGFiNTc0YmQzNTkxZmE5NzdkIiwidXNlcl9pZCI6N30.X5Ape5UBLUj5HbjRScndjCjjtuBRNGIASR6MN6pmSQk'
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [test, setTest] = useState(false);


  const [largerPosts, setLargerPosts] = useState([]);
  const [largePosts, setLargePosts] = useState([]);
  const [mediumPosts, setMediumPosts] = useState([]);
  const [semiMediumPosts, setSemiMediumPosts] = useState([]);
  const [smallPosts, setSmallPosts] = useState([]);
  const [smallerPosts, setSmallerPosts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://yearbook.sarc-iitb.org/api/posts/others/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });



        const responseData = response.data;


        const postData = { "posts": responseData };

        const newResponse = await axios.post("http://localhost:8000/api/", postData)

        const newResponseData = newResponse.data;

        let zerothSet = []
        let firstSet = []
        let secondSet = []
        let thirdSet = []
        let fourthSet = []
        let fifthSet = []



        const zerothSetFinal = []
        const firstSetFinal = []
        const secondSetFinal = []
        const thirdSetFinal = []
        const fourthSetFinal = []
        const fifthSetFinal = []



        newResponseData.forEach((post) => {

          post.content = removeLineBreaks(post.content);

          if (post.content.length >= 1700) {
            zerothSet.push(post);
          }

          else if ((post.content.length >= 1400) && (post.content.length < 1700)) {
            firstSet.push(post)
          }

          else if ((post.content.length >= 800) && (post.content.length < 1400)) {
            secondSet.push(post)
          }

          else if ((post.content.length < 800) && (post.content.length >= 300)) {
            thirdSet.push(post)
          }

          else {
            fourthSet.push(post)
          }

          // else {
          //   fifthSet.push(post)
          // }

        })


        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
        }


        function sortWithPattern(arr, length) {
          // Separate big and small numbers
          const bigPosts = arr.filter((post) => post.content.length > length/2);
          const smallPosts = arr.filter((post) => post.content.length <= length/2);

          // Shuffle big and small number arrays
          shuffleArray(bigPosts);
          shuffleArray(smallPosts);

          const result = [];

          // Interleave the elements from both arrays
          for (let i = 0; i < Math.max(bigPosts.length, smallPosts.length); i++) {
            if (bigPosts[i]) result.push(bigPosts[i]);
            if (smallPosts[i]) result.push(smallPosts[i]);
          }

          return result;
        }



        if (fifthSet.length > 0) {

          fifthSet.sort((a, b) => a.content.length - b.content.length);


          let leftPosts = fifthSet.length % 12

          if (leftPosts !== 0) {
            for (let i = 0; i < leftPosts; i += 1) {
              fourthSet.push(fifthSet.pop(fifthSet[i]))
            }
          }


          shuffleArray(fifthSet);

          fifthSet = sortWithPattern(fifthSet, 300);




          for (let i = 0; i < fifthSet.length; i += 12) {
            let chunk = fifthSet.slice(i, i + 12);
            let temp = []

            for (let j = 0; j < chunk.length; j += 2) {
              let chunk2 = chunk.slice(j, j + 2)
              temp.push(chunk2)
            }

            fifthSetFinal.push(temp);
          }

        }




        if (fourthSet.length > 0) {

          fourthSet.sort((a, b) => a.content.length - b.content.length);

          let leftPosts = fourthSet.length % 11

          if (leftPosts !== 0) {
            for (let i = 0; i < leftPosts; i += 1) {
              thirdSet.push(fourthSet.pop(fourthSet[i]))
            }
          }

          shuffleArray(fourthSet);

          fourthSet = sortWithPattern(fourthSet, 300);


          for (let i = 0; i < fourthSet.length; i += 11) {
            let chunk = fourthSet.slice(i, i + 11);
            fourthSetFinal.push(chunk);
          }

        }




        if (thirdSet.length > 0) {

          thirdSet.sort((a, b) => a.content.length - b.content.length);

          let leftPosts = thirdSet.length % 9

          if (leftPosts !== 0) {
            for (let i = 0; i < leftPosts; i += 1) {
              secondSet.push(thirdSet.pop(thirdSet[i]))
            }
          }

          shuffleArray(thirdSet);

          thirdSet = sortWithPattern(thirdSet, 1000);

          for (let i = 0; i < thirdSet.length; i += 9) {
            let chunk = thirdSet.slice(i, i + 9);
            thirdSetFinal.push(chunk);
          }

        }


        if (secondSet.length > 0) {

          secondSet.sort((a, b) => a.content.length - b.content.length);

          let leftPosts = secondSet.length % 7

          if (leftPosts !== 0) {
            for (let i = 0; i < leftPosts; i += 1) {
              firstSet.push(secondSet.pop(secondSet[i]))
            }
          }

          shuffleArray(secondSet)
          secondSet = sortWithPattern(secondSet, 2200);


          for (let i = 0; i < secondSet.length; i += 7) {
            let chunk = secondSet.slice(i, i + 7);
            secondSetFinal.push(chunk);
          }

        }



        if (firstSet.length > 0) {

          firstSet.sort((a, b) => a.content.length - b.content.length);

          let leftPosts = firstSet.length % 5;

          if (leftPosts !== 0 && zerothSet.length !== 0) {
            for (let i = 0; i < leftPosts; i += 1) {
              zerothSet.push(firstSet.pop(firstSet[i]))
            }
          }


          shuffleArray(firstSet)
          firstSet = sortWithPattern(firstSet, 3000);

          for (let i = 0; i < firstSet.length; i += 5) {
            let chunk = firstSet.slice(i, i + 5);
            firstSetFinal.push(chunk);
          }


        }


        if (zerothSet.length > 0) {
          for (let i = 0; i < zerothSet.length; i += 3) {
            let chunk = zerothSet.slice(i, i + 3);
            zerothSetFinal.push(chunk);
          }
        }




        setLargerPosts(zerothSetFinal)
        setLargePosts(firstSetFinal)
        setMediumPosts(secondSetFinal)
        setSemiMediumPosts(thirdSetFinal)
        setSmallPosts(fourthSetFinal)
        setSmallerPosts(fifthSetFinal)



        setLoading(false);


      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);



  if (loading || data === null) {
    <Document>
      Akash
    </Document>
  }



  return (
    <Document>


      {smallerPosts && smallerPosts.map((posts, index) => {

        return <Page size="A4" style={styles.page}>
          <View key={index} style={styles.section}>
            <Image src={background} style={styles.backgroundImg} />
            <View style={styles.containerr}>
              {posts.map((postSet) => {
                return <View style={styles.smallerPostsContaner}>
                  {postSet.map((post) => {
                    return <View key={post.id} style={styles.smallerPostContainer}>
                      <View style={{ padding: "4%" }}>
                        <Image src={post.is_anonymous
                          ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `${post.written_by_profile.profile_image}`} style={styles.smallerProfilePic} />
                      </View>
                      <View style={[styles.textContainer, { width: "120% !important" }]}>
                        <Text style={styles.content}>{post.content}</Text>
                        <View style={{ width: "100%", position: "relative" }}>
                          <Text style={[{ color: "black" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                        </View>
                      </View>
                    </View>
                  })}
                </View>
              })}

            </View>
          </View>
        </Page>
      })}



      {smallPosts && smallPosts.length !== 0 && smallPosts.map((posts, index) => {
        let color = ["black"];

        function randomColor() {
          return color[Math.floor(Math.random() * color.length)];
        }

        return <Page size="A4" style={styles.page}>
          <View key={index} style={styles.section}>
            <Image src={background} style={styles.backgroundImg} />
            <View style={styles.container}>
              <View>
                {posts &&
                  posts.map((post, key) => {
                    const leftPost = key % 2 === 0;
                    return (
                      <View key={post.id}>
                        {leftPost && (
                          <View style={[styles.postContainer, styles.smallHeight]}>
                            <View styles={styles.imageContainer}>
                              <Image src={post.is_anonymous
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : (`${post.written_by_profile.profile_image}`)} style={[styles.profilePicLeft, styles.smallProfilePic]} />
                            </View>
                            <View style={[styles.textContainer, styles.smallWidth]}>
                              <Text style={styles.content}>{post.content}</Text>
                              <View style={{ width: "100%", position: "relative" }}>

                                <Text style={[{ color: "black" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`} {!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />} </Text>
                              </View>
                            </View>
                          </View>
                        )}

                        {!leftPost && (
                          <View style={[styles.postContainer, styles.smallHeight]}>
                            <View style={[styles.textContainerRight, styles.smallWidth]}>
                              <Text style={styles.content}>{post.content}</Text>
                              <View style={{ width: "100%", position: "relative" }}>
                                <Text style={[{ color: "black" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                              </View>
                            </View>
                            <View styles={styles.imageContainerRight}>
                              <Image src={post.is_anonymous
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `${post.written_by_profile.profile_image}`} style={[styles.profilePicRight, styles.smallProfilePic]} />
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        </Page>
      })}


      {semiMediumPosts && semiMediumPosts.length !== 0 && semiMediumPosts.map((posts, index) => {
        let color = ["#9A2617", "#865dff", "#C2571A"];

        function randomColor() {
          return color[Math.floor(Math.random() * color.length)];
        }

        return <Page size="A4" style={styles.page}>
          <View key={index} style={styles.section}>
            <Image src={background} style={styles.backgroundImg} />
            <View style={styles.container}>
              <View>
                {posts &&
                  posts.map((post, key) => {
                    const leftPost = key % 2 === 0;
                    return (
                      <View key={post.id}>
                        {leftPost && (
                          <View style={[styles.postContainer, styles.semiMediumHeight]}>
                            <View styles={styles.imageContainer}>
                              <Image src={post.is_anonymous
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `${post.written_by_profile.profile_image}`} style={[styles.profilePicLeft, styles.semiMediumProfilePic]} />
                            </View>
                            <View style={[styles.textContainer, styles.semiMediumWidth]}>
                              <Text style={styles.content}>{post.content}</Text>
                              <View style={{ width: "100%", position: "relative" }}>
                                <Text style={[{ color: "black" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`} {!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />} </Text>
                              </View>
                            </View>
                          </View>
                        )}

                        {!leftPost && (
                          <View style={[styles.postContainer, styles.semiMediumHeight]}>
                            <View style={[styles.textContainerRight, styles.semiMediumWidth]}>
                              <Text style={styles.content}>{post.content}</Text>
                              <View style={{ width: "100%", position: "relative" }}>
                                <Text style={[{ color: "black" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`} {!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                              </View>
                            </View>
                            <View styles={styles.imageContainerRight}>
                              <Image src={post.is_anonymous
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `${post.written_by_profile.profile_image}`} style={[styles.profilePicRight, styles.semiMediumProfilePic]} />
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        </Page>
      })}



      {mediumPosts && mediumPosts.length !== 0 && mediumPosts.map((posts, index) => {
        let color = ["#9A2617", "#865dff", "#C2571A"];

        function randomColor() {
          return color[Math.floor(Math.random() * color.length)];
        }

        return <Page size="A4" style={styles.page}>
          <View key={index} style={styles.section}>
            <Image src={background} style={styles.backgroundImg} />
            <View style={styles.container}>
              <View>
                {posts &&
                  posts.map((post, key) => {
                    const leftPost = key % 2 === 0;
                    return (
                      <View key={post.id}>
                        {leftPost && (
                          <View style={[styles.postContainer, styles.mediumHeight]}>
                            <View styles={styles.imageContainer}>
                              <Image src={post.is_anonymous
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `${post.written_by_profile.profile_image}`} style={[styles.profilePicLeft, styles.mediumProfilePic]} />
                            </View>
                            <View style={[styles.textContainer, styles.mediumWidth]}>
                              <Text style={styles.content}>{post.content}</Text>
                              <View style={{ width: "100%", position: "relative" }}>
                                <Text style={[{ color: "black" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                              </View>
                            </View>
                          </View>
                        )}

                        {!leftPost && (
                          <View style={[styles.postContainer, styles.mediumHeight]}>
                            <View style={[styles.textContainerRight, styles.mediumWidth]}>
                              <Text style={styles.content}>{post.content}</Text>
                              <View style={{ width: "100%", position: "relative" }}>
                                <Text style={[{ color: "black" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                              </View>
                            </View>
                            <View styles={styles.imageContainerRight}>
                              <Image src={post.is_anonymous
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `${post.written_by_profile.profile_image}`} style={[styles.profilePicRight, styles.mediumProfilePic]} />
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        </Page>
      })}




      {largePosts && largePosts.length !== 0 && largePosts.map((posts, index) => {
        let color = ["#9A2617", "#865dff", "#C2571A"];

        function randomColor() {
          return color[Math.floor(Math.random() * color.length)];
        }

        return <Page size="A4" style={styles.page}>
          <View key={index} style={styles.section}>
            <Image src={background} style={styles.backgroundImg} />
            <View style={styles.container}>
              <View>
                {posts &&
                  posts.map((post, key) => {
                    const leftPost = key % 2 === 0;
                    return (
                      <View key={post.id}>
                        {leftPost && (
                          <View style={[styles.postContainer, styles.largeHeight]}>
                            <View styles={styles.imageContainer}>
                              <Image src={post.is_anonymous
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `${post.written_by_profile.profile_image}`} style={[styles.profilePicLeft, styles.largeProfilePic]} />
                            </View>
                            <View style={[styles.textContainer, styles.largeWidth]}>
                              <Text style={styles.content}>{post.content}</Text>
                              <View style={{ width: "100%", position: "relative" }}>
                                <Text style={[{ color: "black" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                              </View>
                            </View>
                          </View>
                        )}

                        {!leftPost && (
                          <View style={[styles.postContainer, styles.largeHeight]}>
                            <View style={[styles.textContainerRight, styles.largeWidth]}>
                              <Text style={styles.content}>{post.content}</Text>
                              <View style={{ width: "100%", position: "relative" }}>
                                <Text style={[{ color: "black" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                              </View>
                            </View>
                            <View styles={styles.imageContainerRight}>
                              <Image src={post.is_anonymous
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `${post.written_by_profile.profile_image}`} style={[styles.profilePicRight, styles.largeProfilePic]} />
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        </Page>
      })}





      {largerPosts && largerPosts.length !== 0 && largerPosts.map((posts, index) => {
        let color = ["#9A2617", "#865dff", "#C2571A"];

        function randomColor() {
          return color[Math.floor(Math.random() * color.length)];
        }

        return <Page size="A4" style={styles.page}>
          <View key={index} style={styles.section}>
            <Image src={background} style={styles.backgroundImg} />
            <View style={styles.container}>
              <View>
                {posts &&
                  posts.map((post, key) => {
                    const leftPost = key % 2 === 0;
                    return (
                      <View key={post.id}>
                        {leftPost && (
                          <View style={[styles.postContainer, styles.largerHeight]}>
                            <View styles={styles.imageContainer}>
                              <Image src={post.is_anonymous
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `${post.written_by_profile.profile_image}`} style={[styles.profilePicLeft, styles.largerProfilePic]} />
                            </View>
                            <View style={[styles.textContainer, styles.largerWidth]}>
                              <Text style={styles.content}>{post.content}</Text>
                              <View style={{ width: "100%", position: "relative" }}>
                                <Text style={[{ color: "black" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                              </View>
                            </View>
                          </View>
                        )}

                        {!leftPost && (
                          <View style={[styles.postContainer, styles.largerHeight]}>
                            <View style={[styles.textContainerRight, styles.largerWidth]}>
                              <Text style={styles.content}>{post.content}</Text>
                              <View style={{ width: "100%", position: "relative" }}>
                                <Text style={[{ color: "black" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                              </View>
                            </View>
                            <View styles={styles.imageContainerRight}>
                              <Image src={post.is_anonymous
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `${post.written_by_profile.profile_image}`} style={[styles.profilePicRight, styles.largerProfilePic]} />
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        </Page>
      })}



      {/* 
      {largePosts && largePosts.length !== 0 && test && largePosts.map((posts, index) => {
        let color = ["#9A2617", "#865dff", "#C2571A"];

        function randomColor() {
          return color[Math.floor(Math.random() * color.length)];
        }

        if (index === largePosts.length - 1) {
          return <Page size="A4" style={styles.page}>
            <View key={index} style={styles.section}>
              <Image src={background} style={styles.backgroundImg} />
              <View style={[styles.container]}>
                {posts &&
                  posts.map((post, key) => {
                    const leftPost = key % 2 === 0;
                    return (
                      <View key={post.id}>
                        {leftPost && (
                          <View style={[styles.postContainer, styles.largeHeight]}>
                            <View styles={styles.imageContainer}>
                              <Image src={post.is_anonymous
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `${post.written_by_profile.profile_image}`} style={styles.profilePicLeft} />
                            </View>
                            <View style={[styles.textContainer, styles.largeWidth]}>
                              <Text style={styles.content}>{post.content}</Text>
                              <View style={{ width: "100%", position: "relative" }}>
                                <Text style={[{ color: "black" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                              </View>
                            </View>
                          </View>
                        )}

                        {!leftPost && (

                          <View style={[styles.largeHeight, { display: "flex", flexDirection: "column", width: "100%" }]}>
                            <View style={[styles.smallerPostsContanerr, styles.apniHeight]}>
                              {post[0].map((post) => {
                                return <View key={post.id} style={styles.smallerPostContainerr}>
                                  <View style={{ padding: "4%" }}>
                                    <Image src={post.is_anonymous
                                      ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `${post.written_by_profile.profile_image}`} style={styles.smallerProfilePicc} />
                                  </View>
                                  <View style={[styles.textContainer, { width: "120% !important" }]}>
                                    <Text style={styles.content}>{post.content}</Text>
                                    <View style={{ width: "100%", position: "relative" }}>
                                      <Text style={[{ color: "black" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                    </View>
                                  </View>
                                </View>
                              })}
                            </View>
                            <View style={[styles.smallerPostsContanerr, styles.apniHeight]}>
                              {post[1].map((post) => {
                                return <View key={post.id} style={styles.smallerPostContainerr}>
                                  <View style={{ padding: "4%" }}>
                                    <Image src={post.is_anonymous
                                      ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `${post.written_by_profile.profile_image}`} style={styles.smallerProfilePicc} />
                                  </View>
                                  <View style={[styles.textContainer, { width: "120% !important" }]}>
                                    <Text style={styles.content}>{post.content}</Text>
                                    <View style={{ width: "100%", position: "relative" }}>
                                      <Text style={[{ color: "black" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                    </View>
                                  </View>
                                </View>
                              })}
                            </View>
                          </View>

                        )}

                      </View>
                    );
                  })}
              </View>
            </View>
          </Page>
        }



        return <Page size="A4" style={styles.page}>
          <View key={index} style={styles.section}>
            <Image src={background} style={styles.backgroundImg} />
            <View style={styles.container}>
              <View>
                {posts &&
                  posts.map((post, key) => {
                    const leftPost = key % 2 === 0;
                    return (
                      <View key={post.id}>
                        {leftPost && (
                          <View style={[styles.postContainer, styles.largeHeight]}>
                            <View styles={styles.imageContainer}>
                              <Image src={post.is_anonymous
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `${post.written_by_profile.profile_image}`} style={[styles.profilePicLeft, styles.largeProfilePic]} />
                            </View>
                            <View style={[styles.textContainer, styles.largeWidth]}>
                              <Text style={styles.content}>{post.content}</Text>
                              <View style={{ width: "100%", position: "relative" }}>
                                <Text style={[{ color: "black" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                              </View>
                            </View>
                          </View>
                        )}

                        {!leftPost && (
                          <View style={[styles.postContainer, styles.largeHeight]}>
                            <View style={[styles.textContainerRight, styles.largeWidth]}>
                              <Text style={styles.content}>{post.content}</Text>
                              <View style={{ width: "100%", position: "relative" }}>
                                <Text style={[{ color: "black" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}</Text>
                              </View>
                            </View>
                            <View styles={styles.imageContainerRight}>
                              <Image src={post.is_anonymous
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `${post.written_by_profile.profile_image}`} style={[styles.profilePicRight, styles.largeProfilePic]} />
                            </View>
                          </View>
                        )}
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        </Page>
      })}
 */}





    </Document>

  );
};

export default PDFGenerator;



