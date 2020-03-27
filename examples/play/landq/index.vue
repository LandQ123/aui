<template>
	<div style="margin: 20px;">
		<div class="container">
			<form-panel
				:select-options="selectOptions"
				:multiple="multiple"
				:data-list="dataList"
				:split-str="splitStr"
			></form-panel>
		</div>
	</div>
</template>
<script>
import formPanel from "./form-panel";
export default {
	components: {
		formPanel
	},
	data() {
		return {
			label: "名称1：",
			addName: "添加",
			splitStr: " ",
			containerH: "100px",
			multiple: true,
			aliasKey: "value", // 下拉选框键
			selectOptions: [
				{
					value: "1",
					label: "a"
				},
				{
					value: "2",
					label: "b"
				},
				{
					value: "3",
					label: "c"
				}
			],
			dataList: [
				{
					selectLabel: "one",
					selectVal: "1",
					inpValue: "懒得"
				}
			]
		};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.container {
	width: 420px;
}
</style>
