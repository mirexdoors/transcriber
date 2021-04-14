<template>
	<div>
		<v-select
			v-for="select in selectParams"
			:key="select.id"
			v-model="select.init"
			:items="select.values"
			item-text="value"
			item-value="value"
			:label="select.label"
			:disabled="select.isDisabled"
			item-disabled="isDisabled"
			outlined
			dense
      class="pr-4"
      @change="emitParameter(select.name, $event)"
		/>

		<v-divider/>

		<div
			v-for="checkboxGroup in checkboxParams"
			:key="checkboxGroup.id"
		>
			<span class="caption">{{ checkboxGroup.label }}</span>
      <div class="d-flex  justify-space-between">

        <v-checkbox
            v-for="item in checkboxGroup.values"
            multiple
            dense
            ripple
            color="green darken-4"
            :key="item.name"
            :value="item.value"
            :label="item.label"
            class="pr-4"
            @change="emitParameter(item.name, $event)"
        />
      </div>

			<v-divider/>
		</div>

		<v-switch
			v-for="switchItem in switchParams"
			:key="switchItem.id"
			dense
			color="green darken-4"
			inset
      :disabled="switchItem.isDisabled"
			v-model="switchItem.init"
			class="caption"
      @change="emitParameter(switchItem.name, $event)"
		>
			<template v-slot:label>
				<span class="caption">{{ switchItem.label }}</span>
			</template>
		</v-switch>


		<div class="caption MB-2">Текстовые домены:</div>

		<v-switch
			v-for="switchItem in textDomains"
			:key="switchItem.id"
			dense
			:readonly="switchItem.isReadonly"
			:disabled="switchItem.isDisabled"
			color="green darken-4"
			inset
			v-model="switchItem.init"
			class="caption"
		>
			<template v-slot:label>
				<span class="caption">{{ switchItem.label }}</span>
			</template>
		</v-switch>
	</div>
</template>

<script>
  import {OPTION_TYPES} from "../parameters";

  export default {
    name: "TParameters",

    props: {
      options: {
        type: Array,
        default: () => [],
      }
    },

    computed: {
      selectParams() {
        return this.options.filter(option => option.type === OPTION_TYPES.SELECT);
      },

      switchParams() {
        return this.options.filter(option => option.type === OPTION_TYPES.SWITCH && option.group !== 'domains');
      },

      checkboxParams() {
        return this.options.filter(option => option.type === OPTION_TYPES.CHECKBOX);
      },

      textDomains() {
        return this.options.filter(option => option.type === OPTION_TYPES.SWITCH && option.group === 'domains');
      }
    },

    methods: {
      emitParameter(name, val) {
        this.$emit('change', {name, val});
      }
    },

  }
</script>
