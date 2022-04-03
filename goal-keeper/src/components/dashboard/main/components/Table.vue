<template>
  <div class="column">
    <div class="box">
      <div class="table-container">
      <table class="table">
        <tr class="th">
          <th class="header" v-for="header in headers" @click="sortby(header.reference)" :key="header.reference">
            <span class="header">
              <a class="header">{{header.headerValue}}<i class="fas fa-sort"></i></a>
            </span>
          </th>
        </tr>
        <tbody>
        <tr v-if="clubTeamOverview.length === 0">
          <td>No data</td>
        </tr>
        <tr @click="selectRow(value.id)" v-for="value in sortedClubTeamOverview" :key="value.id" :class="{'highlight': (value.id === selectedId)}">
          <td>{{value.shirtNumber}}</td>
          <td>{{value.fullName}}</td>
          <td>{{value.totalSessions}}</td>
          <td>{{value.totalGoals}}</td>
          <td>{{value.position}}</td>
          <td>{{value.winPercentage}}</td>
          <td>{{value.tiePercentage}}</td>
          <td>{{value.lossPercentage}}</td>
        </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script lang="js">

import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import {namespace} from "vuex-class";

const DashboardModule = namespace('DashboardModule');

@Component
export default class Table extends Vue {

  @DashboardModule.Getter('clubTeamOverview')
  playerDataDtos;

  currentSort = 'name';
  currentSortDir = 'asc'
  selectedId = '';
  headers = [ { reference: 'shirtNumber', headerValue: 'Number'},
              { reference: 'fullName', headerValue: 'Name'},
              { reference: 'totalSessions', headerValue: 'Total sessions'},
              { reference: 'totalGoals', headerValue: 'Total goals'},
              { reference: 'position', headerValue: 'Position'},
              { reference: 'winPercentage', headerValue: 'Win'},
              { reference: 'tiePercentage', headerValue: 'Tie'},
              { reference: 'lossPercentage', headerValue: 'Lose'}];

  created() {
  }

  selectRow(id){
    this.selectedId = id;
  }

  sortby(s) {
    console.log('sort by', s);
    // if s == current sort, reverse
    if(s === this.currentSort) {
      this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
    }
    this.currentSort = s;
  }

  get clubTeamOverview() {
    return this.playerDataDtos || [];
  }

  get sortedClubTeamOverview() {
    return this.clubTeamOverview.sort((a,b) => {
      let modifier = 1;
      if(this.currentSortDir === 'desc') modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return modifier;
      return 0;
    });
  }

}
</script>

<style scoped lang="scss">
.table-container {
  margin-top: 30px;
  margin-right: 20px;
}

.fa-sort:before {
  content: "\f0dc";
  margin-left: 2px;
}

a {
  color: #454545 !important;
  cursor: pointer;
  text-decoration: none;
}

.table {
  width: 100%;
  font-size: 0.9em;
  background-color: #292929;
}

.box {
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 20px;
  max-width: 1200px;
  background-color: #292929;
}


@media (max-width: 769px) {
  .box {
    margin-top: 20px;
    margin-right: 0px;
    margin-left: 0px;
    max-width: 1200px;
  }

  .table {
    width: 100%;
    font-size: 0.8em;
    background-color: #292929;
  }
}

.a {
  color: whitesmoke;
}

.header {
  color: #ffffff !important;
  cursor: pointer;
  text-decoration: none;
}

.table td, .table th {
  padding: 0.5em 0.75em;
  vertical-align: top;
  color: whitesmoke;
}

.highlight {
  background-color: turquoise;
}

tbody tr:nth-of-type(even).highlight {
  background-color: turquoise;
}

tbody tr:nth-of-type(even) {
  background-color: #222222;
}

</style>
