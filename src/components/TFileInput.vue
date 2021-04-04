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
				v-if="!isPreload"
				class="d-flex flex-column  align-center justify-center"
				style="width: 100%;"
			>
				<v-chip
					v-if="file"
					close
					class="mb-8"
					@click:close="removeFile()"
				>
					{{ file.name }}
					({{ fileSize }})
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
			<v-progress-circular
				v-else
				:size="100"
				:width="5"
				indeterminate
				color="primary"
			>
				waiting ...
			</v-progress-circular>
		</div>


	</div>
</template>

<script>
  const VIDEO_TYPES = ['video/mp4', 'video/mpeg', 'video/quicktime'];

  const toWav = require('audiobuffer-to-wav');

  export default {
    name: 'TFileInput',

    data: () => ({
      dragAndDropCapable: false,
      file: null,
      duration: 0,
      isPreload: false,
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
      determineDragAndDropCapable() {
        var div = document.createElement('div');
        return (('draggable' in div)
            || ('ondragstart' in div && 'ondrop' in div))
            && 'FormData' in window
            && 'FileReader' in window;
      },

      triggerFileInput() {
        this.$refs.fileInput.$refs.input.click();
      },

      removeFile() {
        this.file = null;
        this.isDragover = false;
      },

      submit() {
        //TODO проверка на видео

        if (VIDEO_TYPES.includes(this.file.type)) {
          this.isPreload = true;
          this.getAudioBuffer(this.file);

        } else if (this.file.type === 'audio/wav') {
          this.sendFile(this.file);
        }
      },

      sendFile(file) {
        console.log(file)
        return 1;
      },

      getAudioBuffer(file) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const reader = new FileReader();
        let myBuffer;


        const sampleRate = 16000;
        const numberOfChannels = 1;

        reader.onload = () => {
          const videoFileAsBuffer = reader.result; // arraybuffer
          audioContext.decodeAudioData(videoFileAsBuffer).then((decodedAudioData) => {

            const duration = decodedAudioData.duration;

            const offlineAudioContext = new OfflineAudioContext(numberOfChannels, sampleRate * duration, sampleRate);
            const soundSource = offlineAudioContext.createBufferSource();

            myBuffer = decodedAudioData;
            soundSource.buffer = myBuffer;
            soundSource.connect(offlineAudioContext.destination);
            soundSource.start();

            offlineAudioContext.startRendering().then((renderedBuffer) => {
              this.isPreload = false;
              const wav = toWav(renderedBuffer);
              const wavFile = new File([wav], `${file.name}.wav`, {type: "audio/wav"} );
              const objectUrl = URL.createObjectURL(wavFile);
              console.log(wavFile)
              window.open(objectUrl);
            }).catch(function (err) {
              console.log('Rendering failed: ' + err);
            });
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
