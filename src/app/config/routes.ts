import { IRoute } from './types';
import { ProductList } from '../../features/product/components/ProductList';
import { Cart } from '../../features/cart/components/Cart';

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Products',
        component: ProductList,
        exact: true
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Cart,
        exact: true
    },
]

export default routes;