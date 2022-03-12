import axios from 'axios';
import moment from 'moment';

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
      console.error(err);
    }
  }

    /** Get get user by user id */
    static async getUser(id) {
      let res = await this.request(`users/${id}`);
      return res.user;
    }

    /** Get today's workouts (supplied by the SugarWod API) */
    // static async getTodaysWorkouts() {
    //   let res = await this.request("workouts", { featuredDate: moment().format("YYYY-MM-DD"), category: 'featured' });
    //   return res.workouts;
    // }

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
    
    /** Get postings by date, familyId */
    static async getPostings(date, familyId) {
      let res = await this.request("postings", { postDate: date, familyId });
      return res.postings;
    }

    /** Get postings by posting id */
    static async getPosting(id) {
      let res = await this.request(`postings/${id}`);
      return res.posting;
    }

    /** Create new posting by workoutId, familyId */
    static async createPosting(workoutId, familyId, postDate) {
      let res = await this.request("postings", { workoutId, familyId, postDate }, "post");
      return res.posting;
    }

    /** Get results given postId */
    static async getResults(postId) {
      let res = await this.request("results", {postId});
      return res.results;
    }
    
    /** Create new result */
    static async createResult(postId, userId, score=null, notes=null) {
      let res = await this.request("results", {postId, userId, score, notes}, "post");
      return res.result;
    }
}
//user 1 - admin
FitFamApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NjUzMTc4MX0.KtYFbtbBzjny6ts_N3mqM396EptwNZXYZrAw1-QztBE";
//user 2 - non-admin
// FitFamApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDY1MzE5MzV9.NJyH9JOqaNNbwFftoUnAsE0pm14dr3-RxuzSqD2QISw";


export default FitFamApi;