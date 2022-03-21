import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class
 *
 * Supplies methods used to get and post to to the FitFam backend.
 */
class FitFamApi {
  static token;

  static async request(endpoint, data={}, method="get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FitFamApi.token}` };
    const params = method === "get" ? data : {};

    try {
      let resp = (await axios({ url, method, data, params, headers }));
      return resp.data;
    } catch (err) {
      console.log(err);
      let { message } = err.response.data.error;
      message = Array.isArray(message) ? message : [message];
      message = message.map(ele => ele.slice(0,9) === "instance." ? ele.slice(9) : ele)
      throw message;
    }
  }

  /** Register new user. Returns token */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Log in with email and password. Returns token */
  static async login(email, password) {
    let res = await this.request(`auth/login`, {email, password}, "post");
    return res.token;
  }

  /** Edit user profile */
  static async editProfile(userId, data) {
    let res = await this.request(`users/${userId}`, data, "patch");
    return res.user;
  }

  /** Get get user by user id */
  static async getUser(id) {
    let res = await this.request(`users/${id}`);
    return res.user;
  }

  /** Get get family by family id */
  static async getFamily(id) {
    let res = await this.request(`families/${id}`);
    return res.family;
  }  

  /** Find family by join code 
   * Throws error if family not found
   */
  static async findFamily(joinCode) {
    let res = await this.request(`families/`, {joinCode});
    if (!res.families.length) {
      throw ["Invalid join code"]
    } else {
      return res.families[0];
    }
  }

  /** Create a new family with a given family name. Creates a joinCode */
  static async createFamily(familyName) {
    let joinCode;
    let family;

    //Make sure joinCode is unique
    do {
      joinCode = Math.random().toString(36).substr(2, 10).toUpperCase();
      family = await this.request(`families/`, {joinCode});
    } while (family.length);

    let res = await this.request(`families/`, {familyName, joinCode}, "post");
    return res.family;
  }

  /** Edit family profile */
  static async editFamilyProfile(familyId, data) {
    let res = await this.request(`families/${familyId}`, data, "patch");
    return res.family;
  }

  /** Join family */
  static async joinFamily(userId, familyId, primaryFamily=false, isAdmin=false) {
    let res = await this.request(`memberships/`, {userId, familyId, primaryFamily, isAdmin}, "post");
    return res.membership;
  }

  /** Change primary family */
  static async changePrimaryFamily(userId, familyId) {
    const user = await this.getUser(userId);
    const userFamilies = user.families;
    for (let family of userFamilies) {
      if (family.familyId !== familyId) {
        await this.request(`memberships/${userId}-${family.familyId}`, {primaryFamily: false}, "patch");
      }
    }
    let res = await this.request(`memberships/${userId}-${familyId}`, {primaryFamily: true}, "patch");
    return res.membership;
  }

  /** Get featured workouts by date */
  static async getFeaturedWorkouts(date) {
    let res = await this.request("workouts", { featuredDate: date, category: 'featured' });
    return res.workouts;
  }

  /** Get workout by workout id */
  static async getWorkout(id) {
    let res = await this.request(`workouts/${id}`);
    return res.workout;
  }

  /** Search workouts */
  static async searchWorkouts(data) {
    let res = await this.request("workouts", data);
    return res.workouts;
  }

  /** Create new workout */
  static async createWorkout(data) {
    let res = await this.request("workouts", data, "post");
    return res.workout;
  }
  
  /** Get postings by date, familyId */
  static async getPostings(date, familyId) {
    let res = await this.request("postings", { postDate: date, familyId });
    return res.postings;
  }

  /** Get posting by posting id */
  static async getPosting(id) {
    let res = await this.request(`postings/${id}`);
    return res.posting;
  }

  /** Create new posting by workoutId, familyId */
  static async createPosting(workoutId, familyId, postDate, postBy) {
    let res = await this.request("postings", { workoutId, familyId, postDate, postBy }, "post");
    return res.posting;
  }

  /** Get results given postId */
  static async getResults(postId) {
    let res = await this.request("results", {postId});
    return res.results;
  }

  /** Get result by result id */
  static async getResult(id) {
    let res = await this.request(`results/${id}`);
    return res.result;
  }
  
  /** Create new result */
  static async createResult(postId, userId, score, notes) {
    let res = await this.request("results", {postId, userId, score, notes}, "post");
    return res.result;
  }

  /** Edit result */
  static async editResult(resultId, score, notes) {
    let res = await this.request(`results/${resultId}`, {score, notes}, "patch");
    return res.result;
  }

  /** Delete result */
  static async deleteResult(resultId) {
    let res = await this.request(`results/${resultId}`, null, "delete");
    return res.deleted;
  }

  /** Get comment given resultId */
  static async getComments(resultId) {
    let res = await this.request("comments", {resultId});
    return res.comments;
  }

  /** Get comment by comment id */
  static async getComment(id) {
    let res = await this.request(`comments/${id}`);
    return res.comment;
  }
      
  /** Create new comment */
  static async createComment(resultId, userId, content) {
    let res = await this.request("comments", {resultId, userId, content}, "post");
    return res.comment;
  }

  /** Edit comment */
  static async editComment(commentId, content) {
    let res = await this.request(`comments/${commentId}`, {content}, "patch");
    return res.comment;
  }

  /** Delete comment */
  static async deleteComment(commentId) {
    let res = await this.request(`comments/${commentId}`, null, "delete");
    return res.deleted;
  }
}
//user 1 - admin
// FitFamApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NjUzMTc4MX0.KtYFbtbBzjny6ts_N3mqM396EptwNZXYZrAw1-QztBE";
//user 2 - non-admin
// FitFamApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDY1MzE5MzV9.NJyH9JOqaNNbwFftoUnAsE0pm14dr3-RxuzSqD2QISw";
//user 3 - family 2
// FitFamApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDcxMjM4MTh9.St--H6jb6Z-STDMF5fFa6wc3WyiEjexYJ0jVBkc2Y_k"
export default FitFamApi;