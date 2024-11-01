"use client";
import { useEffect, useState } from "react";
import { MockDataService } from "@/services/mockDataService";
import ProductTable from "./ProductTable";
import SummaryStatistics from "./SummaryStatistics";
import Pagination from "./Pagination";
import { Product } from "@/types/Product";
import { Oval } from "react-loader-spinner";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await MockDataService.fetchProducts();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Use the MockDataService to search products based on searchTerm
  const searchProducts = async (term: string) => {
    if (!term) {
      // If the search term is empty, fetch all products again
      const data = await MockDataService.fetchProducts();
      setProducts(data);
    } else {
      try {
        const filteredData = await MockDataService.searchProducts(term);
        setProducts(filteredData);
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  useEffect(() => {
    // Call searchProducts whenever the searchTerm changes
    const delayDebounceFn = setTimeout(() => {
      searchProducts(searchTerm);
    }, 300); // Debounce delay

    return () => clearTimeout(delayDebounceFn); // Cleanup
  }, [searchTerm]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  if (loading) {
    return (
      <div className={styles.overlay}>
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Product Inventory Dashboard
      </h1>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <>
          <SummaryStatistics products={products} />
          <ProductTable
            products={currentProducts}
            {...{ searchTerm, setSearchTerm, setProducts }}
          />
          <Pagination
            totalItems={products.length}
            {...{ itemsPerPage, currentPage, setCurrentPage }}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
