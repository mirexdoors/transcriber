<template>
  <div>
    <v-chip>
      {{ formattedTimer }}
    </v-chip>
  </div>
</template>

<script>

let _timer;

export default {
  name: "TRecordTimer",

  props: {
    isActive: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  data() {
    return {
      seconds: 0,
    }
  },

  watch: {
    isActive(oldVal, newVal) {
      if (oldVal && !newVal) {
        this.seconds = 0;
        _timer = setInterval(() => {
          this.seconds++;
        }, 1000)
      } else {
        clearInterval(_timer);
      }
    }
  },

  computed: {
    formattedTimer() {
      if (this.seconds < 1) {
        return '00:00';
      }
      return this.formatTime(this.seconds);
    },
  },

  methods: {
    formatTime(secs) {
      const secNum = parseInt(secs, 10);
      const hours = Math.floor(secNum / 3600);
      const minutes = Math.floor(secNum / 60) % 60;
      const seconds = secNum % 60;

      return [hours, minutes, seconds]
          .map(v => v < 10 ? "0" + v : v)
          .filter((v, i) => v !== "00" || i > 0)
          .join(":");
    }
  }
}
</script>
