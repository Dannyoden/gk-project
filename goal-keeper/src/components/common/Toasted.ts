import Vue from 'vue';
import Toasted, {ToastOptions} from 'vue-toasted';

Vue.use(Toasted);

const BASE_OPTIONS: ToastOptions = {
    theme: 'bubble',
    position: 'top-center',
    iconPack: 'fontawesome',
    icon: {
        name: 'fa-check-circle',
        after: true
    }
}

Vue.toasted.register('playerUpdatedToast', playerName => playerName.message + ' details are updated', {
    ...BASE_OPTIONS,
    duration: 3000,
})

Vue.toasted.register('playerAddedToast', playerName => playerName.message + ' is added to your team', {
    ...BASE_OPTIONS,
    duration: 3000,
})

Vue.toasted.register('teamCreatedToast', teamName => teamName.message + ' is created as your team', {
    ...BASE_OPTIONS,
    duration: 3000,
})

Vue.toasted.register('teamUpdatedToast', teamName => teamName.message + ' details are updated', {
    ...BASE_OPTIONS,
    duration: 3000,
})

Vue.toasted.register('selectSessionTeamPlayers', sessionTeam => 'Select ' + sessionTeam.message, {
    ...BASE_OPTIONS,
    duration: 3000,
    singleton: true
})

Vue.toasted.register('sessionCreatedToast', sessionName => sessionName.message + ' is added to the session overview', {
    ...BASE_OPTIONS,
    duration: 5000
})