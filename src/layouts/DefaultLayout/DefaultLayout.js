import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import styles from './DefaultLayout.module.scss';
import config from '~/config';

import AdminNav from '~/admin/AdminNav/AdminNav';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const location = useLocation();

    return (
        <div className={cx('wrapper')}>
            {/* nếu vs link là dashboard thì hiện header admin ko có thì header user  */}
            {location.pathname.startsWith(config.routes.dashboard) ? (
                <AdminNav />
            ) : (
                <Header />
            )}

            <div className={cx('content')}>{children}</div>

            <Footer />
        </div>
    );
}

export default DefaultLayout;
