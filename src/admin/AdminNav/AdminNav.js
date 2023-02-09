import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faGear, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import config from '~/config';

import useAuth from '~/custom-hooks/useAuth';

import styles from './AdminNav.module.scss';

import { NavLink } from 'react-router-dom';
import { isContentEditable } from '@testing-library/user-event/dist/utils';

const cx = classNames.bind(styles);

const admin__nav = [
    {
        display: 'Dashboard',
        path: '/dashboard',
    },
    {
        display: 'All-Products',
        path: '/dashboard/all-products',
    },
    {
        display: 'Add-Product',
        path: '/dashboard/add-product',
    },
    {
        display: 'Users',
        path: '/dashboard/users',
    },
];

function AdminNav() {
    const { currentUser } = useAuth();

    return (
        <>
            <header className={cx('admin__header')}>
                <div className={cx('admin__nav-top')}>
                    <div className={cx('grid', 'wide')}>
                        <div className={cx('admin__nav-wrapper-top')}>
                            <div className={cx('logo')}>
                                <h2>Multipmart</h2>
                            </div>

                            <div className={cx('search__box')}>
                                <input type="text" placeholder="Search......" />
                                <span>
                                    <i>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </i>
                                </span>
                            </div>

                            <div className={cx('admin__nav-top-right')}>
                                <span>
                                    <i>
                                        <FontAwesomeIcon icon={faBell} />
                                    </i>
                                </span>
                                <span>
                                    <i>
                                        <FontAwesomeIcon icon={faGear} />
                                    </i>
                                </span>
                                <img
                                    // nếu dăng nhập thì hiện ảnh user
                                    src={currentUser && currentUser.photoURL}
                                    alt="user"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className={cx('admin__menu')}>
                <div className={cx('grid', 'wide')}>
                    <div className={cx('admin__navigation')}>
                        <ul className={cx('admin__menu-list')}>
                            {admin__nav.map((item, index) => (
                                <li
                                    className={cx('admin__menu-item')}
                                    key={index}
                                >
                                    {/*  mỗi đường link tương đương với 1 tên */}
                                    {/* nếu nav truyền vào đúng ở link t bấm có trên path thì nav sẽ đúng và chạy css */}
                                    <NavLink
                                        className={(nav) =>
                                            nav.isActive
                                                ? cx('active__admin-menu')
                                                : ''
                                        }
                                        to={item.path}
                                    >
                                        {item.display}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminNav;
