import React from "react";

export default function MeanCard(result: any) {
  // console.log(result.result, "억까는 이제그만");
  // console.log(result.result, "here");
  return (
    <div>
      <div className="flex justify-center">
        {Object.entries(result.result).map((flower: any, mean: any) => (
          <div className="w-[50%] rounded-md">
            <div>{result.result}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
