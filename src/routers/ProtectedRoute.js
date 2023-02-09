import useAuth from '~/custom-hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// nhận lại function useAuth từ file useAuth

function ProtectedRoute() {
    const { currentUser } = useAuth();

    return currentUser ? <Outlet /> : <Navigate to="login" />;
}

export default ProtectedRoute;
// nếu mua hàng chưa đăng nhập thì sẽ chuyển đến trang đăng nhập
