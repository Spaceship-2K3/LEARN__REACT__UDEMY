import { createContext, useReducer, useState } from "react";
import DUMMY_PRODUCTS from "../dummy-products";
const CartContext = createContext({
    items: [],
    updateItemQuantity: () => {},
    addItemToCart: () => {}, // hàm giả trống
});
export { CartContext };

function shoppingCartReducer(state, action) {
    if (action.type === "ADD_ITEM") {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );

        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find(
                (product) => product.id === action.payload
            );
            updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }
        return {
            ...state, // not needed here because we have only one value
            items: updatedItems,
        };
    } else if (action.type === "UPDATE_ITEM") {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...action,
            items: updatedItems,
        };
    }

    return state;
}

export default function CartContextProvider({ children }) {
    /**
   ⁡⁢⁣⁣  * shoppingCartState : state
     * shoppingCartDispatch : hàm điều phối
     * useReducer : sẽ tạo ra trạng thái mới về sau 
     * shoppingCartReducer(state, action) : trả ra trạng thái mới
     *  {
            items: [],       : giá trị ban đầu của state
        }⁡ 
     */
    const [shoppingCartState, shoppingCartDispatch] = useReducer(
        shoppingCartReducer,
        {
            items: [],
        }
    );

    function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: "ADD_ITEM",
            payload: id,
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: "UPDATE_ITEM",
            payload: {
                productId: productId,
                amount: amount,
            },
        });
    }

    /**
     *  cập nhật trạng thái ở đây không hoạt động qua context
     *  ! Khác phục
     */

    const ctxValue = {
        items: shoppingCartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
    };

    return (
        <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
    );
}
