"use client";
import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { CSS } from "@dnd-kit/utilities";

const SortableImages = ({
  image,
  selectedImagesForDelete,
  setSelectedImagesForDelete,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const checkboxRef = useRef(null);

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

  const handleCheckboxChange = () => {
    // toggling the isChecked state. As the initial value is set to false it will correctly hold the actual state of the checkbox element even when it will be changed multiple of time.

    console.log("On Click Check");

    setIsChecked(!isChecked);

    console.log("Checking Checkobx property", checkboxRef.current);

    if (checkboxRef.current.checked) {
      const isAlreadyAdded = selectedImagesForDelete.includes(image.id);
      if (!isAlreadyAdded) {
        const newArray = selectedImagesForDelete;

        newArray.push(image.id);
        setSelectedImagesForDelete(newArray);
      }
    } else {
      // checking whether this id was added to the ref array before. If it is we are going to remove it.

      const isAddedBefore = selectedImagesForDelete.includes(image.id);
      console.log("else checking1");
      if (isAddedBefore) {
        console.log("else checking2");
        const newArray = selectedImagesForDelete.filter(
          (savedId) => savedId !== image.id
        );

        setSelectedImagesForDelete(newArray);
      }
    }
  };

  return (
    // If we use dnd properties on a div event handlers doesn't work on that. So we need to use some a wrapper div around that to add an event handler the checkbox
    <div className="group relative">
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className=" relative h-[200px] w-[200px] overflow-hidden rounded-lg border-2 border-black "
      >
        <Image key={image.id} src={image.url} alt="" fill></Image>
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
