import { triggerEvent } from '../../../test/unit/util';
import Message from 'packages/message';

describe('Message', () => {
  afterEach(() => {
    const el = document.querySelector('.af-message');
    if (!el) return;
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
    if (el.__vue__) {
      el.__vue__.$destroy();
    }
  });

  it('automatically close', done => {
    Message({
      message: '灰风',
      duration: 500
    });
    const message = document.querySelector('.af-message__content');
    expect(document.querySelector('.af-message')).to.exist;
    expect(message.textContent).to.equal('灰风');
    setTimeout(() => {
      expect(document.querySelector('.af-message')).to.not.exist;
      done();
    }, 1000);
  });

  it('manually close', done => {
    Message({
      message: '夏天'
    });
    setTimeout(() => {
      document.querySelector('.af-icon-close').click();
      setTimeout(() => {
        expect(document.querySelector('.af-message')).to.not.exist;
        done();
      }, 500);
    }, 500);
  });

  it('custom icon', done => {
    Message({
      message: '夏天',
      iconClass: 'af-icon-close',
      duration: 1000
    });
    setTimeout(() => {
      const icon = document.querySelector('.af-message .af-message__status');
      expect(icon.classList.contains('af-icon-close')).to.true;
      done();
    }, 500);
  });

  it('html string', () => {
    Message({
      message: '<strong>夏天</strong>',
      dangerouslyUseHTMLString: true,
      duration: 1000
    });
    const message = document.querySelector('.af-message strong');
    expect(message.textContent).to.equal('夏天');
  });

  it('close all', done => {
    Message({
      message: '夏天',
      duration: 0
    });
    Message({
      message: '淑女',
      duration: 0
    });
    setTimeout(() => {
      Message.closeAll();
      setTimeout(() => {
        expect(document.querySelector('.af-message')).to.not.exist;
        done();
      }, 500);
    }, 500);
  });

  it('invoke with type', () => {
    Message.success('毛毛狗');
    expect(document.querySelector('.af-message__wrapper').__vue__.type).to.equal('success');
  });

  it('create', () => {
    Message('娜梅莉亚');
    expect(document.querySelector('.af-message')).to.exist;
  });

  it('reset timer', done => {
    Message({
      message: '白灵',
      duration: 1000
    });
    setTimeout(() => {
      triggerEvent(document.querySelector('.af-message'), 'mouseenter');
      setTimeout(() => {
        expect(document.querySelector('.af-message')).to.exist;
        done();
      }, 700);
    }, 500);
  });
});
