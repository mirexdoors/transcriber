<template>
  <div id="file-drag-drop">
    <form
        v-show="!file"
        ref="fileForm"
        :style="!file ? 'height: 200px;' : ''"
        :class="isDragover ? 'hover secondary' : ''"
        class="form bordered flex-column align-center justify-center"
    >

      <span class="caption text--secondary">Drop the files (.wav, .mp3, .mov, .mp4) here</span>
      <div class="caption my-2">or</div>
      <v-btn
          elevation="2"
          @click="triggerFileInput()"
      >
        Upload
      </v-btn>

      <v-file-input
          ref="fileInput"
          v-model="file"
          class="d-none"
      >
      </v-file-input>
    </form>

    <div
        v-show="file"
        :style="file ? 'height: 200px;' : ''"
        class="form d-flex  align-center justify-center"
    >
      <div
          class="d-flex flex-column  align-center justify-center"
          style="width: 100%;"
      >
        <v-chip
            v-if="file"
            close
            class="mb-8 "
            @click:close="removeFile()"
        >
					<span class="text-truncate">
						{{ file.name }}
						({{ fileSize }})
					</span>
        </v-chip>

        <v-btn
            v-if="file"
            class="submit-button primary"
            @click="submit()"
        >
          Submit
          <v-icon
              right
              dark
          >
            mdi-cloud-upload
          </v-icon>
        </v-btn>
      </div>
    </div>

    <v-card min-height="300"
            class="d-flex flex-column align-center justify-center pa-4 my-2">
      <div class="caption mb-4">
        Also you can record your audio
      </div>

      <div>
        <VueRecordAudio
            mode="press"
            @result="onAfterRecord"
        />
      </div>

    </v-card>

  </div>
</template>

<script>
const VIDEO_TYPES = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/avi', 'audio/wav'];

const toWav = require('audiobuffer-to-wav');

export default {
  name: 'TFileInput',

  data: () => ({
    dragAndDropCapable: false,
    file: null,
    duration: 0,
    isLoading: false,
    isDragover: false,
  }),

  computed: {
    fileSize() {
      if (this.file) {
        return `${(this.file.size / 1048576).toFixed(2)} MB`
      }
      return null;
    }
  },

  mounted() {
    this.dragAndDropCapable = this.determineDragAndDropCapable();

    if (this.dragAndDropCapable) {
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (evt) {
        this.$refs.fileForm.addEventListener(evt, function (e) {
          e.preventDefault();
          e.stopPropagation();
        }.bind(this), false);
      }.bind(this));

      this.$refs.fileForm.addEventListener('drop', function (e) {
        this.isLoading = true;
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          this.file = e.dataTransfer.files[i];
        }

        this.isLoading = false;
      }.bind(this));


      this.$refs.fileForm.ondragover = () => {
        this.isDragover = true;
      };

      this.$refs.fileForm.ondragleave = () => {
        this.isDragover = false;
      };
    }
  },

  methods: {
    emitPreloader(bool) {
      this.$emit('preloader', bool);
    },

    determineDragAndDropCapable() {
      var div = document.createElement('div');
      return (('draggable' in div)
          || ('ondragstart' in div && 'ondrop' in div))
          && 'FormData' in window
          && 'FileReader' in window;
    },

    onAfterRecord(data) {
      this.file = new File([data], `record.wav`, {type: "audio/wav"});
    },

    triggerFileInput() {
      this.$refs.fileInput.$refs.input.click();
    },

    removeFile() {
      this.file = null;
      this.isDragover = false;
    },

    submit() {
      if (VIDEO_TYPES.includes(this.file.type)) {
        this.emitPreloader(true);
        this.getAudioBuffer(this.file);
      } else if (this.file.type === 'audio/mp3') {
        this.sendFile(this.file);
      }else {
        this.$emit('error', 'Rendering failed: unsupported file type');
      }
    },

    sendFile(file) {
      this.$emit('submit', file);
    },


    getAudioBuffer(file) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const reader = new FileReader();
      let myBuffer;

      const sampleRate = 44000;
      const numberOfChannels = 1;

      reader.onload = () => {
        const videoFileAsBuffer = reader.result; // arraybuffer
        audioContext.decodeAudioData(videoFileAsBuffer).then(decodedAudioData => {

          const duration = decodedAudioData.duration;

          if (duration > 300) {
            this.$emit('error', 'Audio length must be less than 5 minutes');
            this.emitPreloader(false);
          } else {
            const offlineAudioContext = new OfflineAudioContext(numberOfChannels, sampleRate * duration, sampleRate);
            const soundSource = offlineAudioContext.createBufferSource();

            myBuffer = decodedAudioData;
            soundSource.buffer = myBuffer;
            soundSource.connect(offlineAudioContext.destination);
            soundSource.start();

            offlineAudioContext.startRendering().then(renderedBuffer => {
              const wav = toWav(renderedBuffer);
              const wavFile = new File([wav], `${file.name}.wav`, {type: "audio/wav"});
              this.sendFile(wavFile);
            }).catch((err) => {
              this.$emit('error', 'Rendering failed: ' + err);
              this.emitPreloader(false);
            });
          }
        }).catch(e => {
          this.$emit('error', e.message);
          this.emitPreloader(false);
        });
      };

      reader.readAsArrayBuffer(file); // video file
    }
  }
}
</script>

<style scoped>
.form {
  display: flex;
  width: 100%;
  margin: auto;
  border-radius: 4px;
}

.bordered {
  border: 4px dotted #AEAEAE;
}

.hover {
  opacity: 0.8;
}
</style>
