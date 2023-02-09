import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import Helmet from '~/components/Helmet';
import styles from './ProductDetails.module.scss';
import CommonSection from '~/components/CommonSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-regular-svg-icons';
import Button from '~/components/Button';
import ProductsList from '~/components/Products/ProductsList';
import { useDispatch } from 'react-redux';
import { cartActions } from '~/redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

import { database } from '~/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import useGetData from '~/custom-hooks/useGetData';

const cx = classNames.bind(styles);

// nhận id trên url = useParams

function ProductDetails() {
    const [product, setProduct] = useState({});
    const [tab, setTab] = useState('desc');
    const reviewUser = useRef('');
    const reviewMsg = useRef('');
    const dispatch = useDispatch();

    const [rating, setRating] = useState(null);

    const { id } = useParams();
    const { data: products } = useGetData('products');
    // const product = products.find((item) => item.id === id);
    // lấy ra từng biến từ product
    // lưu ý biến lấy ra phải giống y biến từ data product
    const docRef = doc(database, 'products', id);

    useEffect(() => {
        const getProduct = async () => {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProduct(docSnap.data());
            } else {
                console.log('no product!');
            }
        };

        getProduct();
    }, []);
    const {
        imgUrl,
        productName,
        price,
        // avgRating,
        // reviews,
        description,
        shortDesc,
        category,
    } = product;
    // những sản phẩm có category giống vs sản phẩm hiện tại trong productDetails thì lọc và lấy
    const relatedProducts = products.filter(
        (item) => item.category === category,
    );

    const submitHandler = (e) => {
        e.preventDefault();
        // thêm trước vào thẻ rồi mới gọi ra thẻ ngược lại so với cách gọi js query
        const reviewUserName = reviewUser.current.value;
        const reviewUserMsg = reviewMsg.current.value;

        const reviewObj = {
            userName: reviewUserName,
            text: reviewUserMsg,
            rating,
        };
        console.log(reviewObj);
    };

    const addToCart = () => {
        dispatch(
            cartActions.addItem({
                id,
                image: imgUrl,
                productName,
                price,
            }),
        );
        toast.success('Thêm giỏ hàng thành công!');
    };
    // mỗi khi chọn sản phẩm khác xong nó sẽ tự đi lên đầu trang
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    return (
        <Helmet title="ProductDetails">
            <CommonSection title="ProductDetails" />
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('grid', 'wide', 'w-100')}>
                        <div className={cx('row')}>
                            <div className={cx('col', 'l-6', 'm-12', 'c-12')}>
                                <div className={cx('img__details')}>
                                    <img src={imgUrl} alt="" />
                                </div>
                            </div>

                            <div className={cx('col', 'l-6', 'm-12', 'c-12')}>
                                <div className={cx('product__details')}>
                                    <h2>{productName}</h2>
                                    <div className={cx('rating')}>
                                        <i>
                                            <FontAwesomeIcon icon={faStar} />
                                        </i>
                                        <i>
                                            <FontAwesomeIcon icon={faStar} />
                                        </i>
                                        <i>
                                            <FontAwesomeIcon icon={faStar} />
                                        </i>
                                        <i>
                                            <FontAwesomeIcon icon={faStar} />
                                        </i>
                                        <i>
                                            <FontAwesomeIcon
                                                icon={faStarHalfAlt}
                                            />
                                        </i>
                                        <p>
                                            {/* (<span>{avgRating}</span> ratings) */}
                                        </p>
                                    </div>
                                    <div>
                                        <span className={cx('price')}>
                                            {price}$
                                        </span>
                                        <span>Category: {category}</span>
                                    </div>
                                    <p className={cx('shortdesc')}>
                                        {shortDesc}
                                    </p>
                                    <Button onClick={addToCart}>
                                        Add to cart
                                    </Button>
                                </div>
                            </div>
                            <div className={cx('col', 'l-12', 'm-12', 'c-12')}>
                                <div className={cx('tab__wrapper')}>
                                    <h6
                                        className={cx(
                                            `${
                                                tab === 'desc'
                                                    ? 'active__tab'
                                                    : ''
                                            }`,
                                        )}
                                        onClick={() => setTab('desc')}
                                    >
                                        Description
                                    </h6>
                                    <h6
                                        className={cx(
                                            `${
                                                tab === 'rev'
                                                    ? 'active__tab'
                                                    : ''
                                            }`,
                                        )}
                                        onClick={() => setTab('rev')}
                                    >
                                        {/* Reviews ({reviews.length}) */}
                                    </h6>
                                </div>
                                {tab === 'desc' ? (
                                    <div className={cx('tab__content')}>
                                        <p>{description}</p>
                                    </div>
                                ) : (
                                    <div className={cx('product__review')}>
                                        <div className={cx('review__wrapper')}>
                                            <ul>
                                                {/* vì review lại mở ra 1 mạng và chứa phần tử bên trong 
                                            nên khi t gặp mảng muốn lấy phần tử bên trong ta phải lặp qua nó */}
                                                {/* {reviews.map((item, index) => (
                                                    <li key={index}>
                                                        <h6>Trung Hieu</h6>
                                                        <span>
                                                            {item.rating} (
                                                            rating)
                                                        </span>
                                                        <p>{item.text}</p>
                                                    </li>
                                                ))} */}
                                            </ul>
                                            <div className={cx('review__form')}>
                                                <h4>Leave your experience</h4>
                                                <form
                                                    action=""
                                                    onSubmit={submitHandler}
                                                >
                                                    <div
                                                        className={cx(
                                                            'form__group',
                                                        )}
                                                    >
                                                        <input
                                                            // đưa ref vào nó sẽ tự động lấy ra giá trị từ thẻ input này luôn vì ở trên ta đã gọi lấy ra giá trị trước rồi
                                                            // khác với cách gọi js query phải gọi thẻ xong mới logic đc
                                                            // còn ref thì sau khi logic xong thêm trực tiếp vào thẻ mà ko cần gọi thẻ
                                                            ref={reviewUser}
                                                            type="text"
                                                            placeholder="Enter name"
                                                        />
                                                    </div>

                                                    <div
                                                        className={cx(
                                                            'form__group',
                                                            'rating__group',
                                                        )}
                                                    >
                                                        <motion.span
                                                            whileTap={{
                                                                scale: 1.2,
                                                            }}
                                                            onClick={() =>
                                                                setRating(1)
                                                            }
                                                        >
                                                            1
                                                            <i>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                />
                                                            </i>
                                                        </motion.span>
                                                        <motion.span
                                                            whileTap={{
                                                                scale: 1.2,
                                                            }}
                                                            onClick={() =>
                                                                setRating(2)
                                                            }
                                                        >
                                                            2
                                                            <i>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                />
                                                            </i>
                                                        </motion.span>
                                                        <motion.span
                                                            whileTap={{
                                                                scale: 1.2,
                                                            }}
                                                            onClick={() =>
                                                                setRating(3)
                                                            }
                                                        >
                                                            3
                                                            <i>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                />
                                                            </i>
                                                        </motion.span>
                                                        <motion.span
                                                            whileTap={{
                                                                scale: 1.2,
                                                            }}
                                                            onClick={() =>
                                                                setRating(4)
                                                            }
                                                        >
                                                            4
                                                            <i>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                />
                                                            </i>
                                                        </motion.span>
                                                        <motion.span
                                                            whileTap={{
                                                                scale: 1.2,
                                                            }}
                                                            onClick={() =>
                                                                setRating(5)
                                                            }
                                                        >
                                                            5
                                                            <i>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faStar
                                                                    }
                                                                />
                                                            </i>
                                                        </motion.span>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'form__group',
                                                        )}
                                                    >
                                                        <textarea
                                                            ref={reviewMsg}
                                                            rows={4}
                                                            type="text"
                                                            placeholder="Review Message..."
                                                        />
                                                    </div>
                                                    <motion.button
                                                        whileTap={{
                                                            scale: 1.2,
                                                        }}
                                                    >
                                                        <Button>Send</Button>
                                                    </motion.button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={cx('col', 'l-12', 'm-12', 'c-12')}>
                            <div className={cx('related__title')}>
                                You might also like
                            </div>
                        </div>
                    </div>
                </div>
                <ProductsList data={relatedProducts} />
            </div>
        </Helmet>
    );
}

export default ProductDetails;
