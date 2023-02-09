import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from '~/layouts/DefaultLayout';
import { publicRoutes } from '~/routers';
import { Navigate } from 'react-router-dom';
import config from './config';
import ProtectedRoute from './routers/ProtectedRoute';
import Checkout from './pages/Checkout';
//admin
import Addproducts from '~/admin/Addproduct/AddProduct';
import Allproducts from '~/admin/Allproducts/Allproducts';
import Dashboard from '~/admin/Dashboard/Dashboard';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    <Route
                        path="/"
                        element={<Navigate to={config.routes.home} />} // path '/' = với 'home', 2 đường dẫn là 1
                    />
                    {/* chíc từ file protectedRoute để nhận children */}
                    {/* phải đăng nhập mới vào đc route con của protectedroute */}
                    <Route path="/" element={<ProtectedRoute />}>
                        <Route
                            path={config.routes.checkout}
                            element={<Checkout />}
                        />
                        <Route
                            path={config.routes.dashboard}
                            element={<Dashboard />}
                        />
                        <Route
                            path={config.routes.allproducts}
                            element={<Allproducts />}
                        />
                        <Route
                            path={config.routes.addproduct}
                            element={<Addproducts />}
                        />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
