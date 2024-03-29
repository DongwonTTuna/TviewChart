import binance from "../img/binance.svg";
import upbit from "../img/upbit.svg";
import gateio from "../img/gateio.svg";
import huobi from "../img/huobi.svg";
import kucoin from "../img/kucoin.png";
import SearchBox from "./SearchBox.jsx";
import { useEffect, useState } from "react";

const imgsrc: { [key: string]: string } = {
  BINANCE: binance,
  UPBIT: upbit,
  GATEIO: gateio,
  HUOBI: huobi,
  KUCOIN: kucoin,
};

export default function (props: any) {
  const [TickerList, SetTickerList] = useState<any>(null);
  useEffect(() => {
    SetTickerList(() => HighestVolume(props.exc, SetTickerList));
  }, []);
  return (
    <div className="backgr mx-auto w-[90vw] min-w-[1200px] h-[150px] mb-8 flex relative justify-between z-10 items-center">
      <div className="flex flex-col items-center justify-center ml-6">
        <img src={imgsrc[props.exc]} className="w-24 h-24 mt-3" />
        <p className="text-xl mt-2 text-slate-500">{props.exc}</p>
      </div>

      <div className="w-full flex items-center 2xl:justify-around 2xl:flex-row flex-col justify-around h-32 text-center">
        <div className="flex items-center justify-center border-[2px] border-slate-500 w-fit min-w-[110px] h-[50px] rounded-lg">
          <p className="text-xl  text-slate-500">{props.sym}</p>
        </div>
        <div className="w-[60%] relative">
          <SearchBox exc={props.exc} setSym={props.setTicker} />
        </div>
      </div>

      <div className="grid grid-cols-5 items-center justify-center gap-x-2 mr-2 min-w-[600px]">
        {TickerList !== null && TickerList !== undefined && (
          <>
            {TickerList.map((item: string, index: number) => {
              if (index < 5) {
                return (
                  <div
                    onClick={() => {
                      props.setTicker(item);
                    }}
                    className="cursor-pointer text-orange-600 bg-gradient-to-bl rounded-md p-1 text-center from-[#EC9F0580] to-[#FF4E0090] h-fit py-2"
                    key={item}
                  >
                    <p>{item}</p>
                  </div>
                );
              }
              return (
                <div
                  onClick={() => {
                    props.setTicker(item);
                  }}
                  className="cursor-pointer text-orange-400 bg-gradient-to-bl rounded-md p-1 text-center from-[#EC9F0540] to-[#FF4E0050] h-fit py-2"
                  key={item}
                >
                  {item}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

function HighestVolume(exchange: string, setState: any) {
  const url = `https://api.dongwontuna.net/highestvol?exchange=${exchange}`;

  fetch(url)
    .then((res) => res.json())
    .then((res) => setState(res.data));
}
