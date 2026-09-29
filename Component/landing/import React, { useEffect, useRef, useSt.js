import React, { useEffect, useRef, useState } from "react";
import styles from "./landing.module.scss";
import Image1 from "../../public/assets/story.png";
import Banner from "../Banner/Banner";
import Image from "next/image";
import { Button, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";
import { BannerApi, CardContentApi, Section1Api } from "@/Constants/Api/Api";
import { Image_URL, Video_URL } from "@/Constants/host";
const Landing = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [sectioncontent, setSectionContent] = useState()
  const [bannercontent, setBannerContent] = useState()
  const [cardcontent, setCardContent] = useState()
  useEffect(() => {
    Section1Api().then((res) => {
      setSectionContent(res.data)
    })
      .catch((e) => {
        console.log(e, "error")
      })
    BannerApi().then((res) => {
      setBannerContent(res?.data)
    }).catch((e) => {
      console.log(e, "error")
    })
    CardContentApi().then((res) => {
      setCardContent(res?.data)
    }).catch((e) => {
      console.log(e, "error")
    })
  }, [])
  useEffect(() => {
    setIsClient(true);
  }, []);
  const path =
    `${Video_URL}Animated_Logo_mystorybank.mp4`;
  const homeVideoPath = "/assets/homeVideo.mp4";
  const secondVideoPath = "/assets/secondVideo.mp4";
  const thirdVideoPath = "/assets/thirdVideo.mp4";
  // const playerRef = useRef(null);
  // const handleVideoEnd = () => {
  //   if (playerRef && playerRef.current) {
  //     const currentRef = playerRef.current;
  //     if (currentRef.seekTo) {
  //       currentRef.seekTo(0); // Seek to the beginning of the video
  //     }
  //     if (currentRef.play) {
  //       currentRef.play(); // Play the video again
  //     }
  //   }
  // };
  return (
    <div className={styles.Landing}>
      {/* <Banner /> */}
      <div className={styles.Video_Banner}>
        {/* {isClient && (
          <ReactPlayer
            ref={playerRef}
            url={path}
            onEnded={handleVideoEnd} // When the video ends, replay it
            // controls
            controls={false}
            loop={false}
            muted={true}
            playing={true} // Autoplay the video
            // style={{ width: "90%", margin: "20px auto" }}
            className={styles.video_banner_inner}
            height="450px"
            width="100%"
          />
        )} */}
         <video autoPlay loop muted className={styles.video}>
            <source src={path} autoPlay loop muted />
          </video>
      </div>
      <Container className={styles.main}>
        {/* <div className={styles.section1}>
          <div className={styles.imagesss}>
            <Image
              src={Image1}
              width={100}
              height={100}
              className={styles.Images}
              alt=""
            />
          </div>
          <div className={styles.content}>
            <p>
              Are you struggling with stories to share in your business, in a
              presentation, in your training sessions?
            </p>
            <p className={styles.paraText}>
              Do you ever say, “What is a good story to share in this
              situation?”
            </p>
          </div>
        </div>
        <div className={`${styles.section1} ${styles.reverse}`}>
          <div className={styles.content}>
            <p>
              Would you benefit from having a database of stories to share with
              your audience?
            </p>
            <p className={styles.paraText}>
              Do you want a connect with your audience in a better way?
            </p>
            <p className={styles.paraText}>
              If your answer is YES, then the wait is over.
            </p>
            <h5 className={styles.linkText}>
              <b>Click The Link To Purchase Immediately:</b>
            </h5>
            <Button className={`button_theme ${styles.btnStarted}`} onClick={() => {
              const path =
                "https://transactions.sendowl.com/products/78271145/4A5919F0/view";
              window.open(path, '_blank')
            }}>
              Buy Now
            </Button>
          </div>
          <div className={styles.imagesss}>
            {isClient &&
              <ReactPlayer
                // ref={playerRef}
                url={homeVideoPath}
                // onEnded={handleVideoEnd}
                controls
                // controls={true}
                // loop={false}
                // muted={true}
                // playing={false}
                height="100%"
                width="100%"
              />}
          </div>
        </div> */}
        {sectioncontent?.map((item, index) => {
          return (
            index % 2 !== 0 ?
              <Container className={`${styles.Section1}`} key={index}>
                <div className={styles.HomeRight}>
                  <div className={styles.content}>
                    <p dangerouslySetInnerHTML={{
                      __html: item.section_content
                    }}></p>
                    <br/>
                    <Button className={`button_theme ${styles.btnStarted}`} onClick={() => {
                      const path =
                        "https://transactions.sendowl.com/products/78271145/4A5919F0/view";
                      window.open(path, '_blank')
                    }}>
                      Buy Now
                    </Button>
                  </div>
                </div>
                <div className={styles.Homeleft}>
                    {item.file_uri === "/images" ?
                      <img
                        src={`${Image_URL}images-1702022281214.png`}
                        width={100}
                        height={100}
                        className={styles.Images}
                        alt=""
                      /> :
                      isClient &&
                      <ReactPlayer
                      // ref={playerRef}
                      url={`${Video_URL}${item.file_name}`}
                      // onEnded={handleVideoEnd}
                      controls
                      // controls={true}
                      // loop={false}
                      // muted={true}
                      // playing={false}
                      height="100%"
                      width="100%"
                      />}
                </div>
              </Container>
              : <Container className={`${styles.Section1} ${styles.reverse}`}>
                <div className={styles.Homeleft}>
                    {item.file_uri === "/images" ?
                      <img
                        src={`${Image_URL}images-1702022281214.png`}
                        // width={100}
                        // height={100}
                        className={styles.Images}
                        alt=""
                      /> :
                      isClient &&
                      <ReactPlayer
                      // ref={playerRef}
                      url={`${Video_URL}${item.file_name}`}
                      // onEnded={handleVideoEnd}
                      controls
                      // controls={true}
                      // loop={false}
                      // muted={true}
                      // playing={false}
                      height="100%"
                      width="100%"
                      />}
                </div>
                <div className={styles.HomeRight}>
                  <div className={styles.content}>
                    <p dangerouslySetInnerHTML={{
                      __html: item.section_content
                    }}></p>
                    <br/>
                    <Button className={`button_theme ${styles.btnStarted}`} onClick={() => {
                      const path =
                        "https://transactions.sendowl.com/products/78271145/4A5919F0/view";
                      window.open(path, '_blank')
                    }}>
                      Buy Now
                    </Button>
                  </div>
                </div>
              </Container>
          )
        })}
        {bannercontent?.map((item, index) => {
          return (
            <div className={styles.backgroundImage}
              style={{
                backgroundImage: `linear-gradient(103.92deg,
              rgba(145, 130, 86, 0.1) 0.7%,
              #0c2e3b 100%), url(${Image_URL}${item?.file_name})`
              }}
              key={index}>
              <div className={styles.section3}>
                <h1>My Story Bank 2.0</h1>
                <p className={styles.paraText} dangerouslySetInnerHTML={{
                  __html: item?.banner_content
                }}></p>
              </div>
            </div>
          )
        }
        )}
        {/* <div className={styles.section4}>
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-sm-1 g-2" style={{ justifyContent: "center" }}>
            {cardcontent?.map((item, index) => {
              return (
                <div class="col" key={index}>
                  <div className={styles.firstBox}>
                    <h3 className={styles.boxText} dangerouslySetInnerHTML={{ __html: item?.card_content }}>
                    </h3>
                    <br></br>
                    <Button className={`button_theme ${styles.buyButton}`} onClick={() => {
                      const path =
                        `${item.redirection_url}`;
                      window.open(path, '_blank')
                    }}>
                      Buy Now
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div> */}
<div className={styles.section4}>
 
    {cardcontent?.map((item, index) => {
      return (
        <div className={styles.firstBox}  key={index} >
          <div>

            <h3 className={styles.boxText} dangerouslySetInnerHTML={{ __html: item?.card_content }}>
            </h3>
          
            <Button className={`button_theme ${styles.buyButton}`}  onClick={() => {
              const path =
                `${item.redirection_url}`;
              window.open(path, '_blank')
            }}>
              Buy Now
            </Button>
         </div>
        </div>
      )
    })}
  
</div>
        <h2 className={styles.exampleText}>HERE ARE SOME STORY EXAMPLES</h2>
        <div className={styles.videos}>
          {isClient &&
            <ReactPlayer
              url={secondVideoPath}
              controls
              width="75%"
              height="557px"
            />}
        </div>
        <br />
        <br />
        <div className={styles.videos}>
          {isClient &&
            <ReactPlayer
              url={thirdVideoPath}
              controls
              width="75%"
              height="557px"
            />}
        </div>
      </Container>
    </div>
  );
};
export default Landing;
