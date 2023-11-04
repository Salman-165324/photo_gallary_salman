import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";
import React from "react";
import {CSS} from "@dnd-kit/utilities"
const SortableImages = ({ image }) => {
  const {
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition, 
  } = useSortable({id: image.id}); 

  const style = {
    transition, 
    transform: CSS.Transform.toString(transform)
  }
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}  className="relative h-[200px] w-[200px] rounded-sm">
      <Image key={image.id} src={image.url} alt="" fill></Image>
    </div>
  );
};

export default SortableImages;
