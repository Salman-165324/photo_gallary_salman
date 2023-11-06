"use client";
import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";
import React, { useRef } from "react";
import { CSS } from "@dnd-kit/utilities";
const SortableImages = ({
  image,
  selectedImagesForDelete,
  setSelectedImagesForDelete,
  index,
}) => {
  const checkboxRef = useRef(null);

  const firstBoxSize =
    index === 0 &&
    "lg:w-[300px] lg:h-[300px] sm:col-span-2 md:w-full md:h-full  sm:row-span-2";

  // Argument {id:image.id} the id argument works as a identifier.
  // The argument passed to the id argument of useSortable should match the id passed in the items array of the parent SortableContext provider.

  // attributes, listeners and other properties which is destructured from useSortable hook has good documentation on dnd's doc

  const {
    attributes,
    listeners,

    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  //  set touch-action: none to prevent scroll of the page due to the initiation of a drag.
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    touchAction: "none",
    zIndex: isDragging && 35,
  };

  const handleCheckboxChange = () => {
    // toggling the isChecked state. As the initial value is set to false it will correctly hold the actual state of the checkbox element even when it will be changed multiple of time.

    if (checkboxRef.current.checked) {
      const isAlreadyAdded = selectedImagesForDelete.includes(image.id);
      if (!isAlreadyAdded) {
        // used Array destructure method so that we don't use the same reference. Now a copy of the items of selectedImagesForDelete array will be passed.
        const newArray = [...selectedImagesForDelete];

        newArray.push(image.id);
        setSelectedImagesForDelete(newArray);
      }
    } else {
      // checking whether this id was added to the ref array before. If it is we are going to remove it.

      const isAddedBefore = selectedImagesForDelete.includes(image.id);
      if (isAddedBefore) {
        const newArray = selectedImagesForDelete.filter(
          (savedId) => savedId !== image.id
        );

        setSelectedImagesForDelete(newArray);
      }
    }
  };

  return (
    // If we use dnd properties on a div event handlers doesn't work on that. So we need to use some a wrapper div around that to add an event handler the checkbox
    <div className={` ${firstBoxSize} group relative aspect-square`}>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className={` ${firstBoxSize} relative aspect-square h-[120px] w-[120px] overflow-hidden  rounded-br-[32px] rounded-tl-xl rounded-tr-2xl border-2 border-slate-600 sm:h-full sm:w-full md:h-[138px] md:w-[138px] `}
      >
        <Image
          style="object-cover"
          key={image.id}
          src={image.url}
          alt=""
          fill
        ></Image>
      </div>

      <div className="absolute left-3 top-3 hidden transition-all duration-500 group-hover:block">
        <input
          ref={checkboxRef}
          type="checkbox"
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

export default SortableImages;
