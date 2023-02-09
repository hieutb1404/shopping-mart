import classNames from 'classnames/bind';

import styles from './Dashboard.module.scss';
import useGetData from '~/custom-hooks/useGetData';

const cx = classNames.bind(styles);

function Dashboard() {
    const { data: products } = useGetData('products');
    const { data: users } = useGetData('users');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid', 'wide')}>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-3')}>
                        <div className={cx('revenue__box')}>
                            <h5>Total Sales</h5>
                            <span>$7890</span>
                        </div>
                    </div>
                    <div className={cx('col', 'l-3')}>
                        <div className={cx('order__box')}>
                            <h5>Orders</h5>
                            <span>$780</span>
                        </div>
                    </div>
                    <div className={cx('col', 'l-3')}>
                        <div className={cx('products__box')}>
                            <h5>Total Products</h5>
                            <span>{products.length}</span>
                        </div>
                    </div>
                    <div className={cx('col', 'l-3')}>
                        <div className={cx('users__box')}>
                            <h5>Total Users</h5>
                            <span>{users.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
