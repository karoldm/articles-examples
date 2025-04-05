import { productsMock } from "../mocks/products";
import { useCartStore } from "../stores/cart.store";

export const Products = () => {
  const products = productsMock;
  // desse modo somente quando addItemToCart for atualizado que esse componente será re-renderizado
  const addItemToCart = useCartStore((state) => state.addToCart);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <span>{product.price}</span>
          <button onClick={() => addItemToCart(product)}>add to cart</button>
        </div>
      ))}
    </div>
  );
};