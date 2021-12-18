<template>
  <v-container class="align-center d-flex justify-center fill-height">
    <v-card outlined width="500" class="pa-8">
      <v-form
          ref="form"
          v-model="isValid"
          lazy-validation
          @keyup.native.enter="validate"
      >
        <v-text-field
            v-model="login"
            :rules="loginRules"
            label="Логин"
            required
            class="mb-4"
        />

        <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Пароль"
            type="password"
            required
            class="mb-4"
        />

        <v-btn
            :disabled="!isValid"
            color="green darken-4"
            class="mr-4 accent--text"
            type="submit"
            @click="validate"
        >
          Войти
        </v-btn>

      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { users } from "@/usersHash";
import { sha256 } from "@/helpers";

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
        const user = users.find(async (user) => user.login === this.login && user.hash === await this.hashPassword(this.password));

        if (user?.id) {
          sessionStorage.setItem('user_id', user.id);
          this.$emit('login');
        } else {
          this.$emit('update:error', 'Неверный логин и/или пароль. Пожалуйста, попробуйте еще раз.');
        }
      } else {
        this.$emit('update:error', 'Неверный логин и/или пароль. Пожалуйста, попробуйте еще раз.');
      }
    },
    async hashPassword(str) {
      return await sha256(str);
    }
  },
}
</script>
