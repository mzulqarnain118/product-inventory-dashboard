import { Product } from "../types/Product";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Dell XPS 13 Laptop",
    category: "Electronics",
    price: 999.99,
    stock: 5,
    lastUpdated: "2024-03-15",
  },
  {
    id: 2,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 29.99,
    stock: 15,
    lastUpdated: "2024-03-14",
  },
  {
    id: 3,
    name: "Coffee Maker",
    category: "Appliances",
    price: 79.99,
    stock: 8,
    lastUpdated: "2024-03-16",
  },
  {
    id: 4,
    name: "Office Chair",
    category: "Furniture",
    price: 199.99,
    stock: 12,
    lastUpdated: "2024-03-13",
  },
  {
    id: 5,
    name: "Desk Lamp",
    category: "Furniture",
    price: 49.99,
    stock: 20,
    lastUpdated: "2024-03-15",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 89.99,
    stock: 3,
    lastUpdated: "2024-03-16",
  },
  {
    id: 7,
    name: "Microwave Oven",
    category: "Appliances",
    price: 159.99,
    stock: 6,
    lastUpdated: "2024-03-12",
  },
  {
    id: 8,
    name: "Gaming Monitor",
    category: "Electronics",
    price: 349.99,
    stock: 9,
    lastUpdated: "2024-03-15",
  },
  {
    id: 9,
    name: "Standing Desk",
    category: "Furniture",
    price: 399.99,
    stock: 4,
    lastUpdated: "2024-03-14",
  },
  {
    id: 10,
    name: "Air Purifier",
    category: "Appliances",
    price: 129.99,
    stock: 11,
    lastUpdated: "2024-03-16",
  },
];

export class MockDataService {
  private static delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static async fetchProducts(): Promise<Product[]> {
    // Simulate network delay
    await this.delay(800);

    // Simulate potential errors (1 in 10 chance)
    if (Math.random() < 0.1) {
      throw new Error("Failed to fetch products");
    }

    return mockProducts;
  }

  static async fetchProductsByCategory(category: string): Promise<Product[]> {
    await this.delay(500);
    return mockProducts.filter((product) => product.category === category);
  }

  static async fetchCategories(): Promise<string[]> {
    await this.delay(300);
    return Array.from(new Set(mockProducts.map((product) => product.category)));
  }

  static async searchProducts(query: string): Promise<Product[]> {
    await this.delay(500);
    const searchTerm = query.toLowerCase();
    return mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
  }

  static async updateProduct(
    id: number,
    updates: Partial<Product>
  ): Promise<Product> {
    await this.delay(500);
    const productIndex = mockProducts.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error("Product not found");
    }

    const updatedProduct = {
      ...mockProducts[productIndex],
      ...updates,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    // Update the product in the mock data
    mockProducts[productIndex] = updatedProduct;

    return updatedProduct;
  }
}
