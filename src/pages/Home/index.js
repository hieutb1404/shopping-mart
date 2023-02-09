import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import products from '~/assets/data/products';
import Helmet from '~/components/Helmet';
import Slider from '~/pages/Home/Slider';
import Services from '~/pages/Home/services';
import ProductsList from '~/components/Products/ProductsList';
import counterImg from '~/assets/images/counter-timer-img.png';
import Clock from '~/pages/Home/Clock';
import Button from '~/components/Button';
import config from '~/config';

import useGetData from '~/custom-hooks/useGetData';

const cx = classNames.bind(styles);

function Home() {
    // truyền products từ ngoài firebase vào và ưu tiên đặt tên biến giống với từ useGetData xuất ra hoặc tên trên firebase
    const { data: products, loading } = useGetData('products');

    const [trendingProducts, setTrendingProducts] = useState([]);
    const [bestSalesProducts, setBestSalesProducts] = useState([]);
    const [mobileWirelessProduct, setMobileWirelessProduct] = useState([]);
    const [popularProduct, setPopularProduct] = useState([]);

    const today = new Date();
    const year = today.getFullYear();
    // setTrendindProducts cập nhật, thì dữ liệu truyền vào phải là trendingProduct thì khi map dữ liệu nó sẽ cập nhật ở setTrendingProducts mới lọc đc ra cái mình cần
    // sử dụng đúng useState để cập nhật đúng và dữ liệu đúng
    //trendingProducts sẽ ăn đi theo  cập nhật của settrending
    // lọc  useEffect chỉ lấy dữ liệu là ghế trong products
    // hành động của set là gì thì thằng dữ liệu sẽ ăn theo
    useEffect(() => {
        const filterdTrendingProducts = products.filter(
            (item) => item.category === 'chair',
        );

        const filterdBestSalesProducts = products.filter(
            (item) => item.category === 'sofa',
        );

        const filterdMobileProduct = products.filter(
            (item) =>
                item.category === 'mobile' || item.category === 'wireless',
        );

        const filterdPopularProduct = products.filter(
            (item) => item.category === 'watch',
        );

        // cập nhật để xác định là lấy ra chair
        setTrendingProducts(filterdTrendingProducts);
        setBestSalesProducts(filterdBestSalesProducts);
        setMobileWirelessProduct(filterdMobileProduct);
        setPopularProduct(filterdPopularProduct);
    }, [products]);
    return (
        <div>
            <Helmet title={'Home'}>
                <Slider year={year} label={'trending product in'} />
                <Services
                    label={'Free Shipping'}
                    description={'ở đây hoàn toàn free shipper nhé'}
                />
                {loading ? (
                    <div className={cx('grid', 'wide')}>
                        <h5 className={cx('title__loading')}>Loading.....</h5>
                    </div>
                ) : (
                    <ProductsList
                        data={trendingProducts}
                        title={'Trending Products'}
                    />
                )}

                {loading ? (
                    <div className={cx('grid', 'wide')}>
                        <h5 className={cx('title__loading')}>Loading.....</h5>
                    </div>
                ) : (
                    <ProductsList
                        data={bestSalesProducts}
                        title={'Best Sales'}
                    />
                )}

                <div className={cx('timer-count')}>
                    <div className={cx('grid wide', 'w-100')}>
                        <div className={cx('row')}>
                            <div className={cx('col', 'm-12', 'c-12')}>
                                <div className={cx('inner')}>
                                    <div className={cx('clock-top')}>
                                        <h4>Limited Offers</h4>
                                        <h3>Quality Armchair</h3>

                                        <div className={cx('clock')}>
                                            <Clock />
                                        </div>

                                        <button className={cx('buy__store')}>
                                            <Button
                                                className={cx('buy__store-fix')}
                                                to={config.routes.shop}
                                            >
                                                Visit Store
                                            </Button>
                                        </button>
                                    </div>

                                    <div className={cx('counter-img')}>
                                        <img
                                            src={counterImg}
                                            alt="timer-count"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {loading ? (
                    <div className={cx('grid', 'wide')}>
                        <h5 className={cx('title__loading')}>Loading.....</h5>
                    </div>
                ) : (
                    <ProductsList
                        data={mobileWirelessProduct}
                        title={'New Arrivals'}
                    />
                )}

                {loading ? (
                    <div className={cx('grid', 'wide')}>
                        <h5 className={cx('title__loading')}>Loading.....</h5>
                    </div>
                ) : (
                    <ProductsList
                        data={popularProduct}
                        title={'Popular in Category'}
                    />
                )}
            </Helmet>
        </div>
    );
}

export default Home;
