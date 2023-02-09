import classNames from 'classnames/bind';

import styles from './Users.module.scss';
import useGetData from '~/custom-hooks/useGetData';
import Button from '~/components/Button';
import { deleteDoc, doc } from 'firebase/firestore';
import { database } from '~/firebase.config';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Users() {
    //users ở đây chình là dữ liệu users trên firebase
    const { data: usersData, loading } = useGetData('users');

    const deleteUser = async (id) => {
        await deleteDoc(doc(database, 'users', id));
        toast.success('xóa người dùng thành công!');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid', 'wide')}>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-12')}>
                        <h4 className={cx('title')}>Users</h4>
                    </div>

                    <div className={cx('col', 'l-12')}>
                        <table
                            className={cx('table')}
                            cellPadding={0}
                            cellSpacing={0}
                        >
                            <thead>
                                <tr>
                                    <th align="left">Image</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th align="right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <h5 className={cx('title__loading')}>
                                        Loading.....
                                    </h5>
                                ) : (
                                    usersData?.map((user) => (
                                        <tr key={user.id}>
                                            <td align="left">
                                                <img
                                                    src={user.photoURL}
                                                    alt=""
                                                />
                                            </td>
                                            <td>{user.displayName}</td>
                                            <td>{user.email}</td>
                                            <td align="right">
                                                <button
                                                    className={cx('delete')}
                                                    // truyền đối số là user.uid và nó sẽ nhận vào tham số giá trị là user.uid trên firebase
                                                    onClick={() => {
                                                        deleteUser(user.uid);
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

export default Users;
