<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Main from '@/components/Main.vue';

@Component({
    components: {
        Main
    }
})
export default class App extends Vue {

}

</script>


<style scoped lang="scss">


</style>
