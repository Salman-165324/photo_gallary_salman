import Image from "next/image";
import React from "react";

const SortableImages = ({ image }) => {
  // const {
  //   attributes, 
  //   listeners
  // }
  return (
    <div className="relative h-[200px] w-[200px] rounded-sm">
      <Image key={image.id} src={image.url} alt="" fill></Image>
    </div>
  );
};

export default SortableImages;
