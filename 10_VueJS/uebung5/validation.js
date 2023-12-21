Vue.createApp({
    data() {
        return {
            weight: '',
            touched: false,
            errorMessage: ''
        }
    },
    methods: {
        touchField() {
            this.touched = true;
        },
        validateWeight() {
            if (this.weight === '') {
                this.errorMessage = '';
            } else if (!isNaN(this.weight) && this.weight > 0) {
                this.errorMessage = '';
            } else {
                this.errorMessage = 'Invalid weight! Must be a number greater than 0.';
            }
        }
    }
}).mount('#main');