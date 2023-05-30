import React, { useState } from "react";
import UserProtoPage from "../../ReleasePage/UserProtoPage";

interface cardType {
  flowerPicture: string;
  font: number;
  mean: string;
  message: string;
  messageDate: string;
  renderedCard: string;
  messageId: string;
  pictures: string[];
  poem: string;
  video: string;
}

const GardenCardModal = React.forwardRef<HTMLDivElement, any>(
  (props: { card: cardType }, ref) => {
    return (
      <div className="absolute inset-x-0 top-0 h-[600%] overflow-y-hidden-scroll bg-opacity-50 bg-black z-[20]">
        <div className="m-auto sm:w-full md:w-1/2 lg:w-[34%] p-10">
          <div ref={ref} className="bg-white ">
            <UserProtoPage isQR={false} id={props.card.messageId} />
          </div>
        </div>
      </div>
    );
  }
);

export default GardenCardModal;
