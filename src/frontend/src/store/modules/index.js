// import Builder from "@/store/modules/builder.store";
// import Cart from "@/store/modules/cart.store";
// import Auth from "@/store/modules/auth.store";
// import Addresses from "@/store/modules/addresses.store";
// import Orders from "@/store/modules/orders.store";

// Используем функцию require.context webpack для получения списка файлов системы
const requireContext = require.context("@/modules/", true, /store\.js$/);

// Преобразуем каждый файл в модуль vuex
export default requireContext.keys().reduce((modules, filename) => {
  const moduleName = filename
    .split("/")[1]
    .replace(/^\w/, (c) => c.toUpperCase());
  modules[moduleName] =
    requireContext(filename).default || requireContext(filename);
  return modules;
}, {});
