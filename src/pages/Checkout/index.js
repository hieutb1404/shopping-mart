import classNames from 'classnames/bind';

import Helmet from '~/components/Helmet';
import CommonSection from '~/components/CommonSection';
import styles from './Checkout.module.scss';
import Button from '~/components/Button';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Checkout() {
    const totalQty = useSelector((state) => state.cart.totalQuantity);
    const totalAmount = useSelector((state) => state.cart.totalAmount);

    return (
        <Helmet title="Checkout">
            <CommonSection title="Checkout" />
            <div className={cx('wrapper')}>
                <div className={cx('grid', 'wide', 'w-100')}>
                    <div className={cx('row')}>
                        <div className={cx('col', 'l-8', 'm-6', 'c-12')}>
                            <h6 className={cx('label')}>Billing Infomation</h6>
                            <form>
                                <div className={cx('form__group')}>
                                    <input
                                        type="text"
                                        placeholder="Enter Your Name"
                                    />
                                </div>

                                <div className={cx('form__group')}>
                                    <input
                                        type="Email"
                                        placeholder="Enter Your Email"
                                    />
                                </div>

                                <div className={cx('form__group')}>
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                    />
                                </div>

                                <div className={cx('form__group')}>
                                    <input
                                        type="text"
                                        placeholder="Street address"
                                    />
                                </div>

                                <div className={cx('form__group')}>
                                    <input type="text" placeholder="City" />
                                </div>

                                <div className={cx('form__group')}>
                                    <input
                                        type="text"
                                        placeholder="Postical code"
                                    />
                                </div>

                                <div className={cx('form__group')}>
                                    <input type="text" placeholder="Country" />
                                </div>
                            </form>
                        </div>

                        <div className={cx('col', 'l-4', 'm-6', 'c-12')}>
                            <div className={cx('checkout__cart')}>
                                <h6>
                                    Total Qty: <span>{totalQty} items</span>
                                </h6>
                                <h6>
                                    Subtotal: <span>{totalAmount}</span>
                                </h6>
                                <h6>
                                    <span>
                                        Shipping: <br />
                                        free ship
                                    </span>
                                    <span>$0</span>
                                </h6>
                                <h4>
                                    Total Cost: <span>{totalAmount}$</span>
                                </h4>
                                <button className={cx('buy__btn')}>
                                    <Button className={cx('buy__btn-fix')}>
                                        Place an order
                                    </Button>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default Checkout;
