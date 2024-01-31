export interface AuthResponse {
  ok: boolean;
  user:User;
  access_token: string;
}

export interface User {
  id:     string;
  nombre: string;
  email:  string;
  rol:    null;
}
