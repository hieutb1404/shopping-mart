import classNames from 'classnames/bind';

import Helmet from '~/components/Helmet';
import Styles from './Shop.module.scss';
import CommonSection from '~/components/CommonSection';
import FilterSearch from './FilterSearch/FilterSearch';

const cx = classNames.bind(Styles);

function Shop() {
    return (
        <Helmet title="Shop">
            <CommonSection title="Products" />

            <FilterSearch />
        </Helmet>
    );
}

export default Shop;
