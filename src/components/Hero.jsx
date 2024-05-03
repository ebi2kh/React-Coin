import { useEffect, useState } from "react";
import "./Hero.css";
import Btc from "../images/hero/bitcoin.png";
import Eth from "../images/hero/ethereum.png";
import { Link } from "react-router-dom";
import { IconChevronDown } from "@tabler/icons-react";
import { numberWithCommas } from "../utils/utils";
import { HerofetchCoins } from "../utils/api";
function Hero() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await HerofetchCoins();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="market-content__error-message">
        {error} please refresh
      </div>
    );
  }

  return (
    <>
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-content__text">
              <img className="btc-float" src={Btc} alt="floating-el" />
              <h1>
                مشاهده و خرید
                <br /> <span>رمز ارزها</span>
              </h1>
              <img className="eth-float" src={Eth} alt="floating-el" />
            </div>

            <a className="mobile-btn-hero" href="#market">
              دیدن قیمت‌ها <IconChevronDown />
            </a>

            <div className="coin-slider">
              {data.map((item) => (
                <Link
                  to={`/coin/${item.id}`}
                  key={item.id}
                  className="slider-coin"
                >
                  <img src={item?.image} alt={item?.name} />
                  <p className="slider-coin__name">
                    {item?.name}{" "}
                    <span
                      className={
                        "slider-coin__price " +
                        (item.price_change_percentage_24h <= 0
                          ? "red-text"
                          : "green-text")
                      }
                    >
                      {item?.price_change_percentage_24h?.toFixed(2) + "%"}
                    </span>
                  </p>
                  <p className="slider-coin__price">
                    {"$ " + numberWithCommas(item.current_price?.toFixed(2))}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
