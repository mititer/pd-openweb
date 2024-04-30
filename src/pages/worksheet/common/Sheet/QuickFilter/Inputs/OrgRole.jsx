import React, { useState } from 'react';
import styled from 'styled-components';
import { arrayOf, func, string } from 'prop-types';
import { quickSelectRole } from 'ming-ui/functions';
import { BaseSelectedItem } from './Styles';
import _ from 'lodash';

const Con = styled.div`
  display: flex;
  align-items: center;
  min-height: 32px;
  line-height: 32px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  border: 1px solid ${({ active }) => (active ? '#2196f3' : '#ddd')} !important;
  .clearIcon {
    display: none;
  }
  &:hover {
    .clearIcon {
      display: inline-block;
    }
  }
  ${({ isEmpty }) => (!isEmpty ? '&:hover { .downIcon { display: none;} }' : '')}
`;

const DepartmentsCon = styled.div`
  cursor: pointer;
  flex: 1;
  overflow: hidden;
  font-size: 13px;
  min-height: 32px;
  padding: 0 0 0 10px;
`;

const DepartmentsText = styled.div`
  font-size: 13px;
  color: #333;
`;

const Icon = styled.i`
  cursor: pointer;
  font-size: 13px;
  color: #9e9e9e;
  margin-right: 8px;
`;

const Empty = styled.span`
  color: #bdbdbd;
`;
export default function Departments(props) {
  const { values = [], projectId, isMultiple, onChange = () => {} } = props;
  const [active, setActive] = useState();
  return (
    <Con
      isEmpty={!values.length}
      active={active}
      onClick={e => {
        setActive(true);
        quickSelectRole(e.target, {
          projectId,
          showCurrentOrgRole: true,
          showCompanyName: true,
          unique: !isMultiple,
          onSave: data => {
            if (!data.length) {
              return;
            }
            setActive(false);
            onChange({ values: isMultiple ? _.uniqBy([...values, ...data], 'organizeId') : data });
          },
        });
      }}
    >
      <DepartmentsCon>
        {!values.length && <Empty>{_l('请选择')}</Empty>}
        {!isMultiple && !!values.length && (
          <DepartmentsText className="ellipsis" title={values[0].organizeName}>
            {values[0].organizeName}
          </DepartmentsText>
        )}
        {isMultiple &&
          values.map((v, i) => (
            <BaseSelectedItem key={i}>
              <span className="name ellipsis">{v.organizeName}</span>
              <i
                className="icon icon-delete Gray_9e Font10 Hand"
                onClick={e => {
                  e.stopPropagation();
                  onChange({ values: values.filter(d => d.organizeId !== v.organizeId) });
                }}
              />
            </BaseSelectedItem>
          ))}
      </DepartmentsCon>
      <Icon className="icon icon-group downIcon" />
      {!!values.length && (
        <Icon
          className="icon icon-cancel clearIcon"
          onClick={e => {
            onChange({ values: [] });
            e.stopPropagation();
          }}
        />
      )}
    </Con>
  );
}

Departments.propTypes = {
  projectId: string,
  values: arrayOf(string),
  onChange: func,
};
