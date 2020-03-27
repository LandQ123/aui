import { createVue, destroyVM } from '../../../test/unit/util';

describe('Breadcrumb', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', done => {
    vm = createVue(`
      <af-breadcrumb separator="/">
        <af-breadcrumb-item to="/">首页</af-breadcrumb-item>
        <af-breadcrumb-item>活动管理</af-breadcrumb-item>
        <af-breadcrumb-item>活动列表</af-breadcrumb-item>
        <af-breadcrumb-item>活动详情</af-breadcrumb-item>
      </af-breadcrumb>
    `);
    vm.$nextTick(_ => {
      expect(vm.$el.querySelector('.af-breadcrumb__separator').innerText).to.equal('>');
      done();
    });
  });
});
