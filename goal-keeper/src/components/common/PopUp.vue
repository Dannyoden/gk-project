<template>
    <div class="modal"
         :class="{'is-active' : true}">
        <div class="modal-background" @click="decline"></div>
        <div class="modal-card">
            <header class="modal-card-body">
                <p class="subtitle"> {{ PopUpText }} </p>
            </header>
            <div class="button-details">
                <Button :icon-data="{ icon: 'fas fa-times-circle', position: 'left' }"
                        class-name="button is-centered is-danger is-outlined"
                        :text="declineButtonText"
                        @clicked="decline"></Button>
                <Button :icon-data="{ icon: 'fas fa-check-circle', position: 'right' }"
                        class-name="button is-centered is-primary is-outlined no-background"
                        :text="approveButtonText"
                        @clicked="confirm"></Button>
            </div>
        </div>
        <button class="modal-close is-large"
                aria-label="close"
                @click="decline">
        </button>
    </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import Button from '@/components/common/Button.vue';

@Component({
    components: {Button}
})
export default class PopUp extends Vue {
    @Prop({ type: String, default: '' }) PopUpText!: string;
    @Prop({ type: String, default: 'No'}) textDeclineButton!: string;
    @Prop({ type: String, default: 'Yes'}) textApproveButton!: string;

    get declineButtonText() {
        return this.textDeclineButton;
    }

    get approveButtonText() {
        return this.textApproveButton;
    }

    @Emit('confirm')
    confirm() {
        return true;
    }

    @Emit('decline')
    decline() {
        return true;
    }

}
</script>

<style scoped lang="scss">

.modal-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    max-width: 500px;
    border-radius: 10px;
    background: #2d2d2d;

    .button-details {
        display: flex;
        justify-content: space-around;
        width: 100%;
        margin-bottom: 20px;

    }
}

.modal-card .modal-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: #2d2d2d;
    margin-bottom: 20px;
}

.subtitle {
  color: whitesmoke;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.25;
}

.button-details {
  margin-bottom: 20px;
}

</style>
