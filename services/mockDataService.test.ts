import { MockDataService, mockProducts } from "./mockDataService";

describe("MockDataService", () => {
  it("should fetch all products", async () => {
    const products = await MockDataService.fetchProducts();
    expect(products).toEqual(mockProducts);
  });

  it("should fetch products by category", async () => {
    const category = "Electronics";
    const productsByCategory = await MockDataService.fetchProductsByCategory(
      category
    );
    const expectedProducts = mockProducts.filter(
      (product) => product.category === category
    );
    expect(productsByCategory).toEqual(expectedProducts);
  });

  it("should fetch all categories", async () => {
    const categories = await MockDataService.fetchCategories();
    const expectedCategories = Array.from(
      new Set(mockProducts.map((product) => product.category))
    );
    expect(categories).toEqual(expectedCategories);
  });
});
