import { Product } from "../../types/Product";
import { useState, useEffect } from "react";
import { MockDataService } from "@/services/mockDataService";

interface ProductTableProps {
  products: Product[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setProducts: (products: Product[]) => void; // Correct type
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  searchTerm,
  setSearchTerm,
  setProducts,
}) => {
  const [sortColumn, setSortColumn] = useState<keyof Product>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    // Fetch available categories on mount
    MockDataService.fetchCategories().then((fetchedCategories) =>
      setCategories(fetchedCategories)
    );
  }, []);

  // Filter products based on search term and selected category
  const filteredProducts = products.sort((a, b) => {
    const isAsc = sortOrder === "asc";
    const aValue = a[sortColumn] ?? "";
    const bValue = b[sortColumn] ?? "";

    if (aValue < bValue) return isAsc ? -1 : 1;
    if (aValue > bValue) return isAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="overflow-x-auto shadow-md rounded-lg p-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 text-black rounded w-full mb-4 focus:outline-none focus:border-blue-500"
      />

      {/* Category Filter Dropdown */}
      <select
        value={selectedCategory}
        onChange={async (e) => {
          setSelectedCategory(e.target.value);
          const productsByCategory =
            await MockDataService.fetchProductsByCategory(e.target.value);
          setProducts(productsByCategory);
        }}
        className="border border-gray-300 p-2 text-black rounded mb-4 w-full focus:outline-none focus:border-blue-500"
      >
        <option disabled value="">
          Select Categories
        </option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Product Table */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            {(
              ["name", "category", "price", "stock", "lastUpdated"] as const
            ).map((col) => (
              <th
                key={col}
                onClick={() => {
                  setSortColumn(col);
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
                className="cursor-pointer py-2 px-4 border-b text-left hover:bg-gray-200 transition-colors duration-200"
              >
                {col.charAt(0).toUpperCase() + col.slice(1)}{" "}
                {sortColumn === col ? (sortOrder === "asc" ? "↑" : "↓") : "↑"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr
                key={product?.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-2 px-4 border-b text-black">
                  {product?.name || "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-black">
                  {product?.category || "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-black">
                  ${product?.price?.toFixed(2) || "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-black">
                  {product?.stock ?? "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-black">
                  {product?.lastUpdated || "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="py-2 px-4 border-b text-center text-gray-500"
              >
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
