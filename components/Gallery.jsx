import React from "react";

const Gallery = () => {
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      {/* Gallery container */}
      <div className="h-full max-h-[575px] w-full max-w-[842px] rounded-lg bg-red-500 px-4 py-2 shadow-xl">
        {/* Gallery top Menu Bar */}
        <div className="flex h-16 w-full  items-center justify-between border-b-4">
          <div>
            <p>Files Selected</p>
          </div>
          <div>
            <p>Delete Files</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
