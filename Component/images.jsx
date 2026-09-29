import Image from 'next/image'
import React from 'react'
import Logo from "../public/assets/msb.png"
const ImagesCom = () => {
    return (
        <div>
            <Image src={Logo} width={50} height={50} alt=''
                style={{ cursor: "pointer", width: "100%", height: "90%" }} />

        </div>
    )
}

export default ImagesCom
