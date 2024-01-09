const baseURL = `http://localhost:3000`;

const checkResponse = (res: any) => {
  if (res.ok || res.created) {
    return res.json();
  }
  return res.json().then((err: any) => {
    return Promise.reject(err);
  });
};

const headersWithContentType = { "Content-Type": "application/json" };
const headersWithAuthorizeFn = () => ({
  "Content-Type": "application/json",
  authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
});

export const getAllEvents = () => {
  return fetch(`${baseURL}/event/`, {
    method: "GET",
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const getEventById = (id: string) => {
  return fetch(`${baseURL}/event/${id}`, {
    method: "GET",
    headers: headersWithContentType,
  }).then(checkResponse);
};

export const createEvent = (event: any) => {
  return fetch(`${baseURL}/event/`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify(event),
  }).then(checkResponse);
};

export const updateEvent = (event: any) => {
  return fetch(`${baseURL}/event`, {
    method: "PATCH",
    headers: headersWithContentType,
    body: JSON.stringify(event),
  }).then(checkResponse);
};

export const removeEvent = (id: string) => {
  return fetch(`${baseURL}/event/${id}`, {
    method: "DELETE",
    headers: headersWithContentType,
  }).then(checkResponse);
};