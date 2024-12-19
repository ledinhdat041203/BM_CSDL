class Profile {
  constructor({
    profileName,
    sessionPerUser = "UNLIMITED",
    connectTime = "UNLIMITED",
    idleTime = "UNLIMITED",
    passLife = "100",
    failLogin = "10",
  }) {
    this.profileName = profileName;
    this.sessionPerUser = sessionPerUser;
    this.connectTime = connectTime;
    this.idleTime = idleTime;
    this.passLife = passLife;
    this.failLogin = failLogin;
  }
}

export default Profile;
