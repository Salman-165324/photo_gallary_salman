import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

const SortableImages = ({ image }) => {
  // Argument {id:image.id} the id argument works as a identifier.
  // The argument passed to the id argument of useSortable should match the id passed in the items array of the parent SortableContext provider.

  // attributes, listeners and other properties which is destructured from useSortable hook has good documentation on dnd's doc

  const {
    attributes,
    listeners,

    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: image.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="relative h-[200px] w-[200px] overflow-hidden rounded-lg border-2 border-black"
    >
      <Image key={image.id} src={image.url} alt="" fill></Image>
    </div>
  );
};

export default SortableImages;
