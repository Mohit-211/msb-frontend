import BlogDetailComponent from '@/Component/BlogDetail/BlogDetail'
import { BlogDetailAPI, ViewCountBlog, getLocalStorageItem } from '@/Constants/Api/Api';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
export default function BlogDetail({ data }) {
  const storedValue = getLocalStorageItem("UserLoginToken");

  useEffect(() => {
    ViewCountBlog(data?.data?.id).then((res) => {
    }).catch((e) => {
      console.log(e, "error")
    })
  }, [])
  return (
    <div>
      <BlogDetailComponent data={data} />
    </div>
  )
}
export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;
  const response = await BlogDetailAPI(id);
  const data = response;
  return {
    props: {
      data,
    },
  };
}
