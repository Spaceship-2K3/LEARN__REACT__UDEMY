import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Cart() {
    const { items, updateItemQuantity } = useContext(CartContext);

    // ! Một cách khác để truy cập và đọc context
    const totalPrice = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

    return (
        <div id="cart">
            {items.length === 0 && <p>No items in cart!</p>}
            {items.length > 0 && (
                <ul id="cart-items">
                    {items.map((item) => {
                        const formattedPrice = `$${item.price.toFixed(2)}`;

                        return (
                            <li key={item.id}>
                                <div>
                                    <span>{item.name}</span>
                                    <span> ({formattedPrice})</span>
                                </div>
                                <div className="cart-item-actions">
                                    <button
                                        onClick={() =>
                                            updateItemQuantity(item.id, -1)
                                        }
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() =>
                                            updateItemQuantity(item.id, 1)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
            <p id="cart-total-price">
                Cart Total: <strong>{formattedTotalPrice}</strong>
            </p>
        </div>
    );
}

/*
    Khi bạn truy cập một giá trị ngữ cảnh trong 1 thành phần
    và sau đó thay đổi hàm thành phần truy cập giá trị context cx như màm thành phần sẽ đc re-render
*/
