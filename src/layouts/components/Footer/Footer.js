import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';
import logo from '~/assets/images/eco-logo.png';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMailReply,
    faMapPin,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    const year = new Date().getFullYear();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid wide', 'w-100')}>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-4', 'm-3', 'c-12')}>
                        <div className={cx('inner')}>
                            <div className={cx('logo')}>
                                <h1 className={cx('logo-name')}>Multimart</h1>
                            </div>

                            <p className={cx('text')}>
                                Hân hạnh được tài trợ chương trình này aihihihi.
                                Hiếu Hân hạnh được tài trợ chương trình này
                                aihihihi Trung Bùi trung hiếu đẹp trai?
                            </p>
                        </div>
                    </div>

                    <div className={cx('col', 'l-3', 'm-3', 'c-12')}>
                        <div className={cx('inner')}>
                            <div className={cx('quick-links')}>
                                <h4 className={cx('title')}>Top Categies</h4>
                            </div>

                            <ul className="list">
                                <li className={cx('item')}>
                                    <Link to="#">Mobile Phones</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to="#">Modern Sofa</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to="#">Arm Chair</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to="#">Smart Watches</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={cx('col', 'l-2', 'm-2', 'c-12')}>
                        <div className={cx('inner')}>
                            <div className={cx('quick-links')}>
                                <h4 className={cx('title')}>Useful Links</h4>
                            </div>

                            <ul className="list">
                                <li className={cx('item')}>
                                    <Link to={config.routes.shop}>Shop</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to={config.routes.cart}>Cart</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to={config.routes.login}>Login</Link>
                                </li>
                                <li className={cx('item')}>
                                    <Link to="#">Privacy Policy</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('col', 'l-2', 'm-4', 'c-12')}>
                        <div className={cx('inner')}>
                            <div className={cx('quick-links')}>
                                <h4 className={cx('title')}>Contact</h4>
                            </div>

                            <ul className="list">
                                <li className={cx('item')}>
                                    <span>
                                        {' '}
                                        <FontAwesomeIcon icon={faMapPin} />{' '}
                                    </span>
                                    <p>133, Hà Nội, Việt Nam</p>
                                </li>
                                <li className={cx('item')}>
                                    <span>
                                        {' '}
                                        <FontAwesomeIcon icon={faPhone} />{' '}
                                    </span>
                                    <p>+84962193221</p>
                                </li>
                                <li className={cx('item')}>
                                    <span>
                                        {' '}
                                        <FontAwesomeIcon
                                            icon={faMailReply}
                                        />{' '}
                                    </span>
                                    <p>toilahieu2244@gmail.com</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('col', 'l-12', 'm-12', 'c-12')}>
                        <div className={cx('copyright')}>
                            @copyright {year} developed by Trung Hieu.{' '}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
