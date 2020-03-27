let hiddenTextarea;
// 预设的一些样式
const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;
// 预计要用的一些样式属性
const CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
];
// 用来获取结点的某些样式
function calculateNodeStyling(targetElement) {
  const style = window.getComputedStyle(targetElement); // 获取最终作用到元素的所有样式（返回CSSStyleDeclaration对象）

  const boxSizing = style.getPropertyValue('box-sizing'); // getPropertyValue为CSSStyleDeclaration原型上的方法获取到具体的样式
  // 上下内边距
  const paddingSize = (
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'))
  );
  // 上下边框宽度
  const borderSize = (
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'))
  );
  // 取出预计要用的属性名和值，以分号拼接成字符串
  const contextStyle = CONTEXT_STYLE
    .map(name => `${name}:${style.getPropertyValue(name)}`)
    .join(';');
  // 返回预设要用的样式字符串，上下内边距和， 边框和， boxSizing属性值
  return { contextStyle, paddingSize, borderSize, boxSizing };
}
// 用来计算文本域的高度
export default function calcTextareaHeight(
  targetElement, // 要计算的结点
  minRows = 1, // 最小的行数
  maxRows = null // 最大的行数
) {
  if (!hiddenTextarea) { // 来创建一个隐藏的文本域，所有的计算都是在这上面进行的
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }
  // 获取结点一些样式值
  let {
    paddingSize,
    borderSize,
    boxSizing,
    contextStyle
  } = calculateNodeStyling(targetElement);
  // 给创建的hiddenTextarea添加行内样式并赋值value或palceholder,无则''
  hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
  // 设置内容，按优先级一次是 结点的 value， 结点的 placeholder， 以及空字符串
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || '';
  // 获取元素自身高度
  let height = hiddenTextarea.scrollHeight;
  const result = {};

  if (boxSizing === 'border-box') {
    height = height + borderSize; // 如果是 border-box，说明高度得加上边框
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize; // 如果是 content-box，说明得减去上下内边距
  }

  hiddenTextarea.value = ''; // 计算单行高度，先清空内容
  // 单行文字的高度，滚动高度减去上下内边距
  let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

  if (minRows !== null) { // 如果参数传递了 minRows
    let minHeight = singleRowHeight * minRows; // 最小高度 = 单行高度 * 行数
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize; // 如果是 border-box，还得加上上下内边距和上下边框的宽度
    }
    height = Math.max(minHeight, height); // 取二者最大值
    result.minHeight = `${ minHeight }px`;
  }
  if (maxRows !== null) { // 如果参数传递了 maxRows
    let maxHeight = singleRowHeight * maxRows; // 说明最多只能有这么多行的高度
    if (boxSizing === 'border-box') { // 如果是 border-box，还得加上上下内边距和上下边框的宽度
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height); // 取二者最小值
  }
  result.height = `${ height }px`; // 返回文本域应当设置的高度
  // 计算完成后移除hiddenTextarea元素
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  hiddenTextarea = null;
  // 暴露包含minHeight及height的对象
  return result;
};
