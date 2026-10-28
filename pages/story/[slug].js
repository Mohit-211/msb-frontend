import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Blogs from '@/Component/Blogs/Blogs'
import { getLocalStorageItem } from '@/Constants/Api/Api';
import Signin from '../signin';
const index = () => {
  const storedValue = getLocalStorageItem("UserLoginToken");
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  
  return (<>
    {isClient && storedValue  ?
      <Blogs />
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
