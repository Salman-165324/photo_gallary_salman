"use client"
import React, { useState } from "react";
import { data } from "@/data/image";
import SortableImages from "./SortableImages";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

const Gallery = () => {
  const [images, setImage] = useState(data);

  const onDragEnd = (event) => {


    console.log(event); 
     
    //  const {active, over} = event; 
    //  if ( active.id === over.id){
    //     return; 
    //  }
      
    //  setImage((users) => {
    //       const oldIndex = users.findIndex(user => user.id === over.id)
    //       const newIndex = 
    //  })

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
