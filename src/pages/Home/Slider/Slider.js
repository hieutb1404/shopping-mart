import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import imgHome from '~/assets/images/hero-img.png';
import Button from '~/components/Button';
import styles from './Slider.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function Slider({ year, label }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid wide', 'w-100')}>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-6', 'm-12', 'c-12')}>
                        <div className={cx('inner')}>
                            <div className={cx('content')}>
                                <p className={cx('label')}>
                                    {label} {year}
                                </p>
                                <h2>
                                    Make Your Interior More Minimalist & Modern
                                </h2>
                                <p className={cx('description')}>
                                    More Minimalist & Modern Make Your
                                    Interior,More Minimalist & Modern Make Your
                                    Interior,More Minimalist & Modern Make Your
                                    Interior
                                </p>
                                <Button to={config.routes.shop}>
                                    SHOP NOW
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col', 'l-6', 'm-12', 'c-12')}>
                        <div className={cx('img-home')}>
                            <img src={imgHome} alt="home" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Slider;
