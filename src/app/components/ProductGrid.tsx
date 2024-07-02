"use client";

import React from "react";
import { useState } from "react";

import { Product } from "../types/Product";
import { Category } from "../types/Category";

import { ProductCard } from "../components/ProductCard";
import { SideNav } from "../components/SideNav";

type propTypes = {
  products: Product[];
  categories: Category[];
};

export function ProductGrid({ categories, products }: propTypes) {
  const [selectedCats, setSelectedCats] = useState<string[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  //console.log(selectedCats);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCats =
    selectedCats.length > 0
      ? categories.filter((cat) => selectedCats.includes(cat.slug))
      : categories;

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredCats);

  return (
    <div className="flex justify-center pt-6">
      <div className="w-full p-3 xl:p-6 grid gap-3 xl:gap-8 2xl:gap-10 grid-cols-4 lg:grid-cols-5">
        <SideNav
          heading="Products"
          headingLevel={1}
          categories={categories}
          products={products}
          selectedCats={selectedCats}
          setSelectedCats={setSelectedCats}
        />

        <div className="col-span-full md:col-span-3 lg:col-span-4">
          <input
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={searchHandler}
            className="w-full border border-gray-300 rounded mb-6 p-3"
          />

          {filteredProducts.length < 1 && <p>No products</p>}

          <div className="grid gap-10 xl:gap-16">
            {filteredCats.map((category) => {
              const count = filteredProducts.filter(
                (product) => product.category === category.slug
              );
              return (
                <React.Fragment key={category.slug}>
                  {count.length > 0 && filteredProducts.length > 0 ? (
                    <section
                      key={category.slug}
                      className="grid gap-2"
                      id={category.slug}
                    >
                      <h2 className="font-light text-2xl xl:text-3xl mb-1 xl:mb-3">
                        {category.name}
                      </h2>

                      <div className="grid gap-3 xl:gap-5 2xl:gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProducts
                          .filter(
                            (product) => product.category === category.slug
                          )
                          .map((product) => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                      </div>
                    </section>
                  ) : (
                    <React.Fragment key={category.slug}>
                      {filteredProducts.filter(
                        (product) => product.category === category.slug
                      ).length > 0 && (
                        <div
                          key={category.slug}
                          className="grid gap-3 xl:gap-5 2xl:gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        >
                          {filteredProducts
                            .filter(
                              (product) => product.category === category.slug
                            )
                            .map((product) => (
                              <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
