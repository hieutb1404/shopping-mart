import { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '~/firebase.config';

function useAuth() {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });
    });
    return { currentUser };
}
// sau đó create ProtectedRoute.js trong routes

export default useAuth;
