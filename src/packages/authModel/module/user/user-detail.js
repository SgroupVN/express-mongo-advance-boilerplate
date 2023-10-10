export class UserDetail {
  payload;

  roles;

  permissions;

  constructor(payload) {
      this.payload = payload;
      this.roles = payload?.roles ?? [];
      this.permissions = payload?.permissions ?? [];
  }
}
