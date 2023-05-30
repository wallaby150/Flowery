import React, { useState } from "react";
import Intro from "../../components/User/UserMain/Intro";

export default function UserMainPage() {
  return (
    <div className="flex flex-col bg-user_beige left-0 top-0 p-[-5px]">
      <Intro />
    </div>
  );
}
