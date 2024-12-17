class Profile {
  constructor({
    profileName,
    sessionPerUser = "UNLIMITED",
    connectTime = "UNLIMITED",
    idleTime = "UNLIMITED",
  }) {
    this.profileName = profileName;
    this.sessionPerUser = sessionPerUser;
    this.connectTime = connectTime;
    this.idleTime = idleTime;
  }
}

module.exports = Profile;
