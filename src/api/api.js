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

    /** Get today's workouts (supplied by the SugarWod API) */
    static async getTodaysWorkouts() {
      let res = await this.request("workouts", { publishDate: moment().format("YYYY-MM-DD") });
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
    
}
//user 1 - admin
FitFamApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NjUzMTc4MX0.KtYFbtbBzjny6ts_N3mqM396EptwNZXYZrAw1-QztBE";
//user 2 - non-admin
// FitFamApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDY1MzE5MzV9.NJyH9JOqaNNbwFftoUnAsE0pm14dr3-RxuzSqD2QISw";


export default FitFamApi;