const nombretoken = "fswToken";
export function guardartoken(token) {
  localStorage.setItem(nombretoken, token);
}

export function Logout() {
  localStorage.removeItem(nombretoken);
}
