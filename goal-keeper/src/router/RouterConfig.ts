import Vue from 'vue';
import VueRouter from 'vue-router';
import { RouteConfig } from 'vue-router/types/router';
import Routes from './Routes';

Vue.use(VueRouter);

export const routes: RouteConfig[] = [
    {
        name: Routes.Main,
        path: '/',
        component: () => import('../components/Main.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        name: Routes.Login,
        path: '/login',
        component: () => import('../components/accessmanagement/Login.vue'),
        meta: {
            guest: true
        }
    },
    {
        name: Routes.ForgotPassword,
        path: '/forgot-password',
        component: () => import('../components/accessmanagement/ForgotPassword.vue'),
        meta: {
            guest: true
        }
    },
    {
        name: Routes.UpdatePassword,
        path: '/update-password',
        component: () => import('../components/accessmanagement/UpdatePassword.vue'),
        meta: {
            guest: true
        }
    },
    {
        name: Routes.Register,
        path: '/signup',
        component: () => import('../components/accessmanagement/Register.vue'),
        meta: {
            guest: true
        }
    },
    {
        name: Routes.SessionGame,
        path: '/session-game/:sessionId',
        component: () => import('../components/sessions/game/SessionGame.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        name: Routes.ManageTeam,
        path: '/manage-team',
        component: () => import('../components/manageteam/ManageTeam.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        name: Routes.ManageTeam,
        path: '/manage-team/edit',
        component: () => import('../components/wizard/TeamWizard.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        name: Routes.Player,
        path: '/manage-team/player',
        component: () => import('../components/wizard/PlayerWizard.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        name: Routes.Player,
        path: '/manage-team/player/:playerId',
        component: () => import('../components/wizard/PlayerWizard.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        name: Routes.CreateClubTeam,
        path: '/create-clubTeam',
        component: () => import('../components/manageteam/components/CreateClubTeam.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        name: Routes.SessionWizard,
        path: '/session-wizard',
        component: () => import('../components/wizard/SessionWizard.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        name: Routes.Dashboard,
        path: '/dashboard/main',
        component: () => import('../components/dashboard/main/DashboardMain.vue'),
        meta: {
            requiresAuth: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
});

// check roles and token before each request
router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('user') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
           next();
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('user') == null){
            next();
        }
        else{
            next({ name: 'main'})
        }
    } else {
        next()
    }
})

export default router;
