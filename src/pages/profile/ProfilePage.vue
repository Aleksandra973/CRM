<template>
  <div class="profile page">
    <h1>{{msg}}
      </h1><br><br>
      <div class="row">
        <div class="col-md-4">
          <img :src="$currentUser.image" style="max-width: 100%">
        </div>
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-3">
              <span class="label">Id:</span> 
            </div>
            <div class="col-md-9">
              {{$currentUser.id}}
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <span class="label">Role:</span> 
            </div>
            <div class="col-md-9">
              {{$currentUser.role}}
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <span class="label">Email:</span> 
            </div>
            <div class="col-md-9">
              {{$currentUser.email}}
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <span class="label">Age:</span> 
            </div>
            <div class="col-md-9">
              {{$currentUser.age}}
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <span class="label">Sex:</span> 
            </div>
            <div class="col-md-9">
              {{$currentUser.sex}}
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <span class="label">Date of birth:</span> 
            </div>
            <div class="col-md-9">
              {{moment($currentUser.dateOfBirth).format("DD.MM.YYYY")}}
            </div>
          </div>
        </div>
      </div>
    <transition>
      <router-view v-if="$currentUser.id"></router-view>
    </transition>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'ProfilePage',
  data () {
    return {
      msg: 'Welcome to profile!!!'
    }
  }, 
  methods: {
    moment: function () {
     return moment();
    }
  }
}
</script>

<style lang="scss" scoped>
  .label {
    font-weight: bold;
  }
</style>