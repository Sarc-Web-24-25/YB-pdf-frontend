import React, { useEffect, useState } from 'react';
import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import { styles } from './styles/PDFStyles.js';
import background from './assets/background.png'
import pic from './assets/background.jpg';
import csvData from './CSVdata/Posts.csv'
import { useFetchPosts } from '../hooks/useFetchPosts.jsx';
import axios from 'axios';



const PDFGenerator = () => {


  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzNzc3OTI2LCJpYXQiOjE2ODg1OTM5MjYsImp0aSI6IjEyMWU1MWYwYzQ0MTQzOGFiNTc0YmQzNTkxZmE5NzdkIiwidXNlcl9pZCI6N30.X5Ape5UBLUj5HbjRScndjCjjtuBRNGIASR6MN6pmSQk'
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [test, setTest] = useState(false);


  const [largerPosts, setLargerPosts] = useState([]);
  const [largePosts, setLargePosts] = useState([]);
  const [mediumPosts, setMediumPosts] = useState([]);
  const [smallPosts, setSmallPosts] = useState([]);
  const [smallerPosts, setSmallerPosts] = useState([]);


  const [id, setId] = useState(23)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://yearbook.sarc-iitb.org/api/posts/others/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let responseData = response.data


        const zerothSet = []
        const firstSet = []
        const secondSet = []
        const thirdSet = []
        const fourthSet = []



        const zerothSetFinal = []
        const firstSetFinal = []
        const secondSetFinal = []
        const thirdSetFinal = []
        const fourthSetFinal = []



        responseData.forEach((post) => {

          if (post.content.length >= 2000) {
            zerothSet.push(post);
          }

          else if ((post.content.length >= 1500) && (post.content.length < 2000)) {
            firstSet.push(post)
          }

          else if ((post.content.length >= 400) && (post.content.length < 1500)) {
            secondSet.push(post)
          }

          else if ((post.content.length < 400) && (post.content.length > 100)) {
            thirdSet.push(post)
          }

          else {
            fourthSet.push(post)
          }

        })



        if (zerothSet.length > 0) {
          for (let i = 0; i < zerothSet.length; i += 1) {
            let chunk = zerothSet.slice(i, i + 1);
            zerothSetFinal.push(chunk);
          }
        }

        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
        }




        if (thirdSet.length > 0) {

          thirdSet.sort((a, b) => a.content.length - b.content.length);

          let leftPosts = thirdSet.length % 4

          if (leftPosts !== 0) {
            for (let i = 0; i < leftPosts; i += 1) {
              secondSet.push(thirdSet.pop(thirdSet[i]))
            }
          }

          shuffleArray(thirdSet);

          for (let i = 0; i < thirdSet.length; i += 4) {
            let chunk = thirdSet.slice(i, i + 4);
            thirdSetFinal.push(chunk);
          }


        }


        if (secondSet.length > 0) {

          secondSet.sort((a, b) => a.content.length - b.content.length);

          let leftPosts = secondSet.length % 3

          if (leftPosts !== 0) {
            for (let i = 0; i < leftPosts; i += 1) {
              firstSet.push(secondSet.pop(secondSet[i]))
            }
          }


          shuffleArray(secondSet)


          for (let i = 0; i < secondSet.length; i += 3) {
            let chunk = secondSet.slice(i, i + 3);
            secondSetFinal.push(chunk);
          }

        }



        if (firstSet.length > 0) {


          for (let i = 0; i < firstSet.length; i += 2) {
            let chunk = firstSet.slice(i, i + 2);
            firstSetFinal.push(chunk);
          }


          let leftPosts = firstSet.length % 2;

          if (leftPosts !== 0 && fourthSet.length !== 0) {
            setTest(true)
            let smallerPostsTemp = []

            smallerPostsTemp.push(fourthSet.pop(fourthSet[fourthSet.length - 1]))
            smallerPostsTemp.push(fourthSet.pop(fourthSet[fourthSet.length - 1]))

            firstSetFinal[firstSetFinal.length - 1].push(smallerPostsTemp)
          }

        }


        if (fourthSet.length > 0) {

          for (let i = 0; i < fourthSet.length; i += 6) {
            let chunk = fourthSet.slice(i, i + 6);
            let temp = []

            for (let j = 0; j < chunk.length; j += 2) {
              let chunk2 = chunk.slice(j, j + 2)
              temp.push(chunk2)
            }

            fourthSetFinal.push(temp);
          }

        }


        setLargerPosts(zerothSetFinal)
        setLargePosts(firstSetFinal)
        setMediumPosts(secondSetFinal)
        setSmallPosts(thirdSetFinal)
        setSmallerPosts(fourthSetFinal)



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


      {smallPosts && smallPosts.length !== 0 && smallPosts.map((posts, index) => {

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
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={styles.profilePicLeft} />
                              <Text style={styles.profileTextLeft}>{post.is_anonymous
                                ? post.written_by : post.written_by_profile.name}</Text>
                            </View>
                            <View style={styles.textContainer}>
                              <Text style={styles.content}>{post.content}</Text>
                            </View>
                          </View>
                        )}

                        {!leftPost && (
                          <View style={[styles.postContainer, styles.smallHeight]}>
                            <View style={styles.textContainerRight}>
                              <Text style={styles.content}>{post.content}</Text>
                            </View>
                            <View styles={styles.imageContainerRight}>
                              <Image src={post.is_anonymous
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={styles.profilePicRight} />
                              <Text style={styles.profileTextRight}>{post.is_anonymous
                                ? post.written_by : post.written_by_profile.name}</Text>
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
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={styles.profilePicLeft} />
                              <Text style={styles.profileTextLeft}>{post.is_anonymous
                                ? post.written_by : post.written_by_profile.name}</Text>
                            </View>
                            <View style={styles.textContainer}>
                              <Text style={styles.content}>{post.content}</Text>
                            </View>
                          </View>
                        )}

                        {!leftPost && (
                          <View style={[styles.postContainer, styles.mediumHeight]}>
                            <View style={styles.textContainerRight}>
                              <Text style={styles.content}>{post.content}</Text>
                            </View>
                            <View styles={styles.imageContainerRight}>
                              <Image src={post.is_anonymous
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={styles.profilePicRight} />
                              <Text style={styles.profileTextRight}>{post.is_anonymous
                                ? post.written_by : post.written_by_profile.name}</Text>
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




      {largePosts && largePosts.length !== 0 && !test && largePosts.map((posts, index) => {

        return <Page size="A4" style={styles.page}>
          <View key={index} style={styles.section}>
            <Image src={background} style={styles.backgroundImg} />
            <View style={[styles.container, { justifyContent: "flex-start" }]}>
              {posts &&
                posts.map((post, key) => {
                  const leftPost = key % 2 === 0;
                  return (
                    <View key={post.id}>
                      {leftPost && (
                        <View style={[styles.postContainer, styles.largeHeight]}>
                          <View styles={styles.imageContainer}>
                            <Image src={post.is_anonymous
                              ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={styles.profilePicLeft} />
                            <Text style={styles.profileTextLeft}>{post.is_anonymous
                              ? post.written_by : post.written_by_profile.name}</Text>
                          </View>
                          <View style={styles.textContainer}>
                            <Text style={styles.content}>{post.content}</Text>
                          </View>
                        </View>
                      )}

                      {!leftPost && (
                        <View style={[styles.postContainer, styles.largeHeight]}>
                          <View style={styles.textContainerRight}>
                            <Text style={styles.content}>{post.content}</Text>
                          </View>
                          <View styles={styles.imageContainerRight}>
                            <Image src={post.is_anonymous
                              ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={styles.profilePicRight} />
                            <Text style={styles.profileTextRight}>{post.is_anonymous
                              ? post.written_by : post.written_by_profile.name}</Text>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
            </View>
          </View>
        </Page>
      })}


      {largePosts && largePosts.length !== 0 && test && largePosts.map((posts, index) => {

        if (index === largePosts.length - 1) {
          return <Page size="A4" style={styles.page}>
            <View key={index} style={styles.section}>
              <Image src={background} style={styles.backgroundImg} />
              <View style={[styles.container, { justifyContent: "flex-start" }]}>
                {posts &&
                  posts.map((post, key) => {
                    const leftPost = key % 2 === 0;
                    return (
                      <View key={post.id}>
                        {leftPost && (
                          <View style={[styles.postContainer, styles.largeHeight]}>
                            <View styles={styles.imageContainer}>
                              <Image src={post.is_anonymous
                                ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={styles.profilePicLeft} />
                              <Text style={styles.profileTextLeft}>{post.is_anonymous
                                ? post.written_by : post.written_by_profile.name}</Text>
                            </View>
                            <View style={styles.textContainer}>
                              <Text style={styles.content}>{post.content}</Text>
                            </View>
                          </View>
                        )}

                        {!leftPost && (
                          <View style={[styles.smallerPostsContanerr, styles.largeHeight]}>
                            {post.map((post) => {
                              return <View key={post.id} style={styles.smallerPostContainerr}>
                                <View style={{ padding: "4%" }}>
                                  <Image src={post.is_anonymous
                                    ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={styles.smallerProfilePic} />
                                  <Text style={styles.smallerProfileText}>{post.is_anonymous
                                    ? post.written_by : post.written_by_profile.name}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                  <Text style={styles.content}>{post.content}</Text>
                                </View>
                              </View>
                            })}
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
            <View style={[styles.container, { justifyContent: "flex-start" }]}>
              {posts &&
                posts.map((post, key) => {
                  const leftPost = key % 2 === 0;
                  return (
                    <View key={post.id}>
                      {leftPost && (
                        <View style={[styles.postContainer, styles.largeHeight]}>
                          <View styles={styles.imageContainer}>
                            <Image src={post.is_anonymous
                              ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={styles.profilePicLeft} />
                            <Text style={styles.profileTextLeft}>{post.is_anonymous
                              ? post.written_by : post.written_by_profile.name}</Text>
                          </View>
                          <View style={styles.textContainer}>
                            <Text style={styles.content}>{post.content}</Text>
                          </View>
                        </View>
                      )}

                      {!leftPost && (
                        <View style={[styles.postContainer, styles.largeHeight]}>
                          <View style={styles.textContainerRight}>
                            <Text style={styles.content}>{post.content}</Text>
                          </View>
                          <View styles={styles.imageContainerRight}>
                            <Image src={post.is_anonymous
                              ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={styles.profilePicRight} />
                            <Text style={styles.profileTextRight}>{post.is_anonymous
                              ? post.written_by : post.written_by_profile.name}</Text>
                          </View>
                        </View>
                      )}


                    </View>
                  );
                })}
            </View>
          </View>
        </Page>
      })}



      {largerPosts && largerPosts.length !== 0 && largerPosts.map((posts, index) => {

        return <Page size="A4" style={styles.page}>
          <View key={index} style={styles.section}>
            <Image src={background} style={styles.backgroundImg} />
            <View style={styles.container}>
              {posts &&
                posts.map((post, key) => {
                  const leftPost = key % 2 === 0;
                  return (
                    <View key={post.id}>
                      {leftPost && (
                        <View style={[styles.postContainer, styles.largerHeight]}>
                          <View styles={styles.imageContainer}>
                            <Image src={post.is_anonymous
                              ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={styles.profilePicLeft} />
                            <Text style={styles.profileTextLeft}>{post.is_anonymous
                              ? post.written_by : post.written_by_profile.name}</Text>
                          </View>
                          <View style={styles.textContainer}>
                            <Text style={styles.content}>{post.content}</Text>
                          </View>
                        </View>
                      )}

                      {!leftPost && (
                        <View style={[styles.postContainer, styles.largerHeight]}>
                          <View style={styles.textContainerRight}>
                            <Text style={styles.content}>{post.content}</Text>
                          </View>
                          <View styles={styles.imageContainerRight}>
                            <Image src={post.is_anonymous
                              ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={styles.profilePicRight} />
                            <Text style={styles.profileTextRight}>{post.is_anonymous
                              ? post.written_by : post.written_by_profile.name}</Text>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
            </View>
          </View>
        </Page>
      })}


      {smallerPosts && smallerPosts.map((posts, index) => {

        return <Page size="A4" style={styles.page}>
          <View key={index} style={styles.section}>
            <Image src={background} style={styles.backgroundImg} />
            <View style={styles.containerr}>
              {posts.map((postSet) => {
                return <View style={styles.smallerPostsContaner}>
                  {postSet.map((post) => {
                    return <View style={styles.smallerPostContainer}>
                      <View style={{ padding: "4%" }}>
                        <Image src={post.is_anonymous
                          ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={styles.smallerProfilePic} />
                        <Text style={styles.smallerProfileText}>{post.is_anonymous
                          ? post.written_by : post.written_by_profile.name}</Text>
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.content}>{post.content}</Text>
                      </View>
                    </View>
                  })}
                </View>
              })}

            </View>
          </View>
        </Page>
      })}



    </Document>

  );
};

export default PDFGenerator;



