import { getHeaderAuth, getHeaderAuthJWT } from "../hooks/useIdentity";
import { getUid } from "./Uid";

export const URL = "http://localhost:8089/";

const rebuildURL = (url = "") => {
  if (url.indexOf(":new/") !== -1) return url;
  else return URL + url;
};

export const alaivoGet = async (url = "", options, noAuth = false) => {
  let auth = !noAuth ? getHeaderAuthJWT() : getHeaderAuth();

  return new Promise((resolve, reject) => {
    fetch(rebuildURL(url), {
      method: "GET",
      ...auth,
      ...options,
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => reject(error));
  });
};

export const alaivoDelete = async (url = "", data, options, noAuth = false) => {
  let auth = !noAuth ? getHeaderAuthJWT() : getHeaderAuth();
  return new Promise((resolve, reject) => {
    fetch(rebuildURL(url), {
      method: "DELETE",
      body: data,
      ...auth,
      ...options,
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => reject(error));
  });
};

export const alaivoPut = (url = "", data, options, noAuth = false) => {
  let auth = !noAuth ? getHeaderAuthJWT() : getHeaderAuth();
  return new Promise((resolve, reject) => {
    fetch(rebuildURL(url), {
      method: "PUT",
      body: data,
      ...auth,
      ...options,
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => reject(error));
  });
};

export const alaivoPost = (url = "", data, options, noAuth = false) => {
  let auth = !noAuth ? getHeaderAuthJWT() : getHeaderAuth();

  return new Promise((resolve, reject) => {
    fetch(rebuildURL(url), {
      method: "POST",
      body: data,
      ...auth,
      ...options,
    })
      .then((response) => response.json())
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => reject(error));
  });
};

export const alaivoGetFile = async (url = "", options, noAuth = false, fileName = "file_" + getUid(), extension) => {
  let auth = !noAuth ? getHeaderAuthJWT() : getHeaderAuth();

  return new Promise((resolve, reject) => {
    fetch(rebuildURL(url), {
      method: "GET",
      ...auth,
      ...options,
    })
      .then(async (response) => {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName + "." + extension);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        return true;
      })
      .then(async (responseData) => {
        resolve(responseData);
      })
      .catch((error) => reject(error));
  });
};
