import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../utils/utils";
import { MainfetchCoins } from "../utils/api";
import "./MarketUpdate";
function MarketUpdate() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await MainfetchCoins(currentPage);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const scrollMarket = () => {
    window.scrollTo({
      top: window.scrollY - 800,
      behavior: "smooth",
    });
  };

  const scrollTop = () => {
    window.scrollTo({ top: (0, 0), behavior: "smooth" });
  };

  return (
    <>
      <section id="market" className="market-section">
        <div className="container">
          <div className="market-content">
            <h2>Market Update</h2>
            <div className="market-content__coin-list">
              <div
                className="market-content__coin-list__top"
                // style={{
                //   display: "grid",
                //   gridTemplateColumns: "repeat(8,1fr)",

                // }}
              >
                <p>Coin</p>
                <p>Price</p>
                <p>24h Change</p>
                <p>Market Cap</p>
                <p>24h High</p>
                <p>24h Low</p>
                <p>Price Change 24h</p>
                <p>Price Change % 24h</p>
              </div>
              <div className="market-content__coin-list__row">
                {data.map((item) => (
                  <Link
                    onClick={scrollTop}
                    to={`/coin/${item.id}`}
                    className="coin-row"
                    key={item.id}
                  >
                    <span>
                      <img src={item.image} alt={item.name} /> {item.name}
                    </span>
                    <p>{"$ " + item.current_price.toFixed(2)}</p>
                    <p
                      className={
                        "slider-coin__price " +
                        (item.price_change_percentage_24h >= 0
                          ? "green-text"
                          : "red-text")
                      }
                    >
                      {item.price_change_percentage_24h?.toFixed(2) + " %"}
                    </p>
                    <p>{"$ " + numberWithCommas(item.market_cap)}</p>
                    <p>{"$ " + item.high_24h.toFixed(2)}</p>
                    <p>{"$ " + item.low_24h.toFixed(2)}</p>
                    <p>{"$ " + item.price_change_24h.toFixed(2)}</p>
                    <p>{item.price_change_percentage_24h.toFixed(2) + " %"}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div
              onClick={scrollMarket}
              className="market-content__coin-list__pagination"
            >
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={i + 1 === currentPage ? "activePagi" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MarketUpdate;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function MarketUpdate() {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState([]);
//   const [apiLoad, setApiLoad] = useState(true);

//   const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${currentPage}&sparkline=false
//   `;

//   function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(url);
//       const json = await response.json();
//       setData(json);
//     };
//     fetchData();
//   }, [url]);

//   const paginationButtons = [];
//   for (let i = 1; i <= 5; i++) {
//     paginationButtons.push(
//       <button
//         key={i}
//         onClick={() => setCurrentPage(i)}
//         className={i === currentPage ? "activePagi" : ""}
//       >
//         {i}
//       </button>
//     );
//   }

//   const scrollMarket = () => {
//     window.scrollTo({
//       top: window.pageYOffset - 800,
//       behavior: "smooth",
//     });
//   };

//   const scrollTop = () => {
//     window.scrollTo({ top: (0, 0), behavior: "smooth" });
//   };

//   // console.log(data);

//   return (
//     <>
//       <section id="market" className="market-section">
//         <div className="container">
//           <div className="market-content">
//             <h2>Market Update</h2>
//             <div className="market-content__coin-list">
//               <div className="market-content__coin-list__top">
//                 <p>Coin</p>
//                 <p>Price</p>
//                 <p>24h Change</p>
//                 <p>Market Cap</p>
//               </div>
//               <div
//                 onLoad={() => setApiLoad(false)}
//                 className="market-content__coin-list__row"
//               >
//                 {apiLoad && <span className="loader"></span>}
//                 {data.map((item) => (
//                   <Link
//                     onClick={scrollTop}
//                     to={`/coin/${item.id}`}
//                     className="coin-row"
//                     key={item.id}
//                   >
//                     <span>
//                       <img src={item.image} alt={item.name} /> {item.name}
//                     </span>
//                     <p>{"$ " + item.current_price.toFixed(2)}</p>
//                     <p
//                       className={
//                         "slider-coin__price " +
//                         (item.price_change_percentage_24h >= 0
//                           ? "green-text"
//                           : "red-text")
//                       }
//                     >
//                       {item.price_change_percentage_24h?.toFixed(2) + " %"}
//                     </p>
//                     <p>{"$ " + numberWithCommas(item.market_cap)}</p>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//             <div
//               onClick={scrollMarket}
//               className="market-content__coin-list__pagination"
//             >
//               {paginationButtons}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default MarketUpdate;
