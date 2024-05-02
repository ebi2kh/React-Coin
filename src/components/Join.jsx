import Btc from "../images/hero/bitcoin.png";
import Eth from "../images/hero/ethereum.png";
import "./Join.css";
function Join() {
  return (
    <>
      <section id="join" className="join-section">
        <div className="container">
          <div className="join-content">
            <img alt="coin_img" className="join-content__btc" src={Btc} />
            <img alt="coin_img" className="join-content__eth" src={Eth} />
            <div className="join-content__text">
              <h2>
                به ما بپیوندید از طریق <br /> <span>تلگرام</span>
              </h2>
              <p>تمام کریپتوهای خود را در یک مکان مدیریت کنید.</p>
              <a rel="noreferrer" target="_blank" href="https://telegram.org/">
                به ما بپیوندید از طریق تلگرام
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Join;
