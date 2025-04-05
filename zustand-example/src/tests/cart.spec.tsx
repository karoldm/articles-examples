import { Product } from "../interfaces/product";
import { useCartStore } from "../stores/cart.store";

beforeEach(() => {
  useCartStore.setState(useCartStore.getInitialState);
});

test("addToCart adds a product to the cart", () => {
  const product: Product = { id: "1", title: "Product 1", price: 100 };

  useCartStore.getState().addToCart(product);

  expect(useCartStore.getState().items.length).toEqual(1);

  expect(useCartStore.getState().items).toEqual([
    { id: "1", title: "Product 1", price: 100 },
  ]);
});

test("removeProduct remove the product from the cart", () => {
  const product1: Product = { id: "1", title: "Product 1", price: 100 };
  const product2: Product = { id: "2", title: "Product 2", price: 50 };

  useCartStore.getState().addToCart(product1);
  useCartStore.getState().addToCart(product2);

  expect(useCartStore.getState().items.length).toEqual(2);

  useCartStore.getState().removeFromCart(product1);

  expect(useCartStore.getState().items.length).toEqual(1);
  expect(useCartStore.getState().items).toEqual([
    { id: "2", title: "Product 2", price: 50 },
  ]);
});

test("clearCart remove all products from the cart", () => {
  useCartStore
    .getState()
    .addToCart({ id: "1", title: "Product 1", price: 100 });

  expect(useCartStore.getState().items.length).toEqual(1);

  expect(useCartStore.getState().items).toEqual([
    { id: "1", title: "Product 1", price: 100 },
  ]);

  useCartStore.getState().clearCart();

  expect(useCartStore.getState().items.length).toEqual(0);
  expect(useCartStore.getState().items).toEqual([]);
});