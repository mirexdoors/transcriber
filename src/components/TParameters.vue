<template>
	<div>

		<div class="caption mb-2">Parameters:</div>

		<v-select
			:items="[15,30,60, 120]"
			:value="15"
			label="Timing (sec)"
			outlined
		/>

		<v-switch
			color="green darken-4"
			inset
			v-model="switchValue"
			label="Включить расстановку пунктуации"
		/>
		<v-switch
			color="green darken-4"
			inset
			v-model="switchValue1"
			label="Разделение по спикерам"
		/>
		<v-switch
			color="green darken-4"
			inset
			label="Включить расстановку тэгов"
		/>
		<v-switch
			color="green darken-4"
			inset
			label="Определить эмоции"
		/>
		<v-switch
			color="green darken-4"
			inset
			disabled
			label="Выделить ключевые места"
		/>
		<v-switch
			color="green darken-4"
			inset
			disabled
			label="Убрать ненормативную лексику"
		/>
		<v-switch
			color="green darken-4"
			inset
			disabled
			label="Убрать слова-паразиты"
		/>

		<div class="caption MB-2">Text domains</div>
		<v-switch
			color="green darken-4"
			inset
			v-model="switchValue2"
			disabled
			label="Пользовательский"
		/>
		<v-switch
			color="green darken-4"
			inset
			disabled
			label="Телекомуникационный"
		/>
		<v-switch
			color="green darken-4"
			inset
			disabled
			label="Военный"
		/>
		<v-switch
			color="green darken-4"
			inset
			dense
			disabled
			label="Юридический"
		/>
		<v-switch
			color="green darken-4"
			inset
			dense
			disabled
			label="Нефтегаовый"
		/>
	</div>
</template>

<script>
  export default {
    name: "TParameters",
    data() {
      return {
        switchValue: true,
        switchValue1: true,
        switchValue2: true,
      }
    }
  }
</script>

<style scoped>

</style>
