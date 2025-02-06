export interface UserUpdateRequest {
  currentPassword: string;
  username: string | null;
  email: string | null;
  password: string | null;
}
