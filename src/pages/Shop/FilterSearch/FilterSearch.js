import { useEffect, useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import Styles from './FilterSearch.module.scss';
import ProductsList from '~/components/Products/ProductsList';
import { faCircle, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

import useGetData from '~/custom-hooks/useGetData';

const cx = classNames.bind(Styles);

function FilterSearch() {
    const { data: products } = useGetData('products');
    const [productsData, setProductsData] = useState(products);
    const [searchValue, setSearchValue] = useState('');
    // lưu ý ko được để setProductsData vào trong biến lọc(filter), phải đưa nó ra ngoài biến lọc

    const handleFilter = (e) => {
        const filterValue = e.target.value;
        if (filterValue === 'sofa') {
            const filteredProducts = products.filter(
                (item) => item.category === 'sofa',
            );
            setProductsData(filteredProducts);
        }

        if (filterValue === 'mobile') {
            const filteredProducts = products.filter(
                (item) => item.category === 'mobile',
            );
            setProductsData(filteredProducts);
        }

        if (filterValue === 'chair') {
            const filteredProducts = products.filter(
                (item) => item.category === 'chair',
            );
            setProductsData(filteredProducts);
        }

        if (filterValue === 'watch') {
            const filteredProducts = products.filter(
                (item) => item.category === 'watch',
            );
            setProductsData(filteredProducts);
        }

        if (filterValue === 'wireless') {
            const filteredProducts = products.filter(
                (item) => item.category === 'wireless',
            );
            setProductsData(filteredProducts);
        }
    };

    const handleSearch = (e) => {
        const searchTernm = e.target.value;
        const searchedProducts = products.filter((item) =>
            item.productName.toLowerCase().includes(searchTernm.toLowerCase()),
        );
        // phủ định ngược lại: từ bắt đầu từ dấu cách, khi phủ định sẽ là ko bắt đầu = dấu cách
        if (!searchTernm.startsWith(' ')) {
            setSearchValue(searchTernm);
        }
        setProductsData(searchedProducts);
    };

    const handleClear = () => {
        setSearchValue('');
        setProductsData(products);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('grid', 'wide', 'w-100')}>
                    <div className={cx('row')}>
                        <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                            <div className={cx('inner')}>
                                <div className={cx('filter')}>
                                    <select onChange={handleFilter}>
                                        <option>Filter by Category</option>
                                        <option value="sofa">Sofa</option>
                                        <option value="mobile">Mobile</option>
                                        <option value="chair">Chair</option>
                                        <option value="watch">Watch</option>
                                        <option value="wireless">
                                            Wireless
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={cx('col', 'l-3', 'm-6', 'c-6')}>
                            <div className={cx('inner')}>
                                <div className={cx('filter', 'filter-mobile')}>
                                    <select>
                                        <option>Sort</option>
                                        <option value="ascending">
                                            Ascending
                                        </option>
                                        <option value="descending">
                                            Descending
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={cx('col', 'l-6', 'm-12', 'c-12')}>
                            <div className={cx('inner')}>
                                <div className={cx('search')}>
                                    {/* thằng searchTerm và SearchValue khác nhau */}
                                    {/* muốn searchValue có giá trị kế thừa của searchTerm thì phải setSearchValue(searchTerm) sau đó value vào input thì nó sẽ kế thừa lại*/}
                                    <input
                                        value={searchValue}
                                        type="text"
                                        placeholder="Search...."
                                        onChange={handleSearch}
                                    />
                                    {!!searchValue ? (
                                        <button
                                            className={cx('clear')}
                                            onClick={handleClear}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCircleXmark}
                                            />
                                        </button>
                                    ) : (
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faMagnifyingGlass}
                                            />
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* trong thằng productsList có grid wide row các thứ rồi nên khi nào đây chúng ta phải bỏ nó ở ngoài thẻ grid để tránh bị trùng */}
            {/* length là phẩn tử của NameProduct nếu có thì nó sẽ đếm, còn name ko tồn tại đồng nghĩa với ko đếm đc và ko tìm thấy để đếm thì = 0 */}
            {productsData.length === 0 ? (
                <h1 className={cx('search-Value')}>Không tìm thấy sản phẩm</h1>
            ) : (
                <ProductsList data={productsData} />
            )}
        </div>
    );
}

export default FilterSearch;
