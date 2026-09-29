import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import styles from "./Profile.module.scss"
import Image from 'next/image'
import 'react-phone-input-2/lib/style.css'
import { useEffect } from 'react'
import { ChangePasswordAPI, GetProfile, UserEditProfileAPI, getLocalStorageItem } from '@/Constants/Api/Api'
import PhoneInput from 'react-phone-input-2'
import { useDispatch, useSelector } from 'react-redux'
import { getClinetProfile } from '@/redux/getClientProfileSlice'
import { Image_URL } from '@/Constants/host'
import Signin from '@/pages/signin'
import DescriptionAlerts from '@/Constants/alert/alert'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { Form, Input } from 'antd'
const ProfileComponent = () => {
    const [form] = Form.useForm();

    const router = useRouter()
    const [profile, setProfile] = useState()
    const [selectedImage, setSelectedImage] = useState("");
    const [name, setName] = useState();
    const [mobile, setMobile] = useState()
    const [value, setValue] = useState("edit")
    const [old_password, setOldPassword] = useState();
    const [new_password, setNewPassword] = useState()
    const [new_c_password, setNewCPassword] = useState()
    const [alert, setAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        text: "",
        icon: ""
    });
    const [isClient, setIsClient] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const handleShowPass = () => setShowPassword((showPassword) => !showPassword);

    const handleMouseDownPass = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        setIsClient(true)
    }, [])

    const handleValueChangeEdit = () => {
        setValue("edit")
    }
    const handleValueChangePassword = () => {
        setValue("change_password")
    }
    const handlePhoneChange = (newPhone) => {
        setMobile(newPhone);
    };

    const storedValue = getLocalStorageItem("UserLoginToken");
    useEffect(() => {
        if (storedValue) {
            GetProfile(storedValue).then((res) => {
                setProfile(res?.data)
                setName(res?.data?.name)
                setMobile(res?.data?.mobile)
                form.setFieldValue(
                    "name",
                    res?.data?.name
                );
                form.setFieldValue(
                    "email",
                    res?.data?.email
                );
                form.setFieldValue(
                    "phone",
                    res?.data?.mobile
                );
            }).catch((error) => {
                console.log(error, "error")
            })
        }
    }, [storedValue])

    const dispatch = useDispatch()
    useEffect(() => {
        if (storedValue) {

            dispatch(getClinetProfile(storedValue))
        }
    }, [dispatch, storedValue])

    const handleSubmit = () => {
        setAlert(false);
        const formData = new FormData();
        // formData.append("image", selectedImage);
        // formData.append("image", selectedImage, "profile.jpg"); 
        formData.append("image", selectedImage, "profile");
        // console.log(name, selectedImage, mobile, storedValue,"name, selectedImage, mobile, storedValue")
        UserEditProfileAPI(name, selectedImage, mobile, storedValue)
            .then((res) => {
                dispatch(getClinetProfile(storedValue));
                setProfile(res.data)
                if (res.data.code === 200 || res.data.status === 200) {
                    setAlert(true);
                    setAlertConfig({
                        text: "Profile Updated Successfully",
                        icon: "success",
                    });
                    setTimeout(() => {
                        // navigate("/signin");
                    }, 1000);
                }
            })
            .catch((error) => {
                console.log(error)
            });
    };
    const handleChangePassword = () => {
        ChangePasswordAPI(old_password, new_password, new_c_password, storedValue).then((res) => {
            if (res.data.code === 200 || res.data.status === 200) {
                setAlert(true);
                setAlertConfig({
                    text: "Password changed Successfully",
                    icon: "success",
                });
                setTimeout(() => {
                    router.replace("/signin");
                }, 1000);
            }
        }).catch((error) => {
            console.log(error.response.data.message)
            setAlert(true);
            setAlertConfig({
                text: error.response.data.message,
                icon: "error",
            });
        })
    }
    return (
    <>

        {alert ? (
            <DescriptionAlerts text={alertConfig.text} icon={alertConfig.icon} />
        ) : null}
     <Container className={styles.profile}>
                <div className={styles.profile_inner}>
                    <div className={styles.section1}>
                        <div>
                            {profile && profile?.attachements && profile?.attachements?.length > 0 ? (
                                <Image
                                    src={`${Image_URL}${profile.attachements[0].file_name}`}
                                    width={100}
                                    height={100}
                                    className={styles.Picture}
                                    alt=''
                                />
                            ) : <>
                                <Image
                                    src="data:image/png;base64,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"
                                    width={100}
                                    height={100}
                                    className={styles.Picture}
                                    alt=''
                                />
                            </>
                            }
                        </div>
                        <div>
                            <h5 style={{ textTransform: "capitalize" }}>{profile?.name}</h5>
                            <h6>Set up your My Story Bank 2.0 account.</h6>
                        </div>
                    </div>
                    <div className={styles.section2}>
                        <div className={styles.btn_tab}>
                            <Button className={styles.btn_theme_div} style={{ backgroundColor: value === "edit" ? "#174F78" : "unset", color: value === "edit" ? "white" : "unset" }}
                                onClick={handleValueChangeEdit}>Edit</Button>
                            <Button className={styles.btn_theme_div} style={{ backgroundColor: value === "change_password" ? "#174F78" : "unset", color: value === "change_password" ? "white" : "unset" }} onClick={handleValueChangePassword}>Change Password</Button>
                        </div>
                        <div className={styles.line}>
                        </div>
                        <div className={styles.Form_ctm}>
                            {value === "edit" ?
                                <div>
                                    <Form
                                        form={form}
                                        name="basic"
                                        layout="vertical"
                                        autoComplete="off"
                                    >
                                        <div className={styles.profiletop}>
                                            {selectedImage === "" ? (
                                                <img
                                                    src="data:image/png;base64,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"
                                                    alt=""
                                                    height="50px"
                                                    width="50px"
                                                    style={{ borderRadius: "100px" }}
                                                />
                                            ) : (
                                                selectedImage && (
                                                    <img
                                                        src={URL.createObjectURL(selectedImage)}
                                                        height="50px"
                                                        width="50px"
                                                        alt="Profile Pic"
                                                        style={{ borderRadius: "50px" }}
                                                    />
                                                )
                                            )}
                                            <label className={styles.custom_file_upload} onChange={(e) => {
                                                setSelectedImage(e.target.files[0]);
                                            }}
                                                style={{ cursor: "pointer" }}>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    name="image"
                                                />
                                                &nbsp; Add Profile picture
                                            </label>
                                        </div>
                                        <Form.Item
                                            name="name"
                                            label="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            rules={[
                                                {
                                                    message: 'Please input your Name!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="email"
                                            label="E-mail"
                                            disabled="true"
                                            // value={profile?.email} disabled
                                            rules={[
                                                {
                                                    type: 'email',
                                                    message: 'The input is not valid E-mail!',
                                                },
                                                {
                                                    message: 'Please input your E-mail!',
                                                },
                                            ]}
                                        >
                                            <Input disabled />
                                        </Form.Item>
                                        <Form.Item
                                            name="phone"
                                            label="Phone Number"
                                            rules={[
                                                {
                                                    message: 'Please input your phone number!',
                                                },
                                            ]}
                                        >
                                            <PhoneInput
                                                country={'us'}
                                                value={mobile}
                                                onChange={handlePhoneChange}
                                                disableDropdown={true}
                                            />
                                        </Form.Item>
                                    </Form>
                                    <div className={styles.buttons}>
                                        <Button className="button_theme" style={{ margin: "10px 5px", width: "28%" }}>Cancel</Button>
                                        <Button className="button_theme" style={{ margin: "10px 5px", width: "70%" }} onClick={handleSubmit}>Update
                                        </Button>
                                    </div>
                                </div>
                                :
                                <div>
                                    <Form
                                        name="basic"
                                        layout="vertical"
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            label="Old Password"
                                            name="oldpassword"
                                            value={old_password}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            rules={[
                                                {
                                                    //
                                                    message: 'Please input your old password!',
                                                },
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Form.Item
                                            label="New Password"
                                            name="newpassword"
                                            value={new_password}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            rules={[
                                                {
                                                    // required: true,
                                                    message: 'Please input your new password!',
                                                },
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Form.Item
                                            label="Confirm Password"
                                            name="confirmpassword"
                                            value={new_c_password}
                                            onChange={(e) => setNewCPassword(e.target.value)}
                                            rules={[
                                                {
                                                    // required: true,
                                                    message: 'Please input your confirm password!',
                                                },
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                    </Form>
                                    <div className={styles.buttons}>
                                        <Button className="button_theme" style={{ margin: "10px 5px", width: "28%" }}>Cancel</Button>
                                        <Button className="button_theme" style={{ margin: "10px 5px", width: "70%" }} onClick={handleChangePassword}>Change Password
                                        </Button>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
            </Container></>
    )
}
export default ProfileComponent
