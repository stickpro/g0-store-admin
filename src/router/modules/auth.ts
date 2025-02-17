import { APP_LAYOUT } from "@/layouts";
import guest from "@/router/middlewares/guest";

export default [
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/auth/AuthView.vue"),
    meta: { layout: APP_LAYOUT.AUTH, middleware: [guest] },
    redirect: () => ({ name: "sign-in" }),
    children: [
      {
        path: "sign-in",
        name: "sign-in",
        meta: { layout: APP_LAYOUT.AUTH, middleware: [guest] },
        component: () => import("@/views/auth/signIn/SignInView.vue"),
      },
    ]
  }
];
