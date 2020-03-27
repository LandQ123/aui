<template>
	<div class="af-form__panel">
		<div class="af-form__panel-input flex aligin-center">
			<div class="af-form__panel_select_wrapper mr-10">
				<af-select
					:multiple="multiple"
					:collapse-tags="multiple"
					class="af-form__panel_select"
					v-model="selectValue"
					placeholder="请选择"
					clearable
				>
					<af-option
						v-for="item in selectOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></af-option>
				</af-select>
			</div>
			<div class="af-form__panel_inp_wrapper mr-10 flex aligin-center">
				<af-input v-model="inputValue" clearable>
					<template slot="prepend">{{label}}</template>
				</af-input>
			</div>
			<af-button :disabled="!disabledAdd" size="icon" @click.stop="addItem">
				<span v-if="addName">{{addName}}</span>
				<i v-else class="af-icon-plus"></i>
			</af-button>
			<span class="af-form__panel_clear" @click.stop="clearAll">清空</span>
		</div>
		<div class="af-form__panel_container" :style="{'height': containerH}" v-if="dataList.length">
			<af-scrollbar>
				<div class="af-form__panel-item-wrapper flex">
					<span v-for="(item, index) in useDataList" :key="index" class="af-form__panel-valitem mr-10">
						<span>{{item.selectLabel}}{{splitStr}}{{item.inpValue}}</span>
						<i class="af-icon-close" @click.stop="deleteItem(index)"></i>
					</span>
				</div>
			</af-scrollbar>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		selectOptions: {
			type: Array,
			default() {
				return [];
			}
		},
		aliasKey: {
			type: String,
			default: "value"
		},
		label: {
			type: String,
			default: "名称："
		},
		addName: {
			type: String,
			default: ""
		},
		multiple: {
			type: Boolean,
			default: false
		},
		splitStr: {
			// 分隔符号，默认空格
			type: String,
			default: " "
		},
		containerH: {
			type: [String],
			default: "81px"
		},
		dataList: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			selectValue: "",
			inputValue: "",
			useDataList: []
		};
	},
	computed: {
		disabledAdd() {
			return !!(this.selectValue && this.inputValue);
		}
	},
	watch: {
		dataList: {
			immediate: true,
			handler(val) {
				this.useDataList = val;
			}
		}
	},
	methods: {
		addItem() {
			// console.log(this.selectValue);
			let label = "";
			this.selectOptions.forEach(item => {
				if (this.multiple) {
					this.selectValue.forEach(o => {
						if (item.value === o) {
							label += item.label + ",";
						}
					});
				} else {
					if (item.value === this.selectValue) {
						label = item.label;
					}
				}
			});
			let item = {
				selectLabel: label,
				selectVal: this.selectValue,
				inpValue: this.inputValue
			};
			this.useDataList.push(item);
		},
		deleteItem(index) {
			this.useDataList.splice(index, 1);
		},
		clearAll() {
			this.useDataList = [];
		},
		// 外部调用方法
		getValue() {
			return this.useDataList;
		},
		getKeyValue() {
			let keyVal = [];
			this.useDataList.forEach(item => {
				keyVal.push(item[aliasKey]);
			});
			return keyVal;
		}
	}
};
</script>

<style lang="scss" scoped>
.af-form__panel {
	.flex {
		display: flex;
	}
	.aligin-center {
		align-items: center;
	}
	.mr-10 {
		margin-right: 10px;
	}
	.af-form__panel-input {
		/deep/ .af-input__inner {
			height: 22px;
			line-height: 22px;
		}
		.af-form__panel_select {
			width: 160px;
		}
		.af-form__panel_clear {
			font-size: 10px;
			padding: 4px 6px;
			border-radius: 4px;
			color: #4183d7;
			background: #d1f0ff;
			white-space: nowrap;
			margin-left: 10px;
			cursor: pointer;
		}
	}
	.af-form__panel_container {
		background: #f8f8f8;
		margin-top: 5px;
		padding: 5px;
		padding-right: 0;
		padding-bottom: 0;
		overflow: hidden;
		/deep/ .af-scrollbar {
			height: 100%;
			.af-scrollbar__wrap {
				overflow: auto;
			}
			.af-scrollbar__view {
				height: 100%;
			}
		}
		.af-form__panel-item-wrapper {
			flex-wrap: wrap;
			align-content: flex-start;
		}
		.af-form__panel-valitem {
			position: relative;
			padding: 0 8px;
			height: 22px;
			line-height: 22px;
			background: #d1f0ff;
			font-size: 12px;
			border-radius: 2px;
			white-space: nowrap;
			margin-bottom: 5px;
			.af-icon-close {
				color: #8a93a9;
				font-size: 10px;
				margin-left: 2px;
				cursor: pointer;
			}
		}
	}
}
</style>
