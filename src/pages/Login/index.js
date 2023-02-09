import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import { useState } from 'react';

import Helmet from '~/components/Helmet';
import styles from './Login.module.scss';
import config from '~/config';
// import để đăng nhập
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/firebase.config';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Login() {
    const [email, SetEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );

            const user = userCredential.user;

            setLoading(false);
            toast.success('đăng nhập thành công!');
            navigate('/checkout');
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };

    return (
        <Helmet title="Login">
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
                                <h3 className={cx('title')}>Login</h3>
                                <form
                                    className={cx('auth__form')}
                                    onSubmit={signIn}
                                >
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

                                    <button
                                        type="submit"
                                        className={cx('auth__btn')}
                                    >
                                        <Button>Login</Button>
                                    </button>
                                    <p>
                                        Don't have an acccount?{' '}
                                        <Link to={config.routes.signup}>
                                            Create an account
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

export default Login;
