import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)
//Vuex刷新页面丢失，vuex-persistedstate 将数据存在sessionStorage或者localStorage里面，解决了这个问题
export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],
  state: {
    salaries: [],
    cities: [],
    jobTitles: [],
    histogramAndLineData: {},
    analysisSalary:[]
  },
  mutations: {
    SET_ALL_CITY(state, val) {
      state.cities = val;
    },
    SET_SALARY(state, val) {
      state.salaries = val;
    },
    SET_JOBTITLE(state, val) {
      state.jobTitles = val;
    },
    SET_HISTOGRAM_AND_LINE_DATA(state, val) {
      state.histogramAndLineData = val;
    },
    SET_ANALYSIS_SALARY(state, val) {
      state.analysisSalary = val;
    }
  },
  getters: {
    getJobTitle: state => {
      return state.jobTitles;
    },
    getAllCity: state => {
      return state.cities;
    },
    getSalary: state => {
      return state.salaries;
    },
    getHistogramAndLineData: state => {
      return state.histogramAndLineData;
    },
    getAnalysisSalary: state => {
      return state.analysisSalary;
    }
  },
  actions: {
  },
  modules: {
  }
})
