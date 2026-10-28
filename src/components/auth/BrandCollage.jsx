import Image from 'next/image'
import Logo from "@/assets/images/brand-collage.png"
const BrandCollage = () => {
    return (
        <div>
            <Image src={Logo} width={50} height={50} alt='' loading="eager"
                style={{ cursor: "pointer", width: "100%", height: "90%" }} />

        </div>
    )
}

export default BrandCollage
