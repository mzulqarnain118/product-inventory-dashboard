import { Product } from "../../types/Product";
import { useState } from "react";

interface ProductTableProps {
  products: Product[];
  searchTerm: string; // Change to string for search input
  setSearchTerm: (term: string) => void; // Function to update the search term
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  searchTerm,
  setSearchTerm,
}) => {
  const [sortColumn, setSortColumn] = useState<keyof Product>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Handle sorting of products
  const sortedProducts = [...products].sort((a, b) => {
    const isAsc = sortOrder === "asc";
    const aValue = a[sortColumn] ?? ""; // Default to empty string for null/undefined
    const bValue = b[sortColumn] ?? ""; // Default to empty string for null/undefined

    if (aValue < bValue) return isAsc ? -1 : 1;
    if (aValue > bValue) return isAsc ? 1 : -1;
    return 0;
  });

  // Filter products based on the search term
  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4"
      />
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
                {sortColumn === col ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-2 px-4 border-b text-black">
                  {product.name || "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-black">
                  {product.category || "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-black">
                  ${product.price?.toFixed(2) || "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-black">
                  {product.stock ?? "N/A"}
                </td>
                <td className="py-2 px-4 border-b text-black">
                  {product.lastUpdated || "N/A"}
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
