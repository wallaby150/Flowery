import React, { useState } from "react";
import example1 from "../../../assets/UserMain/flowerbe.jpg";
import example2 from "../../../assets/UserMain/flowerbe2.jpg";
import example3 from "../../../assets/UserMain/flowerbe3.jpg";
import gif1 from "../../../assets/UserMain/floweraf.gif";
import gif2 from "../../../assets/UserMain/floweraf2.gif";
import gif3 from "../../../assets/UserMain/floweraf3.gif";

export default function TryComponent() {
  const exampleList = [example1, example2, example3];
  const [activeExample, setActiveExample] = useState(example1);

  const handleExampleClick = (example: any) => {
    setActiveExample(example);
  };

  return (
    <div className="pt-[10%]">
      <div className="flex flex-row">
        {exampleList.map((product, index) => (
          <div
            key={index}
            className={`p-1 ${
              activeExample === product
                ? "bg-user_green text-white"
                : "bg-user_sol text-user_black"
            }}`}
            onClick={() => handleExampleClick(product)}
          >
            <img src={product} alt="index" />
          </div>
        ))}
      </div>
      {activeExample === example1 && (
        <div className="mt-4">
          <img src={gif1} alt="active-example" className="p-1" />
        </div>
      )}
      {activeExample === example2 && (
        <div className="mt-4">
          <img src={gif2} alt="active-example" className="p-1" />
        </div>
      )}
      {activeExample === example3 && (
        <div className="mt-4">
          <img src={gif3} alt="active-example" className="p-1" />
        </div>
      )}
    </div>
  );
}

// w-[33%] p-1
