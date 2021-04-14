<template>
  <v-container class="align-center d-flex justify-center fill-height">
    <v-card outlined width="500" class="pa-8">
      <v-form
          ref="form"
          v-model="isValid"
          lazy-validation
      >
        <v-text-field
            v-model="login"
            :rules="loginRules"
            label="Login"
            required
            class="mb-4"
        />

        <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
            class="mb-4"
        />

        <v-btn
            :disabled="!isValid"
            color="green darken-4"
            class="mr-4 accent--text"
            @click="validate"
        >
          Войти
        </v-btn>

      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import {users} from "@/users";

export default {
  name: "TLogin",

  data: () => ({
    isValid: true,
    login: '',
    loginRules: [
      v => !!v || 'Login is required',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
    ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();

      if (this.isValid && this.login && this.password) {
        const user = users.find(user => user.login === this.login && user.password === this.password);

        if (user?.id) {
          sessionStorage.setItem('user_id', user.id);
          this.$emit('login');
        } else {
          this.$emit('update:error', 'Invalid login or password. Please, try again');
        }
      } else {
        this.$emit('update:error', 'Invalid login or password. Please, try again');
      }
    },
  },
}
</script>
