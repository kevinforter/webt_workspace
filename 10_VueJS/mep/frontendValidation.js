document.addEventListener('DOMContentLoaded', (event) => {
    Vue.createApp({
        data() {
            return {
                weight: '',
                soleLength: '',
                age: '',
                ability: '',
                touched: false,
                errorWeight: '',
                errorSoleLength: '',
                errorAge: '',
                errorAbility: ''
            }
        },
        methods: {
            onSubmit(event) {
                event.preventDefault()
                console.log(event)
            },
            touchField() {
                this.touched = true;
            },
            validateWeight() {
                if (this.weight === '') {
                    this.errorWeight = '';
                } else if (!isNaN(this.weight) && this.weight > 0) {
                    this.errorWeight = '';
                } else {
                    this.errorWeight = 'Invalid weight! Must be a number greater than 0.';
                }
            },
            validateSoleLength() {
                if (this.soleLength === '') {
                    this.errorSoleLength = '';
                } else if (!isNaN(this.soleLength) && this.soleLength > 0) {
                    this.errorSoleLength = '';
                } else {
                    this.errorSoleLength = 'Invalid sole length! Must be a number greater than 0.';
                }
            },
            validateAge() {
                if (this.age === '') {
                    this.errorAge = '';
                } else if (!isNaN(this.age) && this.age > 0) {
                    this.errorAge = '';
                } else {
                    this.errorAge = 'Invalid age! Must be a number greater than 0.';
                }
            },
            validateAbility() {
                if (this.ability != null) {
                    this.errorAbility = '';
                } else {
                    this.errorAbility = 'Ability must be selected!';
                }
            },
        }
    }).mount('#main');
});