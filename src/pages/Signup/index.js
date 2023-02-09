import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '~/firebase.config';
import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '~/firebase.config';
import { database } from '~/firebase.config';
import { toast } from 'react-toastify';

import Helmet from '~/components/Helmet';
import styles from './Signup.module.scss';
import config from '~/config';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Signup() {
    const [username, SetUsername] = useState('');
    const [email, SetEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // sau khi bấm nút submit setloading sẽ = true và sau đó lại = false để trả về trang
    const signup = async (e) => {
        e.preventDefault();
        setLoading(true);
        // trc await là 1 fetch API
        // try catch là then vs catch nếu ko có 2 cái này thì luôn trả về then(đúng)
        try {
            // nhận vào 3 giá trị useState để gửi lên sever
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            // .user là user sẵn trong firebase
            const user = userCredential.user;

            const storageRef = ref(storage, `images/${Date.now() + username}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    toast.error(error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => {
                            // update user profile
                            await updateProfile(user, {
                                displayName: username,
                                photoURL: downloadURL,
                            });

                            // store user data trong firebase db
                            await setDoc(doc(database, 'users', user.uid), {
                                uid: user.uid,
                                displayName: username,
                                email,
                                photoURL: downloadURL,
                            });
                        },
                    );
                },
            );

            setLoading(false);
            toast.success('Tạo tài khoản thành công');
            // dùng để chuyển trang sau khi đăng kí thành công
            navigate('/login');
        } catch (error) {
            setLoading(false);
            toast.error('Nhập sai email hoặc mật khẩu chưa đạt yêu cầu!');
        }
    };

    return (
        <Helmet title="Signup">
            <div className={cx('wrapper')}>
                <div className={cx('grid', 'wide', 'w-100')}>
                    <div className={cx('row')}>
                        {loading ? (
                            <div className={cx('col', 'l-12')}>
                                <h5 className={cx('title__loading')}>
                                    Loading.....
                                </h5>
                            </div>
                        ) : (
                            <div className={cx('col', 'l-6')}>
                                <h3 className={cx('title')}>Signup</h3>
                                <form
                                    className={cx('auth__form')}
                                    onSubmit={signup}
                                >
                                    <div className={cx('form__group')}>
                                        <input
                                            value={username}
                                            onChange={(e) =>
                                                SetUsername(e.target.value)
                                            }
                                            type="text"
                                            placeholder="Usename"
                                        />
                                    </div>

                                    <div className={cx('form__group')}>
                                        <input
                                            value={email}
                                            onChange={(e) =>
                                                SetEmail(e.target.value)
                                            }
                                            type="email"
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div className={cx('form__group')}>
                                        <input
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            value={password}
                                            type="password"
                                            placeholder="Enter your password"
                                        />
                                    </div>

                                    <div className={cx('form__group')}>
                                        <input
                                            onChange={(e) =>
                                                setFile(e.target.files[0])
                                            }
                                            type="file"
                                            placeholder="Enter your password"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className={cx('auth__btn')}
                                    >
                                        <Button>Create an Account</Button>
                                    </button>
                                    <p>
                                        Already have an acccount?{' '}
                                        <Link to={config.routes.login}>
                                            Login
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default Signup;
