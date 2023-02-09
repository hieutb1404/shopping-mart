import { useEffect, useState } from 'react';

import { database } from '~/firebase.config';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

function useGetData(collectionName) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const collectionRef = collection(database, collectionName);
    // dùng snapshot để giúp reload trang khi xóa product , tránh trường hợp xóa xong reload thì product mới mất
    // và nó sẽ cập nhật liên tục và hiện luôn ra web chứ ko bị delay và reload
    useEffect(() => {
        const getData = async () => {
            await onSnapshot(collectionRef, (snapshot) => {
                // ... tất cả dữ liệu trước đẩy vào data
                setData(
                    snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
                );
                setLoading(false);
            });
        };
        getData();
    }, []);

    return { data, loading };
}
// nhận dữ liệu sau khi add product về và đẩy lên web

export default useGetData;
