"use client"
import React, { useState } from "react";
import { data } from "@/data/image";
import SortableImages from "./SortableImages";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";

const Gallery = () => {
  const [images, setImage] = useState(data);



// Event handler for onDragEnd event listener. It is fired after a draggable item is dropped. 
// onDragEnd event does not move draggable items into droppable containers. 
// Rather, it provides information about which draggable item was dropped and whether it was over a droppable container when it was dropped.

  const onDragEnd = (event) => {


    console.log(event); 
    //  over: Draggable Area or Id on which draggable item was dropped over. If it wasn't dropped on anything it will be null. 
     const {active, over} = event; 
     if ( active.id === over.id){
        return; 
     }
      
     setImage((images) => {
          const oldIndexOfDraggedItem = images.findIndex(image => image.id === active.id)
          const newIndexOfDraggedItem = images.findIndex(image => image.id === over.id) 
          return arrayMove(images, oldIndexOfDraggedItem, newIndexOfDraggedItem); 
     })

  }

  return (
    <section className="my-20 flex flex-col items-center justify-center">
      {/* Gallery container */}
      <div className="h-full w-full max-w-[842px]  rounded-lg bg-red-500 pb-5 shadow-xl">
        {/* Gallery top Menu Bar */}
        <div className="gallery-box-padding flex h-16  w-full items-center justify-between border-b-4">
          <div>
            <p>Files Selected</p>
          </div>
          <div>
            <p>Delete Files</p>
          </div>
        </div>

        {/* Gallery Picture container */}

        <div className="gallery-box-padding grid grid-cols-3 gap-y-4">
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd} >
            <SortableContext items={images} strategy={rectSortingStrategy}>
              {images.map((image) => (
                <SortableImages key={image.id} image={image}></SortableImages>
              ))}
            </SortableContext>
          </DndContext>
          <div className="flex h-[200px] w-[200px] items-center justify-center bg-red-50">
            {" "}
            Add Images{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
