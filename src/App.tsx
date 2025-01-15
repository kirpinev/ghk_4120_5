import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";

import ruble from "./assets/ruble.png";
import drums from "./assets/drums.png";
import smileArrow from "./assets/smile-arrow.png";
import cashback from "./assets/cashback.png";
import free from "./assets/free.png";
import smart from "./assets/smart.png";
import { appSt } from "./style.css";

import { useRef, useState } from "react";
import { Slider } from "@alfalab/core-components/slider";
import { Gap } from "@alfalab/core-components/gap";

interface Product {
  title: string;
  text?: string;
  image: string;
}

const products: Array<Product> = [
  {
    title: "+1 топовая категория кэшбэка",
    text: "5%",
    image: smileArrow,
  },
  {
    title: "+1 попытка крутить барабан суперкэшбэка",
    image: drums,
  },
  {
    title: "Увеличенный лимит кэшбэка",
    text: "7000 ₽/мес.",
    image: cashback,
  },
  {
    title: "Специальные предложения от партнёров",
    image: free,
  },
];

export const App = () => {
  const [isStopDragging, setIsStopDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const rubleRef = useRef<HTMLImageElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [isSmart, setIsSmart] = useState(false);

  const clickSuccess = () => {
    // window.gtag("event", "prize_page_view", {
    //   variant_name: "ghk_4120_5",
    // });
  };

  const clickSubmit = () => {
  // window.gtag("event", "prize_get_click", {
  //     variant_name: "ghk_4120_5",
  // });
  };

  const clickInteraction = () => {
    // window.gtag("event", "game_interaction", {
    //     variant_name: "ghk_4120_5",
    // });
  };

  if (isSmart) {
    return (
      <>
        <div className={appSt.smartContainer}>
          <Gap size={12} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography.TitleResponsive
              font="system"
              tag="h1"
              view="small"
              weight="semibold"
              className={appSt.productsTitle}
            >
              Поздравляем, <br /> вы выиграли приз!
            </Typography.TitleResponsive>
          </div>
          <div className={appSt.smartBox}>
            <img src={smart} alt="Картинка Альфа-Смарт" />
            <Typography.Text view="primary-large" color="primary">
              Альфа-Смарт
            </Typography.Text>
            <Typography.TitleResponsive
              tag="h1"
              view="medium"
              font="system"
              weight="bold"
            >
              1 месяц подписки <br /> бесплатно
            </Typography.TitleResponsive>
          </div>

          <Gap size={8} />

          <div className={appSt.smartProducts}>
            <Typography.TitleResponsive
              font="system"
              tag="h2"
              weight="bold"
              view="small"
              className={appSt.smartProductsTitle}
            >
              Входит в подписку
            </Typography.TitleResponsive>

            {products.map((product) => (
              <div className={appSt.smartProduct}>
                <div>
                  <Typography.TitleResponsive
                    font="system"
                    view="small"
                    weight="bold"
                    tag="h3"
                    className={appSt.smartProductTitle}
                  >
                    {product.title}
                  </Typography.TitleResponsive>

                  {product.text && (
                    <Typography.Text
                      view="secondary-large"
                      tag="p"
                      color="secondary"
                      className={appSt.productText}
                    >
                      {product.text}
                    </Typography.Text>
                  )}
                </div>
                <img
                  src={product.image}
                  alt=""
                  width={96}
                  height={96}
                  className={appSt.productIcon}
                />
              </div>
            ))}
          </div>
          <Typography.Text
            view="primary-medium"
            color="secondary"
            style={{ textAlign: "center" }}
          >
            Это только часть привилегий. Посмотреть все привилегии можно на
            следующей странице.
          </Typography.Text>
        </div>

        <Gap size={96} />

        <div className={appSt.bottomBtnThx}>
          <ButtonMobile
            block
            view="primary"
            // href="https://alfa.me/cbpartner"
            onClick={clickSubmit}
          >
            Забрать подписку бесплатно
          </ButtonMobile>
        </div>
      </>
    );
  }

  return (
    <>
      <Gap size={48} />
      <div className={appSt.container}>
        <Typography.TitleResponsive
          font="system"
          tag="h1"
          view="small"
          weight="semibold"
          className={appSt.productsTitle}
        >
          {!success
            ? "Соедините монетки и получите приз"
            : "Поздравляем, вы выиграли приз!"}
        </Typography.TitleResponsive>

        <Gap size={40} />

        <div
          style={{
            height: "70px",
            width: "100%",
            backgroundColor: "red",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            borderRadius: "16px",
          }}
        >
          <img
            src={ruble}
            alt=""
            height="65"
            ref={rubleRef}
            style={{
              position: "absolute",
              left: Number(startPosition),
              top: 2,
              zIndex: 2,
            }}
          />
          <img
            src={ruble}
            alt=""
            height="65"
            style={{
              position: "absolute",
              right: 51,
              top: 2,
              zIndex: 1,
              opacity: 0.5,
            }}
          />
          <div
            style={{
              height: "56px",
              width: "56px",
              backgroundColor: "white",
              borderRadius: "100%",
              marginRight: "50px",
              position: "absolute",
              right: 5,
              top: 7,
            }}
            ref={targetRef}
          ></div>
        </div>

        <Gap size={48} />

        <div className={appSt.wrapper}>
          <Slider
            size="m"
            disabled={isStopDragging}
            value={Number(startPosition)}
            range={{
              min: 0,
              max:
                (targetRef.current?.getBoundingClientRect().left || 0) + 30 ||
                0,
            }}
            onChange={(event) => setStartPosition(event.value)}
            onEnd={() => {
              clickInteraction();
              setIsStopDragging(true);
              const rubleLeft =
                rubleRef.current?.getBoundingClientRect().left || 0;
              const rubleRight =
                rubleRef.current?.getBoundingClientRect().right || 0;

              const targetLeft =
                targetRef.current?.getBoundingClientRect().left || 0;
              const targetRight =
                targetRef.current?.getBoundingClientRect().right || 0;

              if (
                rubleLeft + 6 ===
                targetRef.current?.getBoundingClientRect().left
              ) {
                setSuccess(true);
                clickSuccess();
              } else if (
                rubleRight - 6 < targetRight &&
                Math.abs(rubleRight - 6 - targetRight) <= 10
              ) {
                setSuccess(true);
                clickSuccess();
              } else if (
                rubleLeft + 6 > targetLeft &&
                Math.abs(rubleLeft - targetLeft) <= 6
              ) {
                setSuccess(true);
                clickSuccess();
              } else {
                setError(true);
              }
            }}
          />
        </div>

        <Gap size={64} />

        {error && (
          <div style={{ textAlign: "center" }}>
            <Typography.Text
              weight="regular"
              color="negative"
              view="primary-large"
            >
              Близко, но не совсем точно. Попробуйте еще раз!
            </Typography.Text>
          </div>
        )}
      </div>

      <Gap size={96} />

      <div className={appSt.bottomBtnThx}>
        {success && (
          <ButtonMobile
            block
            view="primary"
            // href="https://alfa.me/cbpartner"
            // onClick={clickSubmit}
            onClick={() => setIsSmart(true)}
          >
            Забрать приз
          </ButtonMobile>
        )}
        {error && (
          <ButtonMobile
            block
            view="primary"
            onClick={() => {
              setError(false);
              setStartPosition(0);
              setIsStopDragging(false);
            }}
          >
            Сыграть ещё
          </ButtonMobile>
        )}
      </div>
    </>
  );
};
