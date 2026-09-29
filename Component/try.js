import Banner from '@/Component/Banner/Banner'
import React from 'react'
import styles from "../styles/Home.module.css"
import Slider from 'react-slick';
import CardComponent from '@/Component/CardComponent/CardComponent';
import { Container } from 'react-bootstrap';
import Pic1 from "../public/assets/card1.png"
import Pic2 from "../public/assets/card2.png"

const Try = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3
  };
  return (
    <div className={styles.Home}>
      <Banner />
      <h2 className={styles.heading}>Top Finance</h2>
      <Container className={styles.section1}>
        <div>
          <Slider {...settings}>
            <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div>
            <div>
              <CardComponent
                image={Pic2}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div> <div>
              <CardComponent
                image={Pic2}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div>
          </Slider>
        </div>
      </Container>
      <h2 className={styles.heading}>Most Read Case Studies</h2>
      <Container className={styles.section1}>
        <div>
          <Slider {...settings}>
            <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div>
            <div>
              <CardComponent
                image={Pic2}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div> <div>
              <CardComponent
                image={Pic2}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div>
          </Slider>
        </div>
      </Container><h2 className={styles.heading}>Most Liked Case Studies</h2>
      <Container className={styles.section1}>
        <div>
          <Slider {...settings}>
            <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div>
            <div>
              <CardComponent
                image={Pic2}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div> <div>
              <CardComponent
                image={Pic2}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div> <div>
              <CardComponent
                image={Pic1}
                title="Lorem Ipsum Heading"
                text="Lorem ipsum dolor sit amet consectetur. Dolor vestibulum donec interdum interdum consequat urna. Ipsum vel ultricies arcu felis ac rhoncus malesuada ipsum. Enim sapien pharetra amet volutpat aliquet non lectus."
              />
            </div>
          </Slider>
        </div>
      </Container>'

    </div>
  )
}
export default Try
