import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Blogs from '@/Component/Blogs/Blogs'
import { CheckToken, getLocalStorageItem } from '@/Constants/Api/Api';
import Signin from '../signin';
import styles from "../../styles/Home.module.css"
import Banner from '@/Component/Banner/Banner';
const index = () => {
  const storedValue = getLocalStorageItem("UserLoginToken");
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  
  return (<>
    {isClient && storedValue  ?
      <div className={styles.Home}>
        <div style={{ margin: "50px 0px" }}>
          <Blogs />
        </div>
      </div>
      : <Signin/>}
      </>
  )
}
export async function getServerSideProps() {
  // Here you can fetch data or perform any server-side logic
  const message = "Hello from Server-Side Rendering!";
  // Return the data as props
  return {
    props: {
      message,
    }
  };
}
export default index
