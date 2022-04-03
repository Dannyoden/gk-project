<template>
  <div class="boxwrapper">
    <div class="box">
      <div class="container has-text-centered">
        <h6 class="subtitle is-6">{{text}}</h6>
        <span class="icon is-large"><i :class="icon"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaceHolder",
  props: {
    text: {
      type: String,
      icon: ''
    },
    icon: {
      type: String,
      icon: ''
    }
  }
}
</script>

<style scoped lang="scss">

.box {
  margin: auto;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
  height: 300px;
  max-width: 500px;
  background: #222222;
}

.boxwrapper {
  margin-top: 30px;
}

.fa-arrow-down:before {
  font-size: 3em;
  color: #40cabc;
}

.subtitle.is-6 {
  font-size: 1rem;
  margin-top: 50px;
  color: #a7a4a4;
}

@media (max-width: 769px) {
  .box {
    margin-right: 20px;
    margin-left: 20px;
  }
}

</style>
