import store from "@/store";

export default function canRoute(to, from, next) {
  if (store.state.Auth.isAuthenticated && to.name === "Login") {
    next(`${from.path}`);
  } else {
    next();
  }
}
