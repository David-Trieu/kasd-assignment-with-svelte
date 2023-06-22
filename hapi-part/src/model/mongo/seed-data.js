export const seedData = {
  users: {
    _model: "User",
    BigT: {
      userName:"BigT",
      email: "bigt@big.com",
      password: "bigt"
    },
    BigR: {
      userName:"BigR",
      email: "bigr@big.com",
      password: "bigr"
    },
    Admin: {
      userName:"Admin",
      email: "admin@admin.com",
      password: "admin",
      hasAdminRights: true,
    }
  },
  categories:{
    _model: "category",
    cat1:{
      name: "Landscape feature",
      createdBy: "->users.Admin"
    },
    cat2:{
      name: "National monument"
      ,createdBy: "->users.Admin"
    },
    cat3:{
      name: "Walking Trail"
      ,createdBy: "->users.Admin"
    },
    cat4:{
      name: "Bridge"
      ,createdBy: "->users.Admin"
    },
    cat5:{
      name: "Tree"
      ,createdBy: "->users.Admin"
    },
    cat6:{
      name: "Entertainment Venue"
      ,createdBy: "->users.Admin"
    },
    cat7:{
      name: "Island"
      ,createdBy: "->users.Admin"
    },
    cat8:{
      name: "Town"
      ,createdBy: "->users.Admin"
    },
    cat9:{
      name: "City"
      ,createdBy: "->users.Admin"
    },
    cat10:{
      name: "Forest"
      ,createdBy: "->users.Admin"
    },
    cat11:{
      name: "River"
      ,createdBy: "->users.Admin"
    },
    cat12:{
      name: "Archaeological Feature"
      ,createdBy: "->users.Admin"
    },
  },
  pointofinterest:{
    _model:"poi",
    poi1:{
      name: "Null Island",
      location:{
        latitude:"0",
        longitude:"0"
      },
      description:"Null Island is the point on Earth's surface at zero degrees latitude and zero degrees longitude",
      img: "https://res.cloudinary.com/ddroz5jsw/image/upload/v1687438954/70c1f87d95fe5ec661_PIRATA_w1aewr.jpg",
      categoryId: "->categories.cat7",
      categoryName: "->categories.cat7.name",
      createdBy: "->users.Admin",

    }
  }
};
