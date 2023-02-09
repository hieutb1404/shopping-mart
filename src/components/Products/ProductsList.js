import classNames from 'classnames/bind';
import styles from './ProductsList.module.scss';

import ProductCard from '~/components/Products/ProductCard';

const cx = classNames.bind(styles);

function ProductsList({ title, data }) {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{title}</h2>
            <div className={cx('items')}>
                <div className={cx('inner', 'grid wide', 'w-100')}>
                    <div className={cx('row')}>
                        {data.map((item, index) => (
                            <ProductCard key={index} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsList;
