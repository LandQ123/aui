<template>
  <div class="af-side-menu">
    <af-menu mode="vertical" :default-active="defaultActive" @select="selectMenu">
			<div v-for="(item, index) in list" :key="index" v-if="groupType">
				<af-submenu :index="item.index" v-if="item.children">
					<template slot="title">
						<span style="width: 100%; display: inline-block;" @mouseover="showAddBtn(item.index)">
							{{item.label}}
						</span>
						<span class="funcBtn_submenu" v-if="addBtnShow === item.index">
							<af-button type="text" size="mini" @click.native.stop="add(item.index)" v-if="item.isAdd">
								<i class="af-icon-plus"></i>
							</af-button>
						</span>
					</template>
					<af-menu-item :index="child.indexItem" v-for="(child, index) in item.children" :key="index">
						<template slot="title">
							<span class="childTitle" v-if="child.label.length <= 9">{{child.label}}</span>
							<af-tooltip v-if="child.label.length > 9" :content="child.label" effect="light" transition="'fasle'">
                <span class="childTitle" >{{child.label}}</span>
              </af-tooltip>
              <span class="funcBtn_item" v-if="defaultActive === child.indexItem">
								<af-button type="text" size="mini" @click.native.stop="edit(child.indexItem)" v-if="child.isEdit ? child.isEdit : false">
									<i class="af-icon-edit"></i>
								</af-button>
								<af-button type="text" size="mini" @click.native.stop="remove(child.indexItem)" v-if="child.isRemove ? child.isRemove : false">
									<i class="af-icon-delete"></i>
								</af-button>
							</span>
						</template>
					</af-menu-item>
				</af-submenu>
				<af-menu-item :index="item.index" v-if="!item.children">
					<template slot="title">
						<span>{{item.label}}</span>
					</template>
				</af-menu-item>
			</div>
      <div v-for="(item, index) in list" :key="index" v-if="!groupType">
        <af-menu-item :index="item.index" style="height: 28px; line-height: 28px;">
					<template slot="title">
						<span>{{item.label}}</span>
					</template>
				</af-menu-item>
      </div>
    </af-menu>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'AfSideMenu',
  componentName: 'AfSideMenu',
  data() {
    return {
      defaultActive: '',
      addBtnShow: ''
    };
  },
  props: {
    list: {
      required: true,
      type: Array
    },
    group: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 设置默认选中菜单
    setDefaultActive() {
      if (this.groupType) {
        if (this.list[0].children) {
          this.defaultActive = this.list[0].children[0].indexItem;
        } else {
          this.defaultActive = this.list[0].index;
        }
      } else {
        this.defaultActive = this.list[0].index;
      }
      this.addBtnShow = this.list[0].index;
    },
    showAddBtn(val) {
      this.addBtnShow = val;
    },
    selectMenu(val) {
      this.defaultActive = val;
      this.$emit('select', val);
    },
    add(val) {
      this.$emit('add', val);
    },
    edit(val) {
      this.$emit('edit', val);
    },
    remove(val) {
      this.$emit('remove', val);
    }
  },
  watch: {
    list(val) {
      if (val[0].children) {
        this.defaultActive = val[0].children[0].indexItem;
      } else {
        this.defaultActive = val[0].index;
      }
      this.addBtnShow = val[0].index;
    }
  },
  computed: {
    groupType() {
      return this.group;
    }
  },
  mounted() {
    this.setDefaultActive();
  }
};
</script>
