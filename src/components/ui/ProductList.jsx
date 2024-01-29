import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({data, count}) => {
	const itemsToRender = count && data.length > count ? data.slice(0, count) : data;
	return (
		<div className="flex flex-wrap justify-around items-center  my-8">
			{itemsToRender.map((item, index) => (
				<ProductCard item={item} key={index} />
			))}
		</div>
	);
};

export default ProductList;
