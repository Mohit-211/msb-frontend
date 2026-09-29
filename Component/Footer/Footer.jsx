import React, { useEffect, useState } from 'react'
import styles from "./Footer..module.scss"
import { Container } from 'react-bootstrap'
import '@fortawesome/fontawesome-free/css/all.css';
import { FaTwitter } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";
import { PiSpotifyLogoFill } from "react-icons/pi";
import { FooterContentApi } from '@/Constants/Api/Api'
import Link from 'next/link'
import { Image_URL } from '@/Constants/host'
import Image from 'next/image'
const FooterSection = () => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    const [social, setSocial] = useState()
    const currentYear = new Date().getFullYear();
    useEffect(() => {
        FooterContentApi().then((res) => {
            setSocial(res.data)
        }).catch((error) => {
            console.log(error, "error in footer")
        })
    }, [])


    return (
        <div className={styles.FooterSection}>
            <Container className={styles.footer_inner}>
                <div className={`${styles.sec1} ${styles.desktopSec1}`}>
                    <p>© {currentYear} MyStoryBank. All rights reserved.</p>
                </div>
                <div className={styles.sec1}>
                    <h5>MyStoryBank</h5>
                </div>
                <div className={styles.sec1}>
                    {social?.map((item, index) => {
                        return (
                            <>
                                {item.social_media_name === "Twitter" ?
                                    <Link href={`${item?.redirection_url}`} key={index}>
                                        <FaTwitter className={styles.icon} size={25} />
                                    </Link> : item.social_media_name === "Facebook" ?
                                        <Link href={`${item?.redirection_url}`} key={index}>
                                            <FaFacebook className={styles.icon} size={25} />
                                        </Link> : item.social_media_name === "Instagram" ?
                                            <Link href={`${item?.redirection_url}`} key={index}>
                                                <RiInstagramFill className={styles.icon} size={25} />
                                            </Link> : item.social_media_name === "Youtube" ?
                                                <Link href={`${item?.redirection_url}`} key={index}>
                                                    <IoLogoYoutube className={styles.icon} size={25} />
                                                </Link> : item.social_media_name === "FaLinkedin" ?
                                                    <Link href={`${item?.redirection_url}`} key={index}>
                                                        <FaLinkedin className={styles.icon} size={25} />
                                                    </Link> : item.social_media_name === "Spotify" ?
                                                        <Link href={`${item?.redirection_url}`} key={index}>
                                                            <PiSpotifyLogoFill className={styles.icon} size={25} />
                                                        </Link> : ""

                                }
                            </>
                        )
                    })}
                </div>
                <div className={styles.mobileSec1}>
                    <p>© {currentYear} MyStoryBank. All rights reserved.</p>
                </div>
            </Container>
        </div>
    )
}
export default FooterSection
