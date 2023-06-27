export const seedData = {
  users: {
    _model: "User",
    George: {
      userName:"George",
      email: "George@george.com",
      password: "g"
    },
    Mona: {
      userName:"Mona",
      email: "Mona@mona.com",
      password: "m"
    },
    Admin: {
      userName:"Admin",
      email: "admin@admin.com",
      password: "admin",
      hasAdminRights: true,
    },
    David: {
      userName:"David",
      email:"d@d.com",
      password: "d",
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
      categoryId: "->categories.cat7",
      categoryName: "->categories.cat7.name",
      createdBy: "->users.Admin",
    },
    poi2:{
      name: "Regensburg",
      location:{
        latitude:"49.0134",
        longitude:"12.1016"
      },
      description:"Regensburg is a German city located in Bavaria.",
      categoryId: "->categories.cat9",
      categoryName: "->categories.cat9.name",
      createdBy: "->users.David",
    },
    poi3:{
      name: "Eiffel Tower",
      location:{
        latitude:"48.858",
        longitude:"2.2944"
      },
      description:"The Eiffel Tower is a famous monument in Paris.",
      categoryId: "->categories.cat2",
      categoryName: "->categories.cat2.name",
      createdBy: "->users.Mona",
    },


  }
};
