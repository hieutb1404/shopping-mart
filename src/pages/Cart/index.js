import classNames from 'classnames/bind';
import CommonSection from '~/components/CommonSection';

import Helmet from '~/components/Helmet';
import styles from './Cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { cartActions } from '~/redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalAmount = useSelector((state) => state.cart.totalAmount);

    return (
        <Helmet title="Cart">
            <CommonSection title="Shopping Cart" />
            <div className={cx('wrapper')}>
                <div className={cx('grid', 'wide', 'w-100')}>
                    <div className={cx('row')}>
                        <div className={cx('col', 'l-9', 'm-12', 'c-12')}>
                            {cartItems.length === 0 ? (
                                <h2 className={cx('message')}>
                                    Không có sản phẩm nào trong giỏ hàng
                                </h2>
                            ) : (
                                <table
                                    // cellspacing dùng để nối đường border
                                    cellPadding={10}
                                    cellSpacing={0}
                                    className={cx('table', 'bordered')}
                                >
                                    <thead>
                                        <tr>
                                            <th align="left">Image</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <Tr item={item} key={index} />
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        <div className={cx('col', 'l-3', 'm-12', 'c-12')}>
                            <div className={cx('subtotal')}>
                                <h6>Subtotal</h6>
                                <span>${totalAmount}</span>
                            </div>
                            <p>taxes and shipping will caculate in checkout</p>
                            <div className={cx('btn-shopcart')}>
                                <Button className={cx('fw-100')}>
                                    <Link
                                        className={cx('title-cart')}
                                        to={config.routes.checkout}
                                    >
                                        Checkout
                                    </Link>
                                </Button>

                                <Button className={cx('btn-fixed', 'fw-100')}>
                                    <Link
                                        className={cx('title-cart')}
                                        to={config.routes.shop}
                                    >
                                        Continute Shoppping
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}
// lấy props item từ trên xuống

const Tr = ({ item }) => {
    const dispatch = useDispatch();

    const deleteProduct = () => {
        dispatch(cartActions.deleteItem(item.id));
    };

    return (
        <tr>
            <td align="left">
                <img src={item.imgUrl} alt=""></img>
            </td>
            <td>{item.productName}</td>
            <td>${item.price}</td>
            <td>{item.quantity}px</td>
            <td>
                <i onClick={deleteProduct}>
                    <FontAwesomeIcon icon={faTrash} />
                </i>
            </td>
        </tr>
    );
};

export default Cart;
