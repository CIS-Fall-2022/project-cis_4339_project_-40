<template>
  <div>
    <AttendingBar v-if="!othererror && !error"  :label="mychartlabels" :chart-data="mychartData"></AttendingBar>
  </div>
<!-- this is the table for the data from the database that coincides with the bar graph-->
  <div>
    <table class="table1">
      <thead>

        <tr> <!--This is the columns for the data to be placed into-->
          <th scope="col" style="text-align: left; width: 10rem;"> Event Name </th>
          <th scope="col" style="text-align: left; width: 10rem;"> Number of Attendees </th>

        </tr>
      </thead>
      <tbody> <!-- Running a FOR loop place all data within the table being called form the backend-->
        <tr v-for="data in allData" v-bind:key="data.id">
          <td style="text-align: left; width: 10rem;"> {{ data.eventName }}</td>
          <td style="text-align: left; width: 10rem;"> {{ data.attendees.length }}</td>
        </tr>

      </tbody>
    </table>
  </div>
</template>
<script>
//import the necessary modules and components from various modules
  import AttendingBar from './barChart.vue';
  import axios from "axios";
  export default {
    components:{
      AttendingBar,
    },
    data(){ //Creates arrays for where the JSON pulled from the API will be stored to later be called on
      return {
        allData:[],
        mychartlabels: [],
        mychartData: [],
        attendeesID: [],
        myeventname: [],
        othererror: false,
        error: null,
      }
    },
    methods: {
      async fetchData(){ //fetch method to pull data from the API using Axios
        try {
          this.error = null;
          this.othererror = true;
          const url = 'http://localhost:3000/eventData/recentevents';
          const response = await axios.get(url);
          //Taking all the data from API call and placing them into different variables for the graph/table
          this.mychartlabels = response.data.map((item) => item.eventName);
          this.mychartData = response.data.map((item) => item.attendees.length);
          this.attendeesID = response.data.map((item) => item.attendees);
          this.myeventname = response.data.map((item) => item.eventName);
          this.allData = response.data;
        } catch (err) { //error statements for different errors that can occur either in the backend or applicaiton itself
          if (err.response) {
            this.error = {
              title: "Server Response",
              message: err.message,
            };
          } else if (err.resquest) {
            this.error = {
              title: "Unable to Reach Server",
              message: err.message,
            };
          } else {
            this.error = {
              title: "Application Error",
              message: err.message,
            };
          }
        }
        this.othererror = false;
      },
    },
    mounted() {
      this.fetchData();
    },
  };
</script>


