import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { NavLink, useNavigate, Link } from 'react-router-dom';

import styles from './Header.module.scss';
import './header.css';
import logo from '~/assets/images/eco-logo.png';
import userIcon from '~/assets/images/user-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { CartIcon } from '~/components/icons';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import useAuth from '~/custom-hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '~/firebase.config';
import { toast } from 'react-toastify';

const navLinks = [
    {
        path: config.routes.home,
        display: 'Home',
    },
    {
        path: config.routes.shop,
        display: 'Shop',
    },
    {
        path: config.routes.cart,
        display: 'Cart',
    },
];

const cx = classNames.bind(styles);

function Header() {
    const [fix, setFix] = useState(false);
    const [showGoToTop, setShowGoToTop] = useState(false);
    const [switchToggle, setSwitchToggle] = useState(false);
    //login verifi
    const { currentUser } = useAuth();

    const navigate = useNavigate();
    const menuRef = useRef();
    // state chính là dữ liệu từ product chuyển vào cartslice
    // state nhận vào đặt tên gì cũng đc
    // state.cart -> cart ở đây là biến từ file store.js
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    const profileActionRef = useRef(null);

    const logout = () => {
        signOut(auth)
            .then(() => {
                toast.success('Đã thoát tài khoản');
                navigate('/home');
            })

            .catch((error) => {
                toast.error(error.message);
            });
    };

    useEffect(() => {
        const setFixed = () => {
            if (window.scrollY > 80) {
                setFix(true);
                setShowGoToTop(true);
            } else {
                setFix(false);
                setShowGoToTop(false);
            }
        };
        window.addEventListener('scroll', setFixed);
        // cleanup function
        return () => {
            window.removeEventListener('scroll', setFixed);
        };
    }, []);
    // hoặc có thể cho là setSwitchToggle(!switchToggle)
    // phủ định thì trả về giá trị ngược lại
    const ToggleSwitch = () => {
        return switchToggle ? setSwitchToggle(false) : setSwitchToggle(true);
    };
    useEffect(() => {
        let handlerOutSide = (event) => {
            // nếu bấm ra ngoài mục tiêu ! sẽ trả về false vì ở đây có dấu !menuRef nghĩa là ko phải menuRef
            // nghĩa là thẻ nào ko có menuRef thì sẽ = false
            // có sẽ = true
            // theo đúng quy tắc phủ định ngược lại giá trị nó có
            // thì thẻ nào có menuRef sẽ trả về true ngược lại sẽ trả về false
            // ban đầu ko xét true false vào menuRef thì nó tự nhận là true
            // menuRef thì là true và có điều kiện là thẻ list
            // còn ngược lại phủ định của menuRef true là ko có  menuref và = false
            // còn false thì cho điều kiện là setSwitchToggle(false)
            if (!menuRef.current.contains(event.target)) {
                event.stopPropagation();
                setSwitchToggle(false);
            }
        };
        //mousedown là khi ấn chuột xuống vả nhả
        document.addEventListener('mousedown', handlerOutSide, true);
        return () => {
            document.removeEventListener('mousedown', handlerOutSide, true);
        };
    });

    // bấm vào giỏ hàng thì về giỏ hàng(điều hướng)
    const navigateTocart = () => {
        navigate('/cart');
    };

    const toggleProfileActions = () =>
        profileActionRef.current.classList.toggle('show__profileActions');

    return (
        <div className={cx(fix ? 'wrapper-fixed' : 'wrapper')}>
            <div className={cx('grid', 'wide', 'w-100')}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <img src={logo} alt="logo" />
                        <div>
                            <h1>Multimart</h1>
                        </div>
                    </div>

                    <div
                        className={cx(
                            switchToggle
                                ? 'navigation active__menu'
                                : 'navigation ',
                        )}
                    >
                        <ul
                            className={cx('list')}
                            ref={
                                menuRef
                            } /** theo logic ở trên là ko phải menuRef thì sẽ trả vềsetSwitchToggle(false) !menuRef .
                            nhưng ở đây t lại cho menuRef vào thẻ List nghĩa là trong thẻ list có menuRef  và ko có trong điều kiện ở trên
                            khi ta bấm vào chỗ nào đó ngoài thẻ list thì nó sẽ ăn vào điều kiện ở trên là !menuRef vì các thẻ ngoài ko có menuRef
                        */
                        >
                            {navLinks.map((item, index) => (
                                <li key={index} className={cx('item')}>
                                    <NavLink
                                        className={(nav) =>
                                            cx('nav-item', {
                                                active: nav.isActive,
                                            })
                                        }
                                        // navlink đúng cái link thì sẽ phát hiện là đúng và hiện css
                                        // nếu nav truyền vào đúng ở link t bấm có trên path thì nav sẽ đúng và chạy css
                                        to={item.path}
                                    >
                                        {item.display}
                                    </NavLink>
                                </li>
                            ))}
                            <span
                                className={cx('navbars-close')}
                                onClick={ToggleSwitch}
                            >
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                        </ul>
                    </div>

                    <div className={cx('nav-icons')}>
                        <span className={cx('fav-icon')}>
                            <FontAwesomeIcon icon={faHeart} />
                            <span className={cx('badge')}>1</span>
                        </span>
                        <span
                            className={cx('cart-icon')}
                            onClick={navigateTocart}
                        >
                            <CartIcon />
                            <span className={cx('badge')}>{totalQuantity}</span>
                        </span>
                        <div className={cx('profile')}>
                            <motion.img
                                whileTap={{ scale: 1.2 }}
                                // nếu đăng nhập thì hiện ảnh của người dùng , còn chưa đăng nhập thì hiện ảnh chưa đăng nhập
                                src={
                                    currentUser
                                        ? currentUser.photoURL
                                        : userIcon
                                }
                                alt="usericon"
                                onClick={toggleProfileActions}
                            />

                            <div
                                className={cx('profile__actions')}
                                ref={profileActionRef}
                                onClick={toggleProfileActions}
                            >
                                {currentUser ? (
                                    <span onClick={logout}>Logout</span>
                                ) : (
                                    <div className={cx('login')}>
                                        <Link to={config.routes.signup}>
                                            Đăng ký
                                        </Link>
                                        <Link to={config.routes.login}>
                                            Đăng nhập
                                        </Link>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <span className={cx('navbars')} onClick={ToggleSwitch}>
                            <FontAwesomeIcon icon={faBars} />
                        </span>
                    </div>
                </div>
            </div>
            {showGoToTop && (
                <button
                    onClick={() =>
                        window.scroll({
                            top: 0,
                            left: 0,
                            behavior: 'smooth',
                        })
                    }
                    className={cx('gototop')}
                >
                    Go To Top
                </button>
            )}
        </div>
    );
}

export default Header;
