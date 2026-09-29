import React from 'react'
import styles from "./Banner.module.scss"
import { Container } from 'react-bootstrap'
import BannerPic from "../../public/assets/msb.png"
import Image from 'next/image'
import { Image_URL } from '@/Constants/host'
const Banner = (props) => {
    return (
        <Container fluid className={styles.Banner}>
            <Container className={styles.section1}>
                <div className={styles.left}>
                    <h1 style={{textAlign:"center"}}>{props.title===undefined?"My Story Bank 2.0":props.title}</h1>
                    {props.desc === null || props.desc === undefined ? <>
                        <p>MSB 2.0 is a data bank of stories for the storyteller in you. MSB 2.0 provides you with a categorized list of stories to help take your audience to a place they can’t go on their own. MSB 2.0 puts at your fingertips over 195 messages to empower, inspire and transform an audience experience</p>
                        <p> Everyone loves a good story. Storytelling is a critical, but often overlooked, skill every business owner should have.</p>
                    </> : null}
                </div>
                <div className={styles.right}>
                    <Image src={props.uri === null || props.uri === '' || props.uri === undefined ? BannerPic : `${Image_URL}${props.uri}`} width={100} height={100} alt='picture' className={styles.picture} />
                </div>
            </Container>
        </Container>
    )
}
export default Banner
