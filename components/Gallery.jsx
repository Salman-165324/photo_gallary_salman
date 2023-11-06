"use client";
import React, { useState } from "react";
import { data } from "@/data/image";
import SortableImages from "./SortableImages";
import { AiOutlinePicture } from "react-icons/ai";

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { IoMdCheckboxOutline } from "react-icons/io";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

const Gallery = () => {
  const [images, setImage] = useState(data);

  const [selectedImagesForDelete, setSelectedImagesForDelete] = useState([]);
  const totalSelectedImagesForDelete = selectedImagesForDelete.length;

  // dnd kit sensors
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 8,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const handleDeleteImage = () => {
    // filtering images array to find which image's id aren't in list of images for delete.
    const newArray = images.filter(
      (image) => !selectedImagesForDelete.includes(image.id)
    );
    setImage(newArray);
    setSelectedImagesForDelete([]);
  };

  console.log(totalSelectedImagesForDelete);

  console.log("SelectedImagesForDelete", selectedImagesForDelete);

  // Event handler for onDragEnd event listener. It is fired after a draggable item is dropped.
  // onDragEnd event does not move draggable items into droppable containers.
  // Rather, it provides information about which draggable item was dropped and whether it was over a droppable container when it was dropped.

  const onDragEnd = (event) => {
    //  over: Draggable item on which a dragged item was dropped over. If it wasn't dropped on anything it will be null.
    // active: the dragged item.

    const { active, over } = event;
    if (active?.id === over?.id) {
      return;
    }

    setImage((images) => {
      const oldIndexOfDraggedItem = images.findIndex(
        (image) => image.id === active?.id
      );
      const newIndexOfDraggedItem = images.findIndex(
        (image) => image.id === over?.id
      );
      return arrayMove(images, oldIndexOfDraggedItem, newIndexOfDraggedItem);
    });
  };

  return (
    <section className="flex flex-col items-center justify-center  px-4 py-20 sm:px-6">
      {/* Gallery container */}
      <div className="h-full w-full max-w-[842px]  rounded-lg bg-white  shadow-xl">
        {/* Gallery top Menu Bar */}
        <div className="lg:gallery-box-padding flex h-16 w-full items-center   justify-between border-b-4 border-black px-2">
          <div className="flex items-center gap-1">
            <IoMdCheckboxOutline></IoMdCheckboxOutline>
            <p> Files Selected: {totalSelectedImagesForDelete}</p>
          </div>
          <div>
            <button onClick={handleDeleteImage} className="ghost-btn">
              Delete
            </button>
          </div>
        </div>

        {/* Gallery Picture container */}

        <div className="flex flex-col items-center ">
          <div className="gallery-box-padding my-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:gap-6 ">
            {/* The <DndContext> provider makes use of the React Context API to share data between draggable and droppable components and hooks. */}
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
              sensors={sensors}
            >
              {/* The SortableContext provides information via context that is consumed by the useSortable hook. */}
              <SortableContext items={images} strategy={rectSortingStrategy}>
                {images.map((image, index) => (
                  // SortableImages is a custom component which internally uses useSortable hook from dnd kit to Manage drag, drop and sorting
                  <SortableImages
                    key={image.id}
                    index={index}
                    image={image}
                    setSelectedImagesForDelete={setSelectedImagesForDelete}
                    selectedImagesForDelete={selectedImagesForDelete}
                  ></SortableImages>
                ))}
              </SortableContext>
            </DndContext>
            {/* image upload div */}
            <div className="flex h-[120px] w-[120px] flex-col items-center justify-center gap-4 border-2 border-dashed bg-red-50 md:h-[138px] md:w-[138px]">
              {" "}
              <AiOutlinePicture size={26}></AiOutlinePicture>
              <p>Add Image</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
