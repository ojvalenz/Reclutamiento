import Vue from 'vue';
import Router from 'vue-router';
import Vacantes from './components/Vacantes';
import NewVacante from './components/Vacante';

import Candidato from './components/Candidato';
import Candidatos from './components/Candidatos';

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: '/Vacantes',
            name: 'home',
            component: Vacantes
        },
        {
            path: "/Candidatos",
            name: "Candidatos",
            component: Candidatos
        },
        {
            path: '/Vacantes/Edit/:id_vacante',
            component: NewVacante
        },
        {
            path: "/Vacantes/New",
            name: 'New Vacante',
            component: NewVacante
        }, {
            path: '/Candidatos/New',
            component: Candidato
        },
        {
            path: '/Candidatos/Edit/:id_candidato',
            component: Candidato
        }
    ]
})