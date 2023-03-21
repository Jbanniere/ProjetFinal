import Slider from 'react-slick';
import { BASE_URL } from '../tools/constante.js'
import { NavLink } from "react-router-dom"

const CardProductCarousel = ({products}) => {
  const settings = {
      dots: true,
      infinite: true,
      speed:500,
      slidesToShow: 2,
      slidesToScroll: 1,
      initialSlide: 0,
     /* autoplay: true,
      speed: 2000,
      autoplaySpeed: 4500,
      cssEase: "linear",*/
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

  return (
    <Slider {...settings}>
      {products.map((product, i) => (
        <div className="card__product" key={i}>
          <div className="card-top">
            <img className="card-product-img" src={`${BASE_URL}/img/${product.url}`} alt={product.caption} />
          </div>
          <div className="card-bottom">
            <p>Abonnement mensuel : </p>
            <p className="prix">{product.price}€ / mois</p>
            <button className="btn-valid readmore"><NavLink to={`/productDetails/${product.id}`}>+ infos</NavLink></button>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CardProductCarousel