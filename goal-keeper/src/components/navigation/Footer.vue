<template>
    <footer class="footer">
        <p>
            <strong>GoalKeeper</strong> by <a href="">GoalKeeper</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">GC inc</a>.
        </p>
    </footer>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {
}
</script>

<style scoped lang="scss">

.footer {
    display: flex;
    align-self: flex-end;
    justify-content: center;
    bottom: 0;
    width: 100%;
    z-index: 0;
    padding: 1em;
    margin-top: auto;
    background-color: #1c1c1c;
}

.footer p {
    font-size: 75%;
    text-align: center;
    color: whitesmoke;
}

strong {
  color: whitesmoke;
  font-weight: 700;
}

</style>
