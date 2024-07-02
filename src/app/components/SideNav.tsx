"use client";

import React, { useState } from "react";
import { Product as ProductType } from "../types/Product";
import { Category as CategoryType } from "../types/Category";
import { SlidersHorizontalIcon, XIcon } from "lucide-react";
import Heading from "./Heading";

type propTypes = {
  heading?: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  categories: CategoryType[];
  products: ProductType[];
  setSelectedCats: any;
  selectedCats: string[];
};

export const SideNav = (props: propTypes) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const checkboxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    if (event.target.checked) {
      props.setSelectedCats([...props.selectedCats, val]);
    } else {
      props.setSelectedCats(props.selectedCats.filter((cat) => cat !== val));
    }
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className={`btn btn--outline md:hidden w-full col-span-full mb-4`}
      >
        <SlidersHorizontalIcon />
        <span className="ml-1">Product Categories</span>
      </button>
      <nav
        className={`${
          isMenuOpen
            ? "menu-open translate-x-0"
            : "-translate-x-full md:translate-x-0"
        } bg-gray-800 selection:bg-gray-600 text-gray-300 w-3/4 md:w-auto transition max-w-96 md:max-w-none fixed md:sticky top-0 md:top-4 left-0 z-20 h-screen overflow-y-auto col-span-1 md:rounded-xl p-6 md:p-4 xl:p-6 md:pb-12 xl:pb-12`}
        aria-expanded={isMenuOpen}
      >
        <button
          aria-label="Close Menu"
          className="fixed top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition duration-200 md:hidden"
          onClick={() => setIsMenuOpen(false)}
          tabIndex={isMenuOpen ? 0 : -1}
        >
          <XIcon />
        </button>
        {props.heading && (
          <Heading
            level={props.headingLevel || 2}
            className="font-semibold mb-3 text-white"
          >
            {props.heading}
          </Heading>
        )}
        {props.categories.map((category) => {
          const count = props.products.filter(
            (product) => product.category === category.slug
          ).length;
          return (
            <div key={category.slug}>
              <input
                type="checkbox"
                value={category.slug}
                onChange={checkboxHandler}
                id={category.slug}
              />
              <label htmlFor={category.slug}>
                {category.name}
                <span className="text-xs opacity-50 ml-1">({count})</span>
              </label>
            </div>
          );
        })}
      </nav>
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`bg-black/60 fixed top-0 right-0 h-screen w-screen z-10 transition ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
    </>
  );
};
