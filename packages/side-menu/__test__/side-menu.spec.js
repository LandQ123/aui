import { createVue } from '../../../test/unit/util';

const getList = function() {
  return [
    {
      label: '证券类',
      index: '1',
      isAdd: true,
      children: [
        {
          label: '交易所重点监控账户',
          indexItem: '1-1',
          isEdit: true,
          isRemove: true
        },
        {
          label: '公司重点监控账户',
          indexItem: '1-2',
          isRemove: true
        }
      ]
    },
    {
      label: '账户类监控名单',
      index: '2'
    },
    {
      label: '指数类',
      index: '3',
      isAdd: false,
      children: [
        {
          label: '公司所重点监控指数测试',
          indexItem: '3-1',
          isEdit: true,
          isRemove: true
        },
        {
          label: '交易所重点监控指数',
          indexItem: '3-2',
          isEdit: true
        }
      ]
    }
  ];
};
describe('SideMenu', () => {
  // 普通标签页
  describe('createVue_general', () => {
    const vm = createVue({
      template: `
        <af-side-menu :list="list" style="width: 160px;"></af-side-menu>
      `,
      created() {
        this.list = getList();
      }
    }, true);
    after(() => {
      // destroyVM(vm);
    });
    it('menu-item_click', done => {
      let ele = vm.$el.querySelectorAll('.af-menu-item');
      ele[0].click();
      setTimeout(_ => {
        expect(ele[0].classList.contains('is-active')).to.be.true;
        ele[1].click();
        setTimeout(_ => {
          expect(ele[1].classList.contains('is-active')).to.be.true;
          done();
        }, 20);
      }, 20);
    });
  });
  // 分组标签页
  describe('createVue_group', () => {
    const vm = createVue({
      template: `
        <af-side-menu :isGroup="true" :list="list" style="width: 160px;"></af-side-menu>
      `,
      created() {
        this.list = getList();
      }
    }, true);
    after(() => {
      // destroyVM(vm);
    });
    it('menu-item_click', done => {
      let ele = vm.$el.querySelectorAll('.af-menu-item');
      ele[0].click();
      setTimeout(_ => {
        expect(ele[0].classList.contains('is-active')).to.be.true;
        ele[1].click();
        setTimeout(_ => {
          expect(ele[1].classList.contains('is-active')).to.be.true;
          done();
        }, 20);
      }, 20);
    });
    it('menu-item_open', done => {
      let ele = vm.$el.querySelectorAll('.af-submenu__title');
      let eleParent = vm.$el.querySelectorAll('.af-submenu');
      ele[1].click();
      setTimeout(_ => {
        expect(eleParent[1].classList.contains('is-opened')).to.be.true;
        ele[1].click();
        setTimeout(_ => {
          expect(eleParent[1].classList.contains('is-opened')).to.be.false;
          done();
        }, 20);
      }, 20);
    });
  });
});
