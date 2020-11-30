import { SideNavItems, SideNavSection } from 'src/modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'ADMIN',
        items: ['dashboard'],
    },
    {
        text: 'FORUM',
        items: ['create_forum', 'view_forum', 'list_forums'],
    },
    {
        text: 'POSTS',
        items: ['create_post'],
    },
];

// export const sideNavSections: SideNavSection[] = [
//     {
//         text: 'CORE',
//         items: ['dashboard'],
//     },
//     {
//         text: 'INTERFACE',
//         items: ['layouts', 'pages'],
//     },
//     {
//         text: 'ADDONS',
//         items: ['charts', 'tables'],
//     },
// ];


export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    create_forum: {
        icon: 'tachometer-alt',
        text: 'Add Forum',
        link: '/forums/add',
    },
    view_forum: {
        icon: 'tachometer-alt',
        text: 'View Forum',
        link: '/forums/1',
    },
    list_forums: {
        icon: 'tachometer-alt',
        text: 'List Forums',
        link: '/forums/',
    },
    create_post: {
        icon: 'tachometer-alt',
        text: 'New Post',
        link: '/post/add',
    },

    layouts: {
        icon: 'columns',
        text: 'Layouts',
        submenu: [
            {
                text: 'Static Navigation',
                link: '/dashboard/static',
            },
            {
                text: 'Light Sidenav',
                link: '/dashboard/light',
            },
        ],
    },
    pages: {
        icon: 'book-open',
        text: 'Pages',
        submenu: [
            {
                text: 'Authentication',
                submenu: [
                    {
                        text: 'Login',
                        link: '/auth/login',
                    },
                    {
                        text: 'Register',
                        link: '/auth/register',
                    },
                    {
                        text: 'Forgot Password',
                        link: '/auth/forgot-password',
                    },
                ],
            },
            {
                text: 'Error',
                submenu: [
                    {
                        text: '401 Page',
                        link: '/error/401',
                    },
                    {
                        text: '404 Page',
                        link: '/error/404',
                    },
                    {
                        text: '500 Page',
                        link: '/error/500',
                    },
                ],
            },
        ],
    },
    charts: {
        icon: 'chart-area',
        text: 'Charts',
        link: '/charts',
    },
    tables: {
        icon: 'table',
        text: 'Tables',
        link: '/tables',
    },
};
