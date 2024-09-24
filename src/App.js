import "./tailwind/output.css";
import logo from "./Logo-Tikop.png";
import point from "./burger.png";
import { useEffect, useState } from "react";

function App() {
  const [show, setShow] = useState(true);
  const [points, setPoint] = useState(0);
  // true là trồi lên
  // false là trồi xuống
  useEffect(() => {
    const inter = setInterval(
      () => {
        setShow((prev) => !prev);
      },
      show ? 3000 : 1000
    );
    return () => {
      clearInterval(inter);
    };
  }, [show]);
  const handlePoint = () => {
    if (!show) {
      setPoint((prev) => prev + 10);
      setShow(true);
    } else {
      console.log("Chưa lên đã bấm r cha");
    }
  };
  return (
    <div>
      <span className="text-[40px]">Point : {points}</span>
      <div className="w-full h-screen bg-slate-500 grid grid-cols-3">
        <div className="col-span-1 flex justify-center items-center">
          <div
            className="w-56 h-52 bg-transparent relative z-10 cursor-pointer"
            onClick={handlePoint}
          >
            <img
              src={logo}
              alt="tikkop"
              className="w-full h-full object-cover "
            />
            <div
              className={`absolute -z-10 w-32 h-32 ${
                show ? "top-2/4" : "top-0"
              } left-2/4 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 ease-in-out`}
              id="point"
            >
              <img
                src={point}
                alt="point"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}

export default App;
