import { createVue, destroyVM } from '../../../test/unit/util';

describe('Input', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createVue({
      template: `
        <af-input
          :minlength="3"
          :maxlength="5"
          placeholder="请输入内容"
          @focus="handleFocus"
          value="input">
        </af-input>
      `,
      data() {
        return {
          inputFocus: false
        };
      },
      methods: {
        handleFocus() {
          this.inputFocus = true;
        }
      }
    }, true);
    let inputElm = vm.$el.querySelector('input');
    inputElm.focus();
    expect(vm.inputFocus).to.be.true;
    expect(inputElm.getAttribute('placeholder')).to.equal('请输入内容');
    expect(inputElm.value).to.equal('input');
    expect(inputElm.getAttribute('minlength')).to.equal('3');
    expect(inputElm.getAttribute('maxlength')).to.equal('5');
  });

  it('disabled', () => {
    vm = createVue({
      template: `
        <af-input disabled>
        </af-input>
      `
    }, true);
    expect(vm.$el.querySelector('input').getAttribute('disabled')).to.ok;
  });

  it('suffixIcon', () => {
    vm = createVue({
      template: `
        <af-input suffix-icon="time"></af-input>
      `
    }, true);
    var icon = vm.$el.querySelector('.af-input__icon');
    expect(icon).to.be.exist;
  });

  it('prefixIcon', () => {
    vm = createVue({
      template: `
        <af-input prefix-icon="time"></af-input>
      `
    }, true);
    var icon = vm.$el.querySelector('.af-input__icon');
    expect(icon).to.be.exist;
  });

  it('size', () => {
    vm = createVue({
      template: `
        <af-input size="large">
        </af-input>
      `
    }, true);

    expect(vm.$el.classList.contains('af-input--large')).to.true;
  });

  it('type', () => {
    vm = createVue({
      template: `
        <af-input type="textarea">
        </af-input>
      `
    }, true);

    expect(vm.$el.classList.contains('af-textarea')).to.true;
  });

  it('rows', () => {
    vm = createVue({
      template: `
        <af-input type="textarea" :rows="3">
        </af-input>
      `
    }, true);
    expect(vm.$el.querySelector('.af-textarea__inner').getAttribute('rows')).to.be.equal('3');
  });

  // Github issue #2836
  it('resize', done => {
    vm = createVue({
      template: `
        <div>
          <af-input type="textarea" :resize="resize"></af-input>
        </div>
      `,
      data: {
        resize: 'none'
      }
    }, true);
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.af-textarea__inner').style.resize).to.be.equal(vm.resize);
      vm.resize = 'horizontal';
      vm.$nextTick(() => {
        expect(vm.$el.querySelector('.af-textarea__inner').style.resize).to.be.equal(vm.resize);
        done();
      });
    });
  });

  it('autosize', done => {
    vm = createVue({
      template: `
        <div>
          <af-input
            ref="limitSize"
            type="textarea"
            :autosize="{minRows: 3, maxRows: 5}"
            v-model="textareaValue"
          >
          </af-input>
          <af-input
            ref="limitlessSize"
            type="textarea"
            autosize
            v-model="textareaValue"
          >
          </af-input>
        </div>
      `,
      data() {
        return {
          textareaValue: 'sda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasdsda\ndasd\nddasd'
        };
      }
    }, true);

    var limitSizeInput = vm.$refs.limitSize;
    var limitlessSizeInput = vm.$refs.limitlessSize;
    expect(limitSizeInput.textareaStyle.height).to.be.equal('117px');
    expect(limitlessSizeInput.textareaStyle.height).to.be.equal('201px');

    vm.textareaValue = '';
    setTimeout(_ => {
      expect(limitSizeInput.textareaStyle.height).to.be.equal('75px');
      expect(limitlessSizeInput.textareaStyle.height).to.be.equal('33px');
      done();
    }, 200);
  });

  it('focus', done => {
    vm = createVue({
      template: `
        <af-input ref="input">
        </af-input>
      `
    }, true);

    const spy = sinon.spy();

    vm.$refs.input.$on('focus', spy);
    vm.$refs.input.focus();

    vm.$nextTick(_ => {
      expect(spy.calledOnce).to.be.true;
      done();
    });
  });

  it('Input contains Select and append slot', (done) => {
    vm = createVue({
      template: `
      <af-input v-model="value" clearable class="input-with-select" ref="input">
        <af-select v-model="select" slot="prepend" placeholder="请选择">
          <af-option label="餐厅名" value="1"></af-option>
          <af-option label="订单号" value="2"></af-option>
          <af-option label="用户电话" value="3"></af-option>
        </af-select>
        <af-button slot="append" icon="af-icon-search"></af-button>
      </af-input>
      `,
      data() {
        return {
          value: '1234'
        };
      }
    }, true);
    vm.$refs.input.hovering = true;
    setTimeout(() => {
      const suffixEl = document.querySelector('.input-with-select > .af-input__suffix');
      expect(suffixEl).to.not.be.null;
      expect(suffixEl.style.transform).to.not.be.empty;
      done();
    }, 20);
  });

  describe('Input Events', () => {
    it('event:focus & blur', done => {
      vm = createVue({
        template: `
          <af-input
            ref="input"
            placeholder="请输入内容"
            value="input">
          </af-input>
        `
      }, true);

      const spyFocus = sinon.spy();
      const spyBlur = sinon.spy();

      vm.$refs.input.$on('focus', spyFocus);
      vm.$refs.input.$on('blur', spyBlur);
      vm.$el.querySelector('input').focus();
      vm.$el.querySelector('input').blur();

      vm.$nextTick(_ => {
        expect(spyFocus.calledOnce).to.be.true;
        expect(spyBlur.calledOnce).to.be.true;
        done();
      });
    });
    it('event:change', done => {
      // NOTE: should be same as native's change behavior
      vm = createVue({
        template: `
          <af-input
            ref="input"
            placeholder="请输入内容"
            :value="input">
          </af-input>
        `,
        data() {
          return {
            input: 'a'
          };
        }
      }, true);

      const inputElm = vm.$el.querySelector('input');
      const simulateEvent = (text, event) => {
        inputElm.value = text;
        inputElm.dispatchEvent(new Event(event));
      };

      const spy = sinon.spy();
      vm.$refs.input.$on('change', spy);

      // simplified test, component should emit change when native does
      simulateEvent('1', 'input');
      simulateEvent('2', 'change');
      vm.$nextTick(_ => {
        expect(spy.calledWith('2')).to.be.true;
        expect(spy.calledOnce).to.be.true;
        done();
      });
    });
    it('event:clear', done => {
      vm = createVue({
        template: `
          <af-input
            ref="input"
            placeholder="请输入内容"
            clearable
            :value="input">
          </af-input>
        `,
        data() {
          return {
            input: 'a'
          };
        }
      }, true);

      const spyClear = sinon.spy();
      const inputElm = vm.$el.querySelector('input');

      // focus to show clear button
      inputElm.focus();
      vm.$refs.input.$on('clear', spyClear);
      vm.$nextTick(_ => {
        vm.$el.querySelector('.af-input__clear').click();
        vm.$nextTick(_ => {
          expect(spyClear.calledOnce).to.be.true;
          done();
        });
      });
    });
  });
});
