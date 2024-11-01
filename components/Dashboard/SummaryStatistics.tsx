"use client";

import React, { useMemo } from "react";
import { Product } from "../../types/Product";
import styles from "./SummaryStatistics.module.css";

interface SummaryStatisticsProps {
  products: Product[];
}

const SummaryStatistics: React.FC<SummaryStatisticsProps> = ({ products }) => {
  const totalValue = useMemo(() => {
    return products.reduce(
      (acc, product) => acc + product.price * product.stock,
      0
    );
  }, [products]);

  const lowStockItems = useMemo(() => {
    return products.filter((product) => product.stock < 5).length;
  }, [products]);

  return (
    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <div className={`${styles["card"]} bg-white p-4 rounded shadow`}>
        <h3 className="font-bold text-black">Total Inventory Value</h3>
        <p className="text-xl text-black">${totalValue.toFixed(2)}</p>
      </div>
      <div className={`${styles["card"]} bg-white p-4 rounded shadow`}>
        {" "}
        <h3 className="font-bold text-black">Low Stock Items</h3>
        <p className="text-xl text-black">{lowStockItems}</p>
      </div>
    </div>
  );
};

export default SummaryStatistics;
