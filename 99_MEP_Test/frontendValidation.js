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
        computed: {
            isButtonDisabled() {
                return this.errorWeight || this.errorAge || this.errorSoleLength || this.errorAbility || this.weight == '' || this.soleLength == '' || this.age == '' || this.ability == '';
            }
        },
        methods: {
            touchField() {
                this.touched = true;
            },
            validateNumber(value, errorField, errorMessage) {
                if (value === '') {
                    this[errorField] = '';
                } else if (!isNaN(value) && value > 0) {
                    this[errorField] = '';
                } else {
                    this[errorField] = errorMessage;
                }
            },
            validateWeight() {
                this.validateNumber(this.weight, 'errorWeight', 'Invalid weight! Must be a number greater than 0.');
            },
            validateSoleLength() {
                this.validateNumber(this.soleLength, 'errorSoleLength', 'Invalid sole length! Must be a number greater than 0.');
            },
            validateAge() {
                this.validateNumber(this.age, 'errorAge', 'Invalid age! Must be a number greater than 0.');
            },
            validateAbility() {
                if (this.ability != null) {
                    this.errorAbility = '';
                } else {
                    this.errorAbility = 'Ability must be selected!';
                }
            },
        },
        mounted() {
            this.validateWeight();
            this.validateSoleLength();
            this.validateAge();
            this.validateAbility();
        }
    }).mount('#main');
});