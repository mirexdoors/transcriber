<template>
  <div>
    <t-app @update:error="error = $event" />
    <t-error
        v-if="error"
        :error="error"
        @close="resetError"
    />
  </div>

</template>

<script>
import TApp from "../components/TApp";
import TError from "../components/TError";

export default {
  name: 'Home',
  components: {
    TApp,
    TError,
  },
  data: () => ({
    error: '',
  }),

  methods: {
    resetError() {
      this.error = '';
    },
  }
}
</script>
