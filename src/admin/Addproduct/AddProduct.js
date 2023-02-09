import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { toast } from 'react-toastify';
import { database, storage } from '~/firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import styles from './Addproduct.module.scss';
import { upload } from '@testing-library/user-event/dist/upload';

const cx = classNames.bind(styles);

function Addproducts() {
    const [enterTitle, setEnterTitle] = useState('');
    const [enterShortDesc, setEnterShortDesc] = useState('');
    const [enterDescription, setEnterDescription] = useState('');
    const [enterCategory, setEnterCategory] = useState('');
    const [enterPrice, setEnterPrice] = useState('');
    const [enterProductImage, setEnterProductImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    // khi add xong sẽ đẩy lên sever và thằng useGetdata sẽ nhận về
    const addProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        // cho những thứ đã điền ở input vào 1objet
        // const product = {
        //     title: enterTitle,
        //     shortDesc: enterShortDesc,
        //     description: enterDescription,
        //     category: enterCategory,
        //     price: enterPrice,
        //     imgUrl: enterProductImage,
        // };

        // add product to the firebase database
        try {
            const docRef = await collection(database, 'products');
            //. chấm name là tên của ảnh chứ k phải ảnh + thời gian hiện tại
            const storageRef = ref(
                storage,
                `productImages/${Date.now() + enterProductImage.name}`,
            );
            // sau rồi t truyền 2 giá trị là storageRef(tên của ảnh + thời gian hiện tại) và ảnh lên database firebase
            const uploadTask = uploadBytesResumable(
                storageRef,
                enterProductImage,
            );
            uploadTask.on(
                () => {
                    toast.error('ảnh không thẻ đưa lên');
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => {
                            await addDoc(docRef, {
                                productName: enterTitle,
                                shortDesc: enterShortDesc,
                                description: enterDescription,
                                category: enterCategory,
                                price: enterPrice,
                                imgUrl: downloadURL,
                            });
                        },
                    );
                },
            );
            setLoading(false);
            toast.success('đang thêm thành công sản phẩm mới!');
            navigate('/dashboard/all-products');
        } catch (error) {
            setLoading(false);
            toast.error('không thể thêm sản phẩm!');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid', 'wide')}>
                <div className={cx('row')}>
                    {loading ? (
                        <div className={cx('col', 'l-12')}>
                            <h5 className={cx('title__loading')}>
                                Loading.....
                            </h5>
                        </div>
                    ) : (
                        <div className={cx('col', 'l-12')}>
                            <h4 className={cx('label')}>Add Product</h4>
                            <form onSubmit={addProduct}>
                                <div className={cx('form__group')}>
                                    <span>Product Title</span>
                                    {/* e.target.value mà value lại là thằng entertitle
                                mà entertitle lại nghe theo setEnterTitle
                                nên là khi viết gì đó vào value thì thằng setEnterTitle sẽ cập nhật
                                và thằng entertitle sẽ có dữ liệu đó
                                */}
                                    <input
                                        type="text"
                                        placeholder="Double sofa"
                                        value={enterTitle}
                                        onChange={(e) =>
                                            setEnterTitle(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className={cx('form__group')}>
                                    <span>Short Description</span>
                                    <input
                                        type="text"
                                        placeholder="viết gì đó đi........"
                                        value={enterShortDesc}
                                        onChange={(e) =>
                                            setEnterShortDesc(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className={cx('form__group')}>
                                    <span>Description</span>
                                    <input
                                        type="text"
                                        placeholder="Description........"
                                        value={enterDescription}
                                        onChange={(e) =>
                                            setEnterDescription(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className={cx('fix__form')}>
                                    <div className={cx('form__group')}>
                                        <span>Price</span>
                                        <input
                                            type="number"
                                            placeholder="$100"
                                            value={enterPrice}
                                            onChange={(e) =>
                                                setEnterPrice(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className={cx('form__group')}>
                                        <span>Category</span>
                                        <select
                                            value={enterCategory}
                                            onChange={(e) =>
                                                setEnterCategory(e.target.value)
                                            }
                                            required
                                        >
                                            <option>Select cartegory</option>

                                            <option value="chair">Chair</option>
                                            <option value="sofa">Sofa</option>
                                            <option value="mobile">
                                                Mobile
                                            </option>
                                            <option value="watch">Watch</option>
                                            <option value="wireless">
                                                Wireless
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <div className={cx('form__group')}>
                                        <span>Product Image</span>
                                        <input
                                            type="file"
                                            onChange={(e) =>
                                                // mảng = 0 để lưu ý răng luôn lấy ảnh đầu tiên cho dù chọn nhiều ảnh
                                                setEnterProductImage(
                                                    e.target.files[0],
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <button>
                                    <Button>Add Product</Button>
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Addproducts;
