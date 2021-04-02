<template>
	<div id="file-drag-drop">
		<form
			v-if="!file"
			ref="fileForm"
			:class="isDragover ? 'hover secondary' : ''"
			class="form bordered d-flex flex-column align-center justify-center"
		>

			<span class="caption text--secondary">Drop the files here</span>
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
			v-else
			class="form d-flex flex-column  align-center justify-center"
		>
			<v-chip
				close
				class="mb-8"
				@click:close="removeFile()"
			>
				{{ file.name }}
				({{ fileSize }})
			</v-chip>

			<v-btn
				class="submit-button primary"
				v-show="file"
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
			v-if="false"
			:rotate="180"
			:size="100"
			:width="15"
			:value="uploadPercentage"
			color="pink"
		>
			{{ uploadPercentage }}
		</v-progress-circular>
	</div>
</template>

<script>
  export default {
    name: 'TFileInput',

    data: () => ({
      dragAndDropCapable: false,
      file: null,
      uploadPercentage: 0,
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
        }
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
      }
    }
  }
</script>

<style scoped>
	.form {
		display: flex;
		height: 200px;
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
