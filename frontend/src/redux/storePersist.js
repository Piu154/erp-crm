function isJsonString(str) {
  try {
    const parsed = JSON.parse(str);
    return typeof parsed === "object" && parsed !== null;
  } catch (e) {
    return false;
  }
}

export const localStorageHealthCheck = async () => {
  for (let i = localStorage.length - 1; i >= 0; --i) {
    try {
      const key = localStorage.key(i);
      const value = window.localStorage.getItem(key);

      if (!isJsonString(value)) {
        window.localStorage.removeItem(key);
      } else {
        const parsed = JSON.parse(value);
        if (
          parsed &&
          typeof parsed === "object" &&
          Object.keys(parsed).length === 0
        ) {
          window.localStorage.removeItem(key);
        }
      }
    } catch (error) {
      window.localStorage.clear();
      console.error("window.localStorage Exception occurred:", error);
    }
  }
};

export const storePersist = {
  set: (key, state) => {
    window.localStorage.setItem(key, JSON.stringify(state));
  },
  get: (key) => {
    const result = window.localStorage.getItem(key);
    if (!result) {
      return false;
    } else {
      if (!isJsonString(result)) {
        window.localStorage.removeItem(key);
        return false;
      } else return JSON.parse(result);
    }
  },
  remove: (key) => {
    window.localStorage.removeItem(key);
  },
  getAll: () => {
    return window.localStorage;
  },
  clear: () => {
    window.localStorage.clear();
  },
};

export default storePersist;
