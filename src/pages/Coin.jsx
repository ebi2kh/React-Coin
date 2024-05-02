import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { numberWithCommas } from "../utils/utils";
import { CoinfetchCoins } from "../utils/api";
function Coin() {
  const { coinId } = useParams();
  const [coin, setCoin] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await CoinfetchCoins(coinId);
        setCoin(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [coinId]);

  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const h24 = coin.market_data ? coin.market_data.price_change_24h : "";

  return (
    <>
      <section className="coin-page">
        <div className="container">
          <div className="coin-content">
            <div className="coin-content__img-side">
              {coin.image ? <img src={coin.image.large} alt={coin.id} /> : null}
              <h2>{coin.name}</h2>
              <p>رتبه: #{coin.coingecko_rank}</p>
            </div>
            <div className="coin-content__text-side">
              <div className="numb">
                <div className="coin-content__text-side__24h">
                  <span>تغییرات ۲۴ ساعته:</span>
                  <p className={h24 >= 0 ? "green-text" : "red-text"}>
                    {coin.market_data
                      ? coin.market_data.price_change_percentage_24h.toFixed(
                          2
                        ) + "%"
                      : ""}
                  </p>
                </div>

                <div className="coin-content__text-side__current">
                  <span>قیمت:</span>
                  <p className={"green-text"}>
                    {coin.market_data
                      ? "$" +
                        numberWithCommas(
                          coin.market_data.current_price.usd.toFixed(2)
                        )
                      : null}
                  </p>
                </div>
                <div className="coin-content__text-side__symbol">
                  <p>سیمبل:</p>
                  <span>{coin.symbol}</span>
                </div>
              </div>
              {/* //////////// */}
              <div className="numb">
                <div className="coin-content__text-side__24h">
                  <span>تغییرات ۲۴ ساعته:</span>
                  <p className={h24 >= 0 ? "green-text" : "red-text"}>
                    {coin.market_data
                      ? coin.market_data.price_change_percentage_24h.toFixed(
                          2
                        ) + "%"
                      : ""}
                  </p>
                </div>

                <div className="coin-content__text-side__24h">
                  <span>تغییرات ۷ روزه:</span>
                  <p
                    className={
                      coin.market_data.price_change_percentage_7d >= 0
                        ? "green-text"
                        : "red-text"
                    }
                  >
                    {coin.market_data
                      ? coin.market_data.price_change_percentage_7d.toFixed(2) +
                        "%"
                      : ""}
                  </p>
                </div>

                <div className="coin-content__text-side__24h">
                  <span>تغییرات ۱۴ روزه:</span>
                  <p
                    className={
                      coin.market_data.price_change_percentage_14d >= 0
                        ? "green-text"
                        : "red-text"
                    }
                  >
                    {coin.market_data
                      ? coin.market_data.price_change_percentage_14d.toFixed(
                          2
                        ) + "%"
                      : ""}
                  </p>
                </div>
              </div>
              <div className="numb">
                <div className="coin-content__text-side__24h">
                  <span>تغییرات ۳۰ روزه:</span>
                  <p
                    className={
                      coin.market_data.price_change_percentage_30d >= 0
                        ? "green-text"
                        : "red-text"
                    }
                  >
                    {coin.market_data
                      ? coin.market_data.price_change_percentage_30d.toFixed(
                          2
                        ) + "%"
                      : ""}
                  </p>
                </div>

                <div className="coin-content__text-side__24h">
                  <span>تغییرات ۶۰ روزه:</span>
                  <p
                    className={
                      coin.market_data.price_change_percentage_60d >= 0
                        ? "green-text"
                        : "red-text"
                    }
                  >
                    {coin.market_data
                      ? coin.market_data.price_change_percentage_60d.toFixed(
                          2
                        ) + "%"
                      : ""}
                  </p>
                </div>
                <div className="coin-content__text-side__24h">
                  <span>تغییرات یک ساله:</span>
                  <p
                    className={
                      coin.market_data.price_change_percentage_1y >= 0
                        ? "green-text"
                        : "red-text"
                    }
                  >
                    {coin.market_data
                      ? coin.market_data.price_change_percentage_1y.toFixed(2) +
                        "%"
                      : ""}
                  </p>
                </div>
              </div>

              {/* ///////////// */}
              <div className="numb">
                <div className="coin-content__text-side__24h">
                  <span>رتبه مارکت کپ :</span>
                  <p className={"green-text"}>{coin.market_cap_rank}</p>
                </div>

                <div className="coin-content__text-side__current">
                  <span>قیمت:</span>
                  <p className={"green-text"}>
                    {coin.market_data
                      ? "$" +
                        numberWithCommas(
                          coin.market_data.current_price.usd.toFixed(2)
                        )
                      : null}
                  </p>
                </div>
                <div className="coin-content__text-side__symbol">
                  <p>سیمبل:</p>
                  <span>{coin.symbol}</span>
                </div>
              </div>
              <div className="description">
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      coin.description ? coin.description.en : ""
                    ),
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Coin;
