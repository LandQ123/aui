import {createTest, createVue, destroyVM} from '../../../test/unit/util';
import Transfer from 'packages/transfer-tree';

describe('TransferTree', () => {
  let vm;
  const getTestData = () => {
    const data = [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 2,
        label: '二级 1-1',
        children: [{
          id: 3,
          label: '三级 1-1-1'
        }]
      }]
    }, {
      id: 4,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1',
        children: [{
          id: 6,
          label: '三级 2-1-1'
        }]
      }, {
        id: 7,
        label: '二级 2-2',
        children: [{
          id: 8,
          label: '三级 2-2-1'
        }]
      }]
    }, {
      id: 9,
      label: '一级 3',
      children: [{
        id: 10,
        label: '二级 3-1',
        disabled: true,
        children: [{
          id: 11,
          label: '三级 3-1-1',
          disabled: true
        }]
      }, {
        id: 12,
        label: '二级 3-2',
        children: [{
          id: 13,
          label: '三级 3-2-1'
        }]
      }]
    }];
    return data;
  };
  const createTransfer = (props, opts) => {
    return createVue(Object.assign({
      template: `
        <af-transfer-tree :data="testData" ref="transfer" ${props}>
        </af-transfer-tree>
      `,

      created() {
        this.testData = getTestData();
      }
    }, opts));
  };

  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Transfer, true);
    expect(vm.$el).to.exist;
  });

  it('default target list', done => {
    vm = createTransfer('v-model="value" :default-value="defaultValue"', {
      data() {
        return {
          value: [],
          defaultValue: '6,8'
        };
      }
    });
    const transfer = vm.$refs.transfer;
    setTimeout(() => {
      expect(transfer.targetData.length).to.equal(2);
      done();
    }, 50);
  });

  it('filterable', done => {
    vm = createTransfer('v-model="value" filterable :default-value="defaultValue" :filter-method="method"', {
      data() {
        return {
          value: [],
          defaultValue: '3,6,8,11,13',
          method(query, option) {
            return option.id === Number(query);
          }
        };
      }
    });
    const transfer = vm.$refs.transfer;
    const rightList = transfer.$el.querySelectorAll('.af-transfer-panel')[1].__vue__;
    rightList.query = '3';
    setTimeout(_ => {
      expect(rightList.filteredData.length).to.equal(1);
      done();
    }, 50);
  });

  it('transfer', done => {
    vm = createTransfer('v-model="value" :default-value="defaultValue"', {
      data() {
        return {
          value: [],
          defaultValue: '11'
        };
      }
    });
    const transfer = vm.$refs.transfer;
    const leftPanel = transfer.$refs.leftPanel;
    const rightPanel = transfer.$refs.rightPanel;
    setTimeout(_ => {
      const leftFirst = leftPanel.$el.querySelector('.af-transfer-panel__list .af-tree-node');
      const rightFirst = rightPanel.$el.querySelector('.af-transfer-panel__list .af-transfer-panel__button');
      rightFirst.click();
      setTimeout(_ => {
        expect(transfer.targetData.length).to.equal(1);
        leftFirst.click();
        setTimeout(_ => {
          expect(transfer.targetData.length).to.equal(2);
          done();
        }, 50);
      }, 50);
    }, 50);
  });

  it('customize', () => {
    vm = createTransfer('v-model="value" :titles="titles" :format="format"', {
      data() {
        return {
          value: [2],
          titles: ['表1', '表2'],
          format: {
            total: 'no'
          }
        };
      }
    });
    const transfer = vm.$refs.transfer.$el;
    const label = transfer.querySelector('.af-transfer-panel__header');
    const footer = transfer.querySelector('.af-transfer-panel__footer');
    expect(label.innerText.indexOf('表1') > -1).to.true;
    expect(footer.querySelector('span').innerText).to.equal('no');
  });

  it('check all', done => {
    vm = createTransfer('v-model="value"', {
      data() {
        return {
          value: []
        };
      }
    });
    const transfer = vm.$refs.transfer;
    const leftPanel = transfer.$refs.leftPanel;
    const rightPanel = transfer.$refs.rightPanel;
    const addAllToRight = leftPanel.$el.querySelector('.af-transfer-panel__header .af-transfer-panel__button');
    const addAllToLeft = rightPanel.$el.querySelector('.af-transfer-panel__header .af-transfer-panel__button');
    setTimeout(() => {
      addAllToRight.click();
      setTimeout(() => {
        expect(transfer.value.length).to.equal(4);
        addAllToLeft.click();
        setTimeout(() => {
          expect(transfer.value.length).to.equal(0);
          done();
        }, 50);
      }, 50);
    }, 50);
  });

  describe('target order', () => {
    it('original(default)', done => {
      vm = createTransfer('v-model="value" :default-value="defaultValue"', {
        data() {
          return {
            value: [],
            defaultValue: '6,8'
          };
        }
      });
      const transfer = vm.$refs.transfer;
      const leftPanel = transfer.$refs.leftPanel;
      const leftFirst = leftPanel.$el.querySelector('.af-transfer-panel__list .af-tree-node');
      setTimeout(() => {
        leftFirst.click();
        setTimeout(() => {
          const targetItems = [].slice.call(vm.$el.querySelectorAll('.af-transfer__link + .af-transfer-panel .af-transfer-panel__body .af-transfer-panel__button span span'));
          expect(targetItems.map(item => item.innerText)).to.deep.equal(['三级 1-1-1', '三级 2-1-1', '三级 2-2-1']);
          done();
        }, 50);
      }, 50);
    });

    it('push', done => {
      vm = createTransfer('v-model="value" target-order="push" :default-value="defaultValue"', {
        data() {
          return {
            value: [],
            defaultValue: '6,8'
          };
        }
      });
      const transfer = vm.$refs.transfer;
      const leftPanel = transfer.$refs.leftPanel;
      const leftFirst = leftPanel.$el.querySelector('.af-transfer-panel__list .af-tree-node');
      setTimeout(() => {
        leftFirst.click();
        setTimeout(() => {
          const targetItems = [].slice.call(vm.$el.querySelectorAll('.af-transfer__link + .af-transfer-panel .af-transfer-panel__body .af-transfer-panel__button span span'));
          expect(targetItems.map(item => item.innerText)).to.deep.equal(['三级 2-1-1', '三级 2-2-1', '三级 1-1-1']);
          done();
        }, 50);
      }, 50);
    });

    it('unshift', done => {
      vm = createTransfer('v-model="value" target-order="unshift" :default-value="defaultValue"', {
        data() {
          return {
            value: [],
            defaultValue: '6,8'
          };
        }
      });
      const transfer = vm.$refs.transfer;
      const leftPanel = transfer.$refs.leftPanel;
      const leftFirst = leftPanel.$el.querySelector('.af-transfer-panel__list .af-tree-node');
      setTimeout(() => {
        leftFirst.click();
        setTimeout(() => {
          const targetItems = [].slice.call(vm.$el.querySelectorAll('.af-transfer__link + .af-transfer-panel .af-transfer-panel__body .af-transfer-panel__button span span'));
          expect(targetItems.map(item => item.innerText)).to.deep.equal(['三级 1-1-1', '三级 2-1-1', '三级 2-2-1']);
          done();
        }, 50);
      }, 50);
    });
  });
});
