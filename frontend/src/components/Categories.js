import React, { useState } from "react";
import { Center } from "./CSSEXPORT";
import styled from "styled-components";
import SubCategory from "./category/SubCategory";
import AllSubCategory from "./category/AllSubCategory";

const Title = styled.h1`
  font-size: 2.5rem;
  text-transform: capitalize;
  margin-bottom: 20px;
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  background-color: #fff;
  font-size: 16px;
  margin-right: 10px;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;

const LoadingSkeleton = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite linear;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

function Categories({ AllCategories }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Center>
      <section className="text-gray-600 body-font py-7">
        <div className="container px-5 py-2 mx-auto">
          <SelectWrapper>
            <Title>Categories</Title>
            <div>
              <Select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="all">All Categories</option>
                {AllCategories &&
                  AllCategories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
              </Select>
              <Button onClick={() => setSelectedCategory("all")}>Show All</Button>
            </div>
          </SelectWrapper>
          <div>
            {selectedCategory === "all" ? (<>
              {AllCategories.map((category)=>(

              <AllSubCategory {...category} key={category._id}/>
              ))}</>
            ) : (
              AllCategories
                ? AllCategories.map((category) => {
                    if (
                      selectedCategory === "" ||
                      selectedCategory === category.name
                    ) {
                      return <SubCategory {...category} key={category._id} />;
                    }
                    return null;
                  })
                : Array.from({ length: 4 }).map((_, index) => (
                    <LoadingSkeleton key={index} className="skeleton-loading" />
                  ))
            )}
          </div>
        </div>
      </section>
    </Center>
  );
}

export default Categories;
