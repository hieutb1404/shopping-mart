import { motion } from 'framer-motion';
import classNames from 'classnames/bind';

import styles from './Services.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import serviceDate from '~/assets/data/serviceData';

const cx = classNames.bind(styles);

function Services() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner', 'grid wide', 'w-100')}>
                <div className={cx('row')}>
                    {serviceDate.map((item, index) => (
                        <div
                            key={index}
                            className={cx('col', 'l-3', 'm-6', 'c-12')}
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className={cx('item')}
                                style={{ background: `${item.bg}` }}
                            >
                                <span className={cx('icon')}>
                                    <FontAwesomeIcon icon={item.icon} />
                                </span>
                                <div className={cx('content')}>
                                    <h3>{item.title}</h3>
                                    <p>{item.subtitle}</p>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Services;
