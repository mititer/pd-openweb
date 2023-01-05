import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import worksheet from 'src/api/worksheet';
import SingleView from 'worksheet/common/SingleView';
import _ from 'lodash';

const Con = styled.div`
  height: 100%;
  background: #fff;
  .SingleViewHeader {
    padding-right: 10px;
    .svgWrap {
      width: 26px;
      height: 26px;
      border-radius: 4px;
    }
  }
  .queryInput .inputCon > i {
    font-size: 20px !important;
    margin-top: 2px;
  }
`;

export default function ViewLand(props) {
  const { appId, worksheetId, viewId } = _.get(props, 'match.params') || {};
  const [worksheetInfo, setWorksheetInfo] = useState();
  useEffect(() => {
    window.hideColumnHeadFilter = true;
    worksheet.getWorksheetInfo({ worksheetId, getViews: true }).then(worksheetInfo => {
      setWorksheetInfo({
        worksheetName: worksheetInfo.name,
        viewName: (_.find(worksheetInfo.views, v => v.viewId === viewId) || {}).name || '',
      });
    });
    return () => {
      window.hideColumnHeadFilter = false;
    };
  }, []);
  return (
    <Con>
      <SingleView
        showPageTitle
        showHeader
        headerLeft={
          !!worksheetInfo && (
            <div className="mLeft24 Font16 bold flexRow alignItemsCenter">
              {`${worksheetInfo.worksheetName}-${worksheetInfo.viewName}`}
            </div>
          )
        }
        appId={appId}
        worksheetId={worksheetId}
        viewId={viewId}
      />
    </Con>
  );
}