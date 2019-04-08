import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/home/login/Login';
import Candidato from '@/components/candidato/candidato/Candidato';
import CandidatoDetalle from '@/components/candidato/candidatoDetalle/CandidatoDetalle';
import Candidatos from '@/components/candidato/candidatos/Candidatos';
import Vacantes from '@/components/vacante/vacantes/Vacantes';
import Vacante from '@/components/vacante/vacante/Vacante';

Vue.use(Router)

const routes = [
  {
    name: 'login',
    path: '/',
    component: Login,
    meta: { requiresAuth: false, candidateAuth: false, headhunterAuth: false, interviewerAuth: false, adminAuth: false }
  },
  {
    name: 'candidatos',
    path: '/candidatos',
    component: Candidatos,
    meta: { requiresAuth: true, candidateAuth: false, headhunterAuth: false, interviewerAuth: false, adminAuth: true }
  },
  {
    name: 'candidato',
    path: '/candidato/:id_candidato?',
    component: Candidato,
    meta: { requiresAuth: true, candidateAuth: false, headhunterAuth: false, interviewerAuth: false, adminAuth: true }
  },
  {
    name: 'candidatoDetalle',
    path: '/candidato/detalle/:id_candidato?',
    component: CandidatoDetalle,
    meta: { requiresAuth: true, candidateAuth: false, headhunterAuth: false, interviewerAuth: false, adminAuth: true }
  },
  {
    name: 'vacantes',
    path: '/vacantes',
    component: Vacantes,
    meta: { requiresAuth: true, candidateAuth: false, headhunterAuth: false, interviewerAuth: false, adminAuth: true }
  },
  {
    name: 'vacante',
    path: '/vacante/:id_vacante?',
    component: Vacante,
    meta: { requiresAuth: true, candidateAuth: false, headhunterAuth: false, interviewerAuth: false, adminAuth: true }
  }
];

const router = new Router({ routes, mode: 'history' })

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('user'));
    if (!authUser) {
      next('/')
    }
    else if (to.meta.adminAuth && authUser.role === 'ADMIN') {
      next();
    }
  } else {
    next();
  }
});

export default router;
