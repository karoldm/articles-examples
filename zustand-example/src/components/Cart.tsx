import { useCartStore } from "../stores/cart.store";

export const Cart = () => {
  const { items, removeFromCart, clearCart } = useCartStore();

  return (
    <div>
      <h2>Cart - {items.length} items</h2>
      <button onClick={clearCart}>clear cart</button>
      <ul>
        {items.map((item) => (
          <li>
            <span>{item.title}</span>
            <button onClick={() => removeFromCart(item)}>remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};