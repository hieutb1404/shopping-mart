import { createSlice } from '@reduxjs/toolkit';
// dữ liệu chính là 3 cái này còn lại là action
const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0,
    totalProduct: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            // phần này là thêm giỏ hàng
            // lấy dữ liệu từ ngoài truyền vào action.payload và đưa vào newItem
            // và render ra đc nó luôn trong console
            const newItem = action.payload;
            // tìm và lấy ra id từ trong cartItems sao cho = id từ ngoài truyền vào newItem
            // vì cartItem ở đây là mảng rỗng nên id trong mảng đó ko có để = với newItem
            // nếu có cartItem có dữ liệu rồi thì mới thực hiện find
            // mới đầu vào cartitems sẽ không có dữ liệu và nó sẽ tự lọt xuống điều kiện !existingItem sau khi push xong nó sẽ đưa cartItems lên tìm và so sánh
            // mà ko có dữ liệu thì ko thể tìm và cho id của nó = nhau được
            // mỗi sản phẩm đi vào sẽ là lần đầu tiên chưa có trong mảng nên sẽ ko có dữ liệu trong mảng cartItems - trừ khi có rồi thì lọt vào điều kiện đã có
            // sau khi có dữ liệu và lọc, nếu có thì tăng lên 1
            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id,
            );
            state.totalQuantity++;
            // nếu cartItems chưa có dữ liệu để find ở trên thì mới lọt xuống đây để push dữ liệu vào rồi mới đưa lên trên để find
            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    imgUrl: newItem.imgUrl,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
            }
            // nếu có dữ liệu ở ngoài rồi thì lấy dữ liệu đó, nếu chưa có thì dùng điều kiện trên là tự push
            else {
                // nếu có rồi, trùng thì tăng dần lên
                existingItem.quantity++;
                existingItem.totalPrice =
                    Number(existingItem.totalPrice) + Number(newItem.price);
            }
            state.totalAmount = state.cartItems.reduce(
                (total, item) =>
                    total + Number(item.price) * Number(item.quantity),
                0,
            );

            console.log(state.totalQuantity);
            console.log(state.cartItems);
            console.log(action);
            console.log(newItem);
        },
        // cuối cùng là để vào payload chứa dữ liệu và render

        deleteItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem) {
                state.cartItems = state.cartItems.filter(
                    (item) => item.id !== id,
                );
                state.totalQuantity =
                    state.totalQuantity - existingItem.quantity;
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) =>
                    total + Number(item.price) * Number(item.quantity),
                0,
            );
        },
    },
});
// muốn nhận về hành động thì cartslice.actions cho vào cartations
// sau đó dispatch từ bên ngoài vào thì nó sẽ chui vào action trong này vả xử lý logic
// truyền cartSlice.actions vào cartActions thì bên ngoài cartActinos mới đc phép chọc vào addItem
// vì muốn chọc đến actions phải đi qua cartslice và addItem

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
