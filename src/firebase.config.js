import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDYy4zlvNwh1fS8J45ZfdWeAkcvHr5t9SA',
    authDomain: 'trunghieumart-ebf0b.firebaseapp.com',
    projectId: 'trunghieumart-ebf0b',
    storageBucket: 'trunghieumart-ebf0b.appspot.com',
    messagingSenderId: '429567721049',
    appId: '1:429567721049:web:ea877a2df37a08138afb48',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// get nhận về từ biến app đưa vào 1 biến mới để export ra ngoài đưa lên sever
// lưu ý là server nó chỉ nhận lên khi đúng từ khóa là getAuth ....
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);

export default app;
