import * as Realm from "realm-web";

const app = new Realm.App({ id: "application-0-optto" });
const ObjectId = Realm.BSON.ObjectId;

const config = {
  DB_NAME: "hackathon"
}

class API {
  async userRegister(email, password) {
    const user = await app.emailPasswordAuth.registerUser({email, password}).catch(e => console.log(e));
    return user;
  }

  async userLogin(email, password) {
    const credentials = Realm.Credentials.emailPassword(email, password);

    const user = await app.logIn(credentials);
    console.log(`Logged in with id: ${user.id}`);
  }

  userIsLoggedIn() {
    const user = this.getUserProfile();
    return user && user.isLoggedIn;
  }

  getUserProfile() {
    const user = app.currentUser;
    return user;
  }

  getUserEmail() {
    const user = this.getUserProfile();
    return user.profile.email;
  }

  getUserId() {
    return app.currentUser.id;
  }

  userLogout() {
    app.currentUser.logOut();
  }

  async getCollection(collectionName) {
    let user = this.getUserProfile();
    let mongodb = user.mongoClient("mongodb-atlas");
    let collection = await mongodb.db(config.DB_NAME).collection(collectionName);
    return collection;
  }

  async getCategories() {
    let projectsCollection = await this.getCollection("projects");
    let categories = await projectsCollection.aggregate([
      {
        '$group': {
          '_id': '$category', 
          'items': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          '_id': 1
        }
      }
    ]);
    return categories.map(i => i._id);
  }

  async getScorecards(category) {
    let scorecardsCollection = await this.getCollection("scorecards");
    let scorecards = await scorecardsCollection.find({category});
    scorecards = scorecards.sort((a, b) => a.position > b.position ? 1 : -1);
    return scorecards;
  }

  async getScorecard(_id) {
    let scorecardsCollection = await this.getCollection("scorecards");
    let scorecard = await scorecardsCollection.find({_id: ObjectId(_id)});
    return scorecard[0];
  }

  async generateScorecards(category) {
    let user = await this.getUserProfile();
    let result = await user.functions.generateCards(category, user.id);
    console.log(result);
    return result;
  }

  async updateScorecardPositions(scorecards) {
    let promises = [];
    const scorecardsCollection = await this.getCollection("scorecards");
    scorecards.map(s => promises.push(scorecardsCollection.updateOne({_id: s._id}, {$set: {position: s.position}})));
    let results = await Promise.all(promises);
    return results;
  }

  async saveScores(id, scores) {
    const scorecardsCollection = await this.getCollection("scorecards");
    let result = await scorecardsCollection.updateOne({_id: id}, { $set: {scores}});
    return result;
  }
}

const api = new API();

export default api;