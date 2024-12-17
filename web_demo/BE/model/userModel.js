class User {
  constructor({
    username,
    password = "ledinhdat",
    defaultTablespace = "USERS",
    tempTablespace = "TEMP",
    quota = "50M",
    accountStatus = "UNLOCK",
    profile = "DEFAULT",
    role = null,
  }) {
    this.username = username;
    this.password = password;
    this.defaultTablespace = defaultTablespace;
    this.tempTablespace = tempTablespace;
    this.quota = quota;
    this.accountStatus = accountStatus;
    this.profile = profile;
    this.role = role;
  }
}

module.exports = User;
