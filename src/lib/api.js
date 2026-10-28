import axios from "axios";
import { API_URL } from "./config";
import { getLocalStorageItem } from "./storage";
const BASE_URL = API_URL;

const storedValue = getLocalStorageItem("UserLoginToken");
// ************Forgot Password OTP API****************
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
  // Empty body first: axios.post takes (url, data, config). Read the token now, not at page load.
  return await axios.post(
    `${BASE_URL}/auth/logout`,
    {},
    {
      headers: {
        "x-access-token": getLocalStorageItem("UserLoginToken"),
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
