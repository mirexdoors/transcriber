<template>
  <div id="file-drag-drop">
    <form
        v-if="files.length === 0"
        ref="fileForm"
        :style="files.length === 0 ? 'height: 200px;' : ''"
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
          multiple
          v-model="files"
          class="d-none"
      >
      </v-file-input>
    </form>

    <div
        v-show="files.length > 0"
        :style="files.length > 0 ? 'height: 200px;' : ''"
        class="form d-flex  align-center justify-center"

    >
      <div
          class="d-flex flex-column  align-center justify-center"
          style="width: 100%;"
      >
        <v-chip
            v-for="file in files"
            :key="file.name"
            close
            class="mb-8 "
            @click:close="removeFile(file)"
        >
					<span class="text-truncate">
						{{ file.name }}
						({{ getFileSize(file) }})
					</span>
        </v-chip>

      </div>
    </div>

    <v-card min-height="200"
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

    <v-card
        min-height="200"
        class="d-flex flex-column justify-center align-center justify-center pa-4"
    >
      <div>
        <div class="caption mb-4">You can download file from remote resourse (only .wav or .mp3):</div>
        <div class="caption mb-4">It's disabled when file upload checked</div>

        <v-text-field
            v-model="fileLink"
            outlined
            dense
            :disabled="files.length > 0"
            label="File link"
        />
      </div>
    </v-card>

    <v-card
        min-height="100"
        class="d-flex flex-column justify-center align-center justify-center pa-4"
    >
      <v-btn
          :disabled="!files.length && !fileLink"
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
    files: [],
    fileLink: '',
    duration: 0,
    isLoading: false,
    isDragover: false,
  }),

  mounted() {
    this.fileLink = this.$route.query.fileUrl ? this.$route.query.fileUrl : '';

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
    getFileSize(file) {
      if (file) {
        return `${(file.size / 1048576).toFixed(2)} MB`
      }
      return null;
    },

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
      this.files = [];
      this.files.push(new File([data], `record.wav`, {type: "audio/wav"}));
    },

    triggerFileInput() {
      this.$refs.fileInput.$refs.input.click();
    },

    removeFile(deletedFile) {
      this.files = this.files.filter(file => file.name !== deletedFile.name);

      if (this.files.length === 0)
        this.isDragover = false;
    },

    async submit() {
      if (this.files.length > 0) {
        const rightFiles = this.files.filter(file => {
          return VIDEO_TYPES.includes(file.type) || file.type === 'audio/mpeg';
        });

        if (rightFiles.length > 0) {
          this.emitPreloader(true);

          for (let file of rightFiles) {
            if (VIDEO_TYPES.includes(file.type)) {
              file = await this.getAudioBuffer(file);
            }
          }


          this.sendFiles({files: rightFiles, fileUrl: ''});
        } else {
          this.$emit('error', 'Rendering failed: unsupported file type');
        }
      } else if (this.fileLink) {
        this.emitPreloader(true);
        this.sendFiles({files: [], fileUrl: this.fileLink});
      }

    },

    sendFiles(files) {
      this.$emit('submit', files);
    },


    async getAudioBuffer(file) {
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

            return offlineAudioContext.startRendering().then(renderedBuffer => {
              const wav = toWav(renderedBuffer);
              const wavFile = new File([wav], `${file.name}.wav`, {type: "audio/wav"});
              return wavFile;
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

      await reader.readAsArrayBuffer(file); // video file
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
