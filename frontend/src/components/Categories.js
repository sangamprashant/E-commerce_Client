import React from "react";
import { Center } from "./CSSEXPORT";
import styled from "styled-components";
import ProductBox from "./comp/ProductBox";
import SubCategory from "./category/SubCategory";

function Categories({ AllCategories }) {
  return (
    <Center>
      <section className="text-gray-600 body-font">
        {AllCategories &&
          AllCategories.map((category,index) => <SubCategory {...category}/>)}
      </section>
    </Center>
  );
}

export default Categories;
