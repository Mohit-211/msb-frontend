import Banner from "@/Component/Banner/Banner";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import Blogs from "@/Component/Blogs/Blogs";
import { getLocalStorageItem } from "@/Constants/Api/Api";
import Signin from "../signin";

const Home = () => {
  const [sliderSettings, setSliderSettings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  });
  const storedValue = getLocalStorageItem("UserLoginToken");
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient && storedValue ? (
        <div className={styles.Home}>
          <Banner />
          <div style={{ margin: "50px 0px" }}>
            <Blogs />
          </div>
        </div>
      ) : (
        <Signin />
      )}
    </>
  );
};
export default Home;
