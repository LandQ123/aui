<template>
	<div style="margin: 20px;">
		<div class="container">
			<form-panel
				ref="formPanel"
				v-model="dataVal"
				remote
				filterable
				:loading='loading'
				:remote-method='remoteMethod'
				:select-options="selectOptions"
				@add-data='addData'
				@delete-data='deleteData'
			>
				<span slot="inputLabel">姓名：</span>
			</form-panel>
			<p>{{ dataVal }}</p>
			<af-button @click="test">test</af-button>
		</div>
	</div>
</template>
<script>
import formPanel from './form-panel';
export default {
	components: {
		formPanel
	},
	data() {
		return {
			label: '姓名：',
			placeholder: '请选择',
			loading: false,
			selectLable: '',
			dataVal: [
				{
					selectKeys: '1', // 必须这个键名
					inpValue: '哈哈哈' // 必须这个键名
				},
				{
					selectKeys: '2', // 必须这个键名
					inpValue: 'test' // 必须这个键名
				}
			],
			addName: '添加',
			splitStr: '',
			containerHeight: 100,
			multiple: true,
			aliasKey: 'value', // 下拉选框键的别名
			aliasLabel: 'label', // 下拉选框值的别名
			selectOptions: [
				{
					value: '1',
					label:'实水电费'
				},
				{
					value: '2',
					label: 'b',
					disabled: true
				},
				{
					value: '3',
					label: 'c'
				}
			],
			selectOptionsGroup: [
				{
					label: '第一组',
					options: [
						{
							value: '1',
							label: '实施大幅'
						},
						{
							value: '2',
							label: 'c'
						}
					]
				},
				{
					label: '第二组',
					options: [
						{
							value: '4',
							label: 'bbb'
						},
						{
							value: '5',
							label: 'ccc'
						}
					]
				}
			]
		};
	},
	methods: {
		test() {
			this.$refs.formPanel.inputFocus()
		},
		remoteMethod(query) {
			this.loading = true
			console.log(query)
		},
		querySearch(queryString,cb) {
			const data = [{
				key: '北京'
			}]
			cb(data)
		},
		focus(e){
			console.log(e)
		},
		autocompleteSelect(val){
			console.log(val)
		},
		selectChange(val){
			console.log(val)
		},
		addData(item) {
			// console.log(item)
		},
		deleteData(item) {
			console.log(item)
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	width: 500px;
}
</style>
