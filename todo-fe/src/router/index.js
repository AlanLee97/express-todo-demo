import VueRouter from 'vue-router';
import Todo from "../pages/todo/Todo.vue";
import Login from "../pages/login/Login.vue";

const routes = [
  { path: '/login', component: Login },
  { path: '/todo', component: Todo },
  {
    path: "*",
    redirect: "/login"
  }
];

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
});

export default router;