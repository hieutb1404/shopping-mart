import Config from '~/config';
//pages
import Home from '~/pages/Home';
import Cart from '~/pages/Cart';
import Shop from '~/pages/Shop';
import Checkout from '~/pages/Checkout';
import ProductDetails from '~/pages/ProductDetails';
import Signup from '~/pages/Signup';
import Login from '~/pages/Login';
import ProtectedRoute from './ProtectedRoute';
//admin
import Addproducts from '~/admin/Addproduct/AddProduct';
import Allproducts from '~/admin/Allproducts/Allproducts';
import Dashboard from '~/admin/Dashboard/Dashboard';
import Users from '~/admin/Users/Users';

const publicRoutes = [
    { path: Config.routes.home, component: Home },
    { path: Config.routes.cart, component: Cart },
    { path: Config.routes.shop, component: Shop },
    { path: Config.routes.checkout, component: Checkout },
    { path: Config.routes.productdetails, component: ProductDetails },
    { path: Config.routes.signup, component: Signup },
    { path: Config.routes.login, component: Login },
    { path: Config.routes.dashboard, component: Dashboard },
    { path: Config.routes.allproducts, component: Allproducts },
    { path: Config.routes.addproduct, component: Addproducts },
    { path: Config.routes.users, component: Users },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
