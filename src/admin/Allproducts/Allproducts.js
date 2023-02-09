import classNames from 'classnames/bind';
import Button from '~/components/Button';

import styles from './Allproducts.module.scss';
import useGetData from '~/custom-hooks/useGetData';
import { database } from '~/firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Allproducts() {
    const navigate = useNavigate();

    // useGetData nhận vào dữ liêu là products có sẵn trên trên firebase
    const { data: productsData, loading } = useGetData('products');
    // tham số biến id sẽ tiếp nhận giá trị đầu vào mỗi khi hàm đc gọi
    // ví dụ : nó sẽ lấy đối số được truyền vào từ ngoài vào và nó nhận đc giá trị từ đối số đó
    // muốn tìm đc ra id thì ta phải truyền đối số vào là dữ liệu
    const deleteProduct = async (id) => {
        await deleteDoc(doc(database, 'products', id));
        toast.success('Đã xóa sản phẩm!');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid', 'wide')}>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-12')}>
                        <table
                            cellPadding={10}
                            cellSpacing={0}
                            className={cx('table')}
                        >
                            <thead>
                                <tr>
                                    <th align="left">Image</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th align="right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <h3 className={cx('title__loading')}>
                                        Loading.....
                                    </h3>
                                ) : (
                                    productsData.map((item) => (
                                        <tr key={item.id}>
                                            <td align="left">
                                                <img
                                                    src={item.imgUrl}
                                                    alt="productImg"
                                                />
                                            </td>
                                            <td>{item.productName}</td>
                                            <td>{item.category}</td>
                                            <td>${item.price}</td>
                                            <td align="right">
                                                <button
                                                    className={cx('delete')}
                                                    // truyền đối số vào là item(chính là dữ liệu)
                                                    // để thằng async có thể get ra id và xóa
                                                    onClick={() => {
                                                        deleteProduct(item.id);
                                                    }}
                                                >
                                                    {' '}
                                                    <Button>Delete</Button>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Allproducts;
