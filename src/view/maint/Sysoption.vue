<template>
  <div>
    <b-form>
      <h1>

      </h1>
      <b-form-group horizontal
                    :label-cols="8"
                    label="事务可以晚于宴会离开日期几天"
                    label-for="input_default">
        <b-form-input id="input_default"></b-form-input>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [
          { text: 'Select One', value: null },
          'Carrots', 'Beans', 'Tomatoes', 'Corn'
        ],
        show: true
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault();
        alert(JSON.stringify(this.form));
      },
      onReset (evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.email = '';
        this.form.name = '';
        this.form.food = null;
        this.form.checked = [];
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => { this.show = true });
      }
    }
  }
</script>
