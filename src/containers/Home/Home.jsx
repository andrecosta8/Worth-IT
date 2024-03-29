import "./Home.css";
import "swiper/css";
import "swiper/css/autoplay";
import React, { useEffect, useState } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllProducts } from "../../services/apiCalls";

const Home = () => {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductsList = async () => {
    try {
      let response = await getAllProducts();
      setProducts(response.data);
    } catch (err) {
      setError(err);
      console.error(error);
    }
  };

  return (
    <div className="homeDesign">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="welcome-message">
        <p data-testid="title">Welcome to Worth IT?!</p>
        Worth IT? is a application that allow the developers or tech lovers to
        review dev products and give this opinion about . See bellow some of
        the review products by worldwide developers. If you want to see details
        and join our discussions please register and log in.
        <p>You will realize that Worth IT!!!</p>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {products.map((product) => {
          return (
            <SwiperSlide key={product.id} className="block">
              <img src={product.url} alt={product.name}></img>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Home;
