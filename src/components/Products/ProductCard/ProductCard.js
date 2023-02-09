import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { cartActions } from '~/redux/slices/cartSlice';

const cx = classNames.bind(styles);

function ProductCard({ item }) {
    const dispatch = useDispatch();
    /** dispatch lấy id productName các thứ từ thằng prop item
     * vì dispatch -> cartActions.addItem nên nó sẽ đi vào trong thằng chứa thằng này để xử lý logic
     * export const cartActions = cartSlice.actions;
     * vì vậy thằng cartSlice là function chứa tất cả  và chọc tới actions
     * nhưng ở đây cartActions.addItem là chọc tới addItem trong cartSlice
     * vì ban đầu dự  tính nó chọc đến actions
     * mà action lại chọc tới payload
     * mà payload lại là thằng chứa tất cả dữ liệu render và dữ liệu thay đổi
     * nên action.payload lại đưa vào newItem sau đó thực hiện logic lần lượt trong cartSlice
     * và cuối cùng nó sẽ lấy dữ liệu từ cartActions.addItem đưa vào cartSlice xử lý
     * mình thêm dữ liệu  gì thì nó sẽ đưa vào và xử lý trong đó
     * dữ liệu ngoài này là (prop item) ở trên
     * vd: thêm id, productName... ở ngoài và dispatch lại nó sẽ đưa vào trong cartSlice
     * và thực hiện đưa vào payload là điểm cuối cùng
     */
    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                id: item.id,
                productName: item.productName,
                price: item.price,
                imgUrl: item.imgUrl,
            }),
        );
        toast.success('Them vao gio hang thanh cong');
    };

    return (
        <div className={cx('col', 'l-3', 'm-6', 'c-12')}>
            <div className={cx('inner')}>
                <div className={cx('item')}>
                    <div className={cx('img')}>
                        <img src={item.imgUrl} alt="" />
                    </div>
                    <div className={cx('content')}>
                        <Link to={`/productdetails/${item.id}`}>
                            <h3 className={cx('name')}>{item.productName}</h3>
                        </Link>
                        <span>{item.category}</span>
                        <div className={cx('card-bottom')}>
                            <span className={cx('price')}>{item.price}$</span>
                            <FontAwesomeIcon
                                onClick={addToCart}
                                className={cx('icon')}
                                icon={faPlus}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
