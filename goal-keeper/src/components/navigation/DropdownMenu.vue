<template>
    <div class="column" id="left-column">
      <div :class="getClass()">
        <div class="dropdown-trigger">
          <button class="button is-primary is-outlined" @click="changeStatus" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>Options</span>
            <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a href="#" class="dropdown-item is-active">
              Team overview
            </a>
<!--            <a class="dropdown-item">-->
<!--              Most wins-->
<!--            </a>-->
<!--            <a href="#" class="dropdown-item">-->
<!--              Most goals-->
<!--            </a>-->
<!--            <a href="#" class="dropdown-item">-->
<!--              Effective combinations-->
<!--            </a>-->
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class SideMenu extends Vue {

  private showDropdown: boolean = false;

  created() {
    this.showDropdown = false;
  }

  changeStatus() {
    this.showDropdown = !this.showDropdown;
  }

  getClass(): string {
    if (this.showDropdown) {
      return 'dropdown is-pulled-right is-right is-active';
    } else {
      return 'dropdown is-pulled-right is-right';
    }
  }


}
</script>

<style scoped lang="scss">

@media screen and (max-width: 1023px) {
  .dropdown {
    max-width: 150px;
    margin-top: 20px;
    margin-bottom: 20px;
    right: 30px;
    margin-left: 100px;
    background-color: #222222;
  }
}

@media screen and (min-width: 767px) {
  .dropdown {
    max-width: 150px;
    margin-top: 50px;
    margin-bottom: 20px;
    right: 30px;
    margin-left: 100px;
  }
}

.dropdown-content {
  background-color: #222222;
}

a.dropdown-item.is-active, button.dropdown-item.is-active {
  background-color: turquoise;
  color: #fff;
}

#left-column {
  display: block;
  flex-basis: 0;
  flex-grow: 0.2;
  flex-shrink: 1;
  padding: 0.75rem;
}
</style>
