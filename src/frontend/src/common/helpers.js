import resources from "@/common/enums/resources";
import {
  AuthApiService,
  ReadOnlyApiService,
  CrudApiService,
} from "@/services/api.service";
import { SET_ENTITY } from "@/store/mutations-types.js";

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH, notifier),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES, notifier),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES, notifier),
    [resources.INGREDIENTS]: new ReadOnlyApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    [resources.ADDRESSES]: new ReadOnlyApiService(
      resources.ADDRESSES,
      notifier
    ),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.ORDERS]: new ReadOnlyApiService(resources.ORDERS, notifier),
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "isAuthenticated",
    value: true,
  });
};
