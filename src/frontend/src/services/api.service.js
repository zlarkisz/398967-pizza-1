import JwtService from "@/services/jwt.service";
import axios from "@/plugins/axios";

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

export class ReadOnlyApiService extends BaseApiService {
  // resource is a private property of the class. We add it to the base URL to get the final URL to send requests to
  #resource;
  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  // query for a list of entities
  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  // query for a single entity by id
  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

// Inherit from Read-only API service and add post, put, delete operations
export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  // request to create an entity
  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  // request to update an entity
  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  // request to delete an entity
  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

// inherit from BaseApiService, since the class does not imply CRUD operations
export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    // pass the notifier to be used in the parent constructor
    super(notifier);
  }

  // set authorization token
  setAuthHeader() {
    // get token from LocalStorage using JWT service
    const token = JwtService.getToken();
    // add the authorization header to axios as a Bearer token
    axios.default.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    // send username/password for authorization on the server
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    // make logout on the server
    const { data } = axios.delete("logout");
    return data;
  }

  async getMe() {
    // get the profile of a logged in user
    const { data } = axios.get("whoAmI");
    return data;
  }
}
