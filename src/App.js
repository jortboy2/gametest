import "./tailwind/output.css";
import logo from "./Logo-Tikop.png";
import burget from "./burger.png";
import chicken from "./chicken.png";
import boom from "./boom.png";
import { Fragment, useEffect, useState } from "react";
const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];
const datapoint = [{ url: burget }, { url: chicken }, { url: boom }];
function App() {
  const [show, setShow] = useState(true);
  const [points, setPoint] = useState(0);
  const [notify, setNotify] = useState();
  const [RandomNumer, setRandomNumer] = useState();
  const [RandomImage, setRandomImage] = useState(1);
  const [countSeconds, setCountSeconds] = useState(30);
  const [alertpoint, setAlertPoint] = useState();
  // true là trồi lên
  // false là trồi xuống
  // console.log(Math.round(Math.random() * data.length))
  useEffect(() => {
    const inter = setInterval(
      () => {
        setShow((prev) => !prev);
        setRandomNumer(Math.floor(Math.random() * data.length));
        
      },
      show ? 3000 : 1000
    );
    return () => {
      clearInterval(inter);
    };
  }, [show]);
  const handleStart = () => {
    const counttime = setInterval(() => {
      setCountSeconds((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(counttime);
    };
  };
  useEffect(() => {
    if (countSeconds <= 0) {
      setCountSeconds(0);
    }
  }, [countSeconds]);
  const handlePoint = (e) => {
    setRandomImage(Math.floor(Math.random() * datapoint.length));
    const id = e.target.getAttribute("data-id");
    console.log("RandomNumer", RandomNumer);
    console.log("id", id);
    if (!show && id == RandomNumer) {
      setNotify(RandomNumer);
      setShow(true);
      if (datapoint[RandomImage] == datapoint[0]) {
        setPoint((prev) => prev + 20);
        setAlertPoint("+ 20 points");
      } else if (datapoint[RandomImage] == datapoint[1]) {
        setPoint((prev) => prev + 50);
        setAlertPoint("+ 50 points");
      } else if (datapoint[RandomImage] == datapoint[2]) {
        setPoint((prev) => prev - 10);
        setAlertPoint("- 10 points");
      }
    } else {
      console.log("Chưa lên đã bấm r cha");
    }
  };
  useEffect(() => {
    const a = document.getElementById("fade-text");
    if (a) {
      setTimeout(() => {
        a.classList.add("opacity-0");
      }, 100);
    }
  });
  useEffect(() => {
    console.log("RandomImage", RandomImage);
  }, [RandomImage]);
  // console.log(data.length)
  return (
    <div>
      <span className="text-[40px]">Point : {points}</span>
      <div className="w-full text-center">
        <span>{countSeconds}</span>
        <br />
        <button
          className="py-2 px-5 rounded-full hover:bg-emerald-600 bg-emerald-200"
          onClick={handleStart}
        >
          Start
        </button>
      </div>
      <div className="w-full h-screen grid grid-cols-3">
        {/* start */}
        {data.map((item, index) => (
          <div
            className="col-span-1 flex justify-center gap-2 items-center cursor-pointer z-20 relative"
            onClick={handlePoint}
            data-id={item.id}
            key={index}
          >
            <span>
              {notify == item.id ? (
                <div
                  className="text-[red] absolute top-20 opacity-100 transition-opacity duration-[1000ms]"
                  id="fade-text"
                >
                  {alertpoint}
                </div>
              ) : (
                <Fragment />
              )}
            </span>
            <div className="w-40 h-40 bg-transparent relative z-10 pointer-events-none">
              <img
                src={logo}
                alt="tikkop"
                className="w-full h-full -z-10 object-cover pointer-events-none"
              />
              <div
                className={`absolute -z-20 w-28 h-28 ${
                  item.id === RandomNumer
                    ? show
                      ? "top-2/4"
                      : "top-0"
                    : "top-2/4"
                } left-2/4 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 ease-in-out`}
                id="point"
              >
                <img
                  src={datapoint[RandomImage].url}
                  alt="point"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
        {/* end */}
      </div>
    </div>
  );
}

export default App;
