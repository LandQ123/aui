import MessageBox from 'packages/message-box';

describe('MessageBox', () => {
  let hasPromise = true;
  before(() => {
    if (!window.Promise) {
      hasPromise = false;
      window.Promise = require('es6-promise').Promise;
    }
  });

  after(() => {
    if (!hasPromise) {
      window.Promise = undefined;
    }
  });

  afterEach(() => {
    const el = document.querySelector('.af-message-box__wrapper');
    if (!el) return;
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
    MessageBox.close();
  });

  it('create and close', done => {
    MessageBox({
      type: 'success',
      title: '消息',
      messageTitle: '内容标题',
      message: '这是一段内容'
    });
    setTimeout(() => {
      const msgbox = document.querySelector('.af-message-box__wrapper');
      expect(msgbox.__vue__.$parent.visible).to.true;
      expect(msgbox.querySelector('.af-message-box__title').textContent).to.equal('消息');
      expect(msgbox.querySelector('.af-message-box__message')
        .querySelector('.af-message-box__message-title').textContent).to.equal('内容标题');
      expect(msgbox.querySelector('.af-message-box__message')
        .querySelector('.af-message-box__message-title + p').textContent).to.equal('这是一段内容');
      MessageBox.close();
      expect(msgbox.__vue__.$parent.visible).to.false;
      done();
    }, 300);
  });

  it('invoke with strings', done => {
    MessageBox('消息', '这是一段内容', 'success');
    setTimeout(() => {
      expect(document.querySelector('.af-message-box__wrapper')).to.exist;
      done();
    }, 300);
  });

  it('custom icon', done => {
    MessageBox({
      type: 'warning',
      iconClass: 'af-icon-question',
      message: '这是一段内容'
    });
    setTimeout(() => {
      const icon = document.querySelector('.af-message-box__status');
      expect(icon.classList.contains('af-icon-question')).to.true;
      done();
    }, 300);
  });

  it('html string', done => {
    MessageBox({
      title: 'html string',
      dangerouslyUseHTMLString: true,
      message: '<strong>html string</strong>'
    });
    setTimeout(() => {
      const message = document.querySelector('.af-message-box__message strong');
      expect(message.textContent).to.equal('html string');
      done();
    }, 300);
  });

  it('distinguish cancel and close', done => {
    let msgAction = '';
    MessageBox({
      title: '消息',
      message: '这是一段内容',
      distinguishCancelAndClose: true
    }, action => {
      msgAction = action;
    });
    setTimeout(() => {
      document.querySelector('.af-message-box__close').click();
      setTimeout(() => {
        expect(msgAction).to.equal('close');
        done();
      }, 10);
    }, 10);
  });

  it('alert', done => {
    MessageBox.alert('这是一段内容', {
      title: '标题名称',
      type: 'warning'
    });
    setTimeout(() => {
      document.querySelector('.v-modal').click();
      expect(document.querySelector('.af-message-box__wrapper')
        .__vue__.$parent.visible).to.true;
      expect(document.querySelector('.af-message-box__wrapper')
        .__vue__.$parent.type).to.equal('warning');
      done();
    }, 300);
  });

  it('confirm', done => {
    MessageBox.confirm('这是一段内容', {
      title: '标题名称',
      type: 'warning'
    });
    setTimeout(() => {
      document.querySelector('.af-message-box__wrapper')
        .querySelector('.af-button--primary').click();
      expect(document.querySelector('.af-message-box__wrapper')
        .__vue__.$parent.visible).to.false;
      done();
    }, 200);
  });

  it('callback', done => {
    let msgAction = '';
    MessageBox({
      title: '消息',
      message: '这是一段内容'
    }, action => {
      msgAction = action;
    });
    setTimeout(() => {
      document.querySelector('.af-message-box__close').click();
      setTimeout(() => {
        expect(msgAction).to.equal('cancel');
        done();
      }, 10);
    }, 10);
  });

  it('beforeClose', done => {
    let msgAction = '';
    MessageBox({
      title: '消息',
      message: '这是一段内容',
      beforeClose: (action, instance) => {
        instance.close();
      }
    }, action => {
      msgAction = action;
    });
    setTimeout(() => {
      document.querySelector('.af-message-box__wrapper .af-button--primary').click();
      setTimeout(() => {
        expect(msgAction).to.equal('confirm');
        done();
      }, 10);
    }, 10);
  });

  describe('promise', () => {
    it('resolve', done => {
      MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示')
        .then(action => {
          expect(action).to.equal('confirm');
          done();
        });
      setTimeout(() => {
        document.querySelector('.af-message-box__wrapper .af-button--primary').click();
      }, 50);
    });

    it('reject', done => {
      MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示')
        .catch(action => {
          expect(action).to.equal('cancel');
          done();
        });
      setTimeout(() => {
        document.querySelector('.af-message-box__wrapper .af-button:last-child').click();
      }, 50);
    });
  });
});
