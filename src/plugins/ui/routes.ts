import { registerRouteComponent } from '@vendure/admin-ui/core';
import { AssignComponent } from './components/assignCustomer.component';

export default [
    registerRouteComponent({
        component: AssignComponent,
        path: '',
        title: 'Customer Assign Page',
        breadcrumb: 'Customer Associate',
    }),
];