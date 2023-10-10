import React from "react";
import { Center } from "../CSSEXPORT";

const Gallery = () => {
  return (
    <Center>
      <section className="text-gray-600 body-font">
        <div className="container pt-24 mx-auto flex flex-wrap">
          <div className="flex w-full  flex-wrap mb-4">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 ">
              Store Gallery.
            </h1>
            <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
              Explore our store's gallery. Discover our latest collections,
              unique fashion items, and the vibrant atmosphere of our store.
              Franzen you probably haven't heard of them man bun deep jianbing
              selfies heirloom.
            </p>
          </div>
          <div className="flex flex-wrap md:-m-2 -m-1">
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="https://th.bing.com/th/id/OIP.dQDN4P89zMBzTBFDUcNiAgHaE8?pid=ImgDet&rs=1"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="https://media.timeout.com/images/101714607/image.jpg"
                />
              </div>
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block"
                  src="https://th.bing.com/th/id/OIP.6neYtRWnvUulkKaIgiVpsQHaFj?pid=ImgDet&rs=1"
                />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block"
                  src="https://th.bing.com/th/id/OIP.6neYtRWnvUulkKaIgiVpsQHaFj?pid=ImgDet&rs=1"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="https://i.pinimg.com/736x/4e/7d/e2/4e7de2ac3331347372a2dbdc99f87e42.jpg"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="https://th.bing.com/th/id/R.e6a59ddfc59a5d9703f19d250cfa1c8e?rik=H1xPp70hqr6LLQ&riu=http%3a%2f%2ffarm7.static.flickr.com%2f6133%2f5968729287_703ba89fbc_z.jpg&ehk=bXCcEBg0V771NX25TmIg5x5Lc3oEP%2fSh0Ce2bcD3lxQ%3d&risl=&pid=ImgRaw&r=0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Center>
  );
};

export default Gallery;
