import React, { useLayoutEffect, Fragment } from 'react';
import StepItem from './components/StepItem';

export default ({ worksheetId, rowId, currentWork, currentType, works, status }) => {
  useLayoutEffect(() => {
    if (currentWork) {
      const $el = $(`#workflowStep_${currentWork.workId}`);

      $el.closest('.nano').nanoScroller({ scrollTo: $el });
    }
  }, []);

  return (
    <Fragment>
      {works.map((item, index) => (
        <StepItem
          key={index}
          isLast={index === works.length - 1}
          data={item}
          currentWork={currentWork}
          currentType={currentType}
          worksheetId={worksheetId}
          rowId={rowId}
          status={status}
        />
      ))}
      {_.includes([2, 3, 4], status) && <div className="TxtCenter Gray_75 mTop5">{_l('流程结束')}</div>}
    </Fragment>
  );
};