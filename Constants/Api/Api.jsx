import axios from "axios";
import https from "https";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { API_URL } from "@/Constants/host";
const BASE_URL = API_URL;
// export const getLocalStorageItem = (key) => {
//   if (typeof window !== 'undefined') {
//     return localStorage.getItem(key);
//     // return null
//   }
//   return null;
// };
const isJwtToken = (token) => {
  const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/;
  return jwtPattern.test(token);
};
export const getLocalStorageItem = (key) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    if (item && isJwtToken(item)) {
      const decoded = jwtDecode(item);
      const expirationTime = decoded.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      if (expirationTime && expirationTime < currentTime) {
        // Token has expired, set the item to null
        localStorage.setItem(key, null);
        return null;
      }
      return item;
    }
  }
  return null;
};
export const removeLocalStorageItem = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem(key);
  }
  return null;
};
const storedValue = getLocalStorageItem("UserLoginToken");
// ************CheckToken API****************
// export const CheckToken = async (value) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/auth/checkTokenStatus`, {
//       headers: {
//         "x-access-token": value,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("API response error:", error);
//     throw error;
//   }
// };
// ************SEND OTP API****************
export const SendOTPAPI = async (value1) => {
  let config = {
    email: value1,
    type: "email_verification",
  };
  return await axios.post(
    `${BASE_URL}/auth/otp`,
    config
  );
};
export const ForgetSendOTPAPI = async (value1) => {
  let config = {
    email: value1,
    type: "forget_password",
  };
  return await axios.post(
    `${BASE_URL}/auth/otp`,
    config
  );
};
// ************Verify OTP API****************
export const VerifyOtpAPI = async (value1, value2) => {
  let config = {
    email: value1,
    otp: value2,
    type: "email_verification",
  };
  return await axios.post(
    `${BASE_URL}/auth/verify-otp`,
    config
  );
};
// ************User Register API****************
export const UserRegisterAPI = async (
  value1,
  value2,
  value3,
  value4,
  value5
) => {
  let config = {
    name: value1,
    email: value2,
    // dialing_code: value3,
    mobile: value3,
    password: value4,
    confirm_password: value5,
  };
  return await axios.post(
    `${BASE_URL}/auth/register`,
    config
  );
};
// ************User Login API****************
export const UserLoginAPI = async (value1, value2) => {
  let config = {
    email: value1,
    password: value2,
  };
  return await axios.post(
    `${BASE_URL}/auth/login`,
    config
  );
};
// ************User Logout API****************
export const UserLogOutAPI = async () => {
  return await axios.post(
    `${BASE_URL}/auth/logout`,
    {
      headers: {
        "x-access-token": storedValue,
      },
    }
  );
};
// ************All Category API****************
export const AllCategoryAPI = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/category/all`
    );
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};
// ************blog by Category API****************
export const BlogByCategoryApi = async (value1, limit, page) => {
  let config = {
    category_slug: value1,
  };
  return await axios.post(
    `${BASE_URL}/user/get-blog-from-category?limit=${limit}&page=${page}`,
    config
  );
};
// ************Getprofile API****************
export const GetProfile = async (value) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/user/profile`,
      {
        headers: {
          "x-access-token": value,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};
// ************Profile Edit API****************
export const UserEditProfileAPI = async (value1, value2, value3, token) => {
  let config = {
    name: value1,
    images: value2,
    mobile: value3,
  };
  return await axios.put(
    `${BASE_URL}/user/updateProfile`,
    config,
    {
      headers: {
        "x-access-token": token,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  );
};
// ************Change Password API****************
export const ChangePasswordAPI = async (value1, value2, value3, token) => {
  let config = {
    old_password: value1,
    new_password: value2,
    confirm_password: value3,
  };
  return await axios.post(
    `${BASE_URL}/auth/reset-password`,
    config,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
};
// ************Forgot Password API****************
export const ForgotPassword = async (value1, value2, value3, value4) => {
  let config = {
    email: value1,
    otp: value2,
    password: value3,
    confirm_Password: value4,
  };
  return await axios.post(
    `${BASE_URL}/auth/forgot-password`,
    config
  );
};
// ************Get Blog API****************
export const GetBlog = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/blog/getAllBlogs`
    );
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};
axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
// ************BlogDetail API****************
export const BlogDetailAPI = async (value1) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/blog/${value1}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
export const ViewCountBlog = async (value1) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/markBlogAsViewed?blog_id=${value1}`,
      null,
      {
        headers: {
          "x-access-token": storedValue,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
// ************Like API****************
export const LikeApi = async (value1) => {
  let config = {
    blog_id: value1,
  };
  return await axios.post(
    `${BASE_URL}/blog/like`,
    config,
    {
      headers: {
        "x-access-token": storedValue,
      },
    }
  );
};
// ************Like count API****************
export const LikeCountApi = async (value, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/blog/getLikesCount?blog_id=${value}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};
// ************Comment API****************
export const AddCommentApi = async (value1, value2) => {
  let config = {
    comment: value1,
    blog_id: value2,
  };
  return await axios.post(
    `${BASE_URL}/blog/comment`,
    config,
    {
      headers: {
        "x-access-token": storedValue,
      },
    }
  );
};
export const GetComment = async (id, token) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/blog/getAllCommentByBlogId?blog_id=${id}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};
// ************Search API****************
export const SearchAPI = async (value) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/user/blog/search?query=${value}`
    );
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};

// ************Home Section1 API****************
export const Section1Api = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/content/getAllSectionContent`
    );
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};

export const BannerApi = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/content/getAllBannerContent`
    );
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};
export const CardContentApi = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/content/getAllCardContent`
    );
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};

export const FooterContentApi = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/content/getAllSocialLogin`
    );
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};
// Generate story
export const AipromtApi = async (formdata, token) => {
  return await axios.post(
    `${BASE_URL}/story`,
    formdata,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
};

// save story

export const SaveStoryApi = async (formdata, token) => {
  return await axios.put(
    `${BASE_URL}/story`,
    formdata,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
};


export const SortStoryApi = async (formdata, token) => {
  return await axios.post(
    `${BASE_URL}/story/sort`,
    formdata,
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
};
// get history
export const AipromtHistoryApi = async (token) => {
  return await axios.get(
    `${BASE_URL}/story`,

    {
      headers: {
        "x-access-token": token,
      },
    }
  );
};
