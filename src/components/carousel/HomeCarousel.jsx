import { Carousel } from "react-bootstrap";
import pixelImg from './imgs/pixel.jpg'
import iphoneImg from './imgs/iphone.jpg'
import samsungImg from './imgs/samsung.jpg'

export default function HomeCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={pixelImg}
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={iphoneImg}
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={samsungImg}
        />
      </Carousel.Item>
    </Carousel>
  );
}
