import { addNavMenuItem } from '@vendure/admin-ui/core';

export default [
    addNavMenuItem(
        {
            id: 'greeter', // Unique ID for the item
            label: 'Assign-User', // Item label
            routerLink: ['/extensions/auto-assign-customer'],
            icon: 'assign-user',
        },
        'customers', // The section ID where the item will be added
        'Customer groups' // (Optional) ID of an existing item to place this item before
    ),
];
