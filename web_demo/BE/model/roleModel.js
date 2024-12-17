class Role {
  constructor({ roleName, pass = null }) {
    this.roleName = roleName;
    this.pass = pass;
  }
}

module.exports = Role;
