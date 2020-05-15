/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */

import AfPaginationBase from 'aui/packages/pagination';

const genProps = (self, attrs, events) => {
  return {
    props: attrs,
    on: events
  };
};

export default {
  name: 'x-pagination',
  props: {
    pagination: Object
  },
  render(h) {
    const self = this;
    const {attrs, events} = this.pagination;
    const Props = genProps(self, attrs, events);
    return (
      <AfPaginationBase
        small={attrs.small || true}
        {...Props}
        // currentPage={1}
        // pageSizes={[10, 20, 30, 40]}
        // pageSize={10}
        // total={400}
      >
      </AfPaginationBase>
    );
  }
};
