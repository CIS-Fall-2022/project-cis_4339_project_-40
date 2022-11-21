<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <li>
              <router-link to="/">
                <span style="position: relative; top: 6px" class="material-icons">dashboard</span>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link to="/intakeform">
                <span style="position: relative; top: 6px" class="material-icons">people</span>
                Client Intake Form
              </router-link>
            </li>
            <li>
              <router-link to="/eventform">
                <span style="position: relative; top: 6px" class="material-icons">event</span>
                Create Event
              </router-link>
            </li>
            <li>
              <router-link to="/findclient">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Client
              </router-link>
            </li>
            <li>
              <router-link to="/findEvents">
                <span style="position: relative; top: 6px" class="material-icons">search</span>
                Find Event
              </router-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style=" background: linear-gradient(250deg, #C8102E 70%, #efecec 50.6%); "
      >
        <h1 v-for="data in allData" v-bind:key="data.id" class="mr-20 text-3xl text-white">Organization : {{ data.orgName }}</h1> 
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<script>

import axios from "axios";
export default {
  name: "App",
  data(){//Creates array for where the JSON pulled from the API will be stored to later be called on
    return {
        allData:[]
    }
  },methods: {
      async fetchData(){ //fetch method to pull data from the API using Axios
        try {
          this.error = null;
          this.othererror = true;
          const url = 'http://localhost:3000/organizationData/orgName'; // api call to get the name of organization 
          const response = await axios.get(url);
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

<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}

.table1 { 
  font-family: 'Times New Roman', Times, serif;
  color: black;
  width: 100%;
  background-color: lightcoral;
  text-align: left;
  border: 2px solid rgb(10, 10, 10)
}
</style>
