import axios from 'axios';
import { isEmpty, reject } from 'lodash';
import { getPssId } from 'src/util/pssId';
import addRecord from 'worksheet/common/newRecord/addRecord';
import { openAddRecord as mobileAddRecord } from 'mobile/Record/addRecord';
import { openRecordInfo } from 'worksheet/common/recordInfo';
import { openMobileRecordInfo } from 'src/pages/Mobile/Record';
import { selectUser } from 'mobile/components/SelectUser';
import { mobileSelectRecord } from 'src/components/recordCardListDialog/mobile';
import { selectOrgRole as mobileSelectOrgRole } from 'mobile/components/SelectOrgRole';
import { dialogSelectOrgRole, dialogSelectDept, dialogSelectUser } from 'ming-ui/functions';
import { selectRecord } from 'src/components/recordCardListDialog';
import renderText from 'worksheet/components/CellControls/renderText';
import selectLocation from './selectLocation';
import { browserIsMobile, addBehaviorLog, mdAppResponse } from 'src/util';
import { getFilledRequestParams, emitter } from '../../util';

function mdPost(controller, action, data) {
  let pssId = getPssId();
  const headers = {
    authorization: pssId ? `md_pss_id ${pssId}` : '',
  };
  if (window.access_token) {
    // 工作流&统计服务
    headers.access_token = window.access_token;
    // 主站服务
    headers.Authorization = `access_token ${window.access_token}`;
  }
  const clientId = window.clientId || sessionStorage.getItem('clientId');
  if (window.needSetClientId({ clientId, controllerName: controller })) {
    headers.clientId = clientId;
  }
  return axios
    .post(`${window.__api_server__.main.replace(/\/$/, '')}/${controller}/${action}`, data, {
      headers,
    })
    .then(res => {
      if (res.data.state) {
        return res.data.data;
      } else {
        throw new Error(res.data.exception);
      }
    });
}

export const api = {
  getFilterRowsTotalNum: data => mdPost('Worksheet', 'GetFilterRowsTotalNum', getFilledRequestParams(data)),
  getFilterRows: data => mdPost('Worksheet', 'GetFilterRows', getFilledRequestParams(data)),
  getRowRelationRows: data => mdPost('Worksheet', 'GetRowRelationRows', data),
  getRowDetail: data => mdPost('Worksheet', 'GetRowDetail', data),
  addWorksheetRow: data => mdPost('Worksheet', 'AddWorksheetRow', data),
  deleteWorksheetRow: data => mdPost('Worksheet', 'DeleteWorksheetRows', data),
  updateWorksheetRow: data => mdPost('Worksheet', 'UpdateWorksheetRow', data),
  getWorksheetInfo: data => mdPost('Worksheet', 'GetWorksheetInfo', data),
};

const isMobile = browserIsMobile();

function emitWidgetAction(action, value) {
  emitter.emit('POST_MESSAGE_TO_CUSTOM_WIDGET', {
    action,
    value,
  });
}

export const utils = {
  alert: window.alert,
  openRecordInfo: args => {
    addBehaviorLog('worksheetRecord', args.worksheetId, { rowId: args.recordId }); // 浏览记录埋点
    if (window.isMingDaoApp) {
      const sessionId = Math.random().toString(32).slice(2);
      return mdAppResponse({
        sessionId,
        type: 'native',
        settings: {
          action: 'row',
          appId: args.appId,
          worksheetId: args.worksheetId,
          viewId: args.viewId,
          rowId: args.recordId,
        },
      }).then(res => {
        if (res.action === 'close') {
          return { action: 'close' };
        } else if (res.action === 'row') {
          return { action: 'update', value: safeParse(res.value)[0] };
        }
      });
    }
    return new Promise((resolve, reject) => {
      (isMobile ? openMobileRecordInfo : openRecordInfo)({
        projectId: args.projectId,
        allowAdd: args.worksheetInfo && args.worksheetInfo.allowAdd,
        ...args,
        ...(isMobile
          ? {
              rowId: args.recordId,
              className: 'full',
              updateSuccess: (rowIds, newRow) => {
                resolve({ action: 'update', value: newRow });
              },
            }
          : {
              updateRows: (rowIds, newRow) => {
                resolve({ action: 'update', value: newRow });
              },
            }),
      });
    });
  },
  openNewRecord: args => {
    if (window.isMingDaoApp) {
      const sessionId = Math.random().toString(32).slice(2);
      return mdAppResponse({
        sessionId,
        type: 'native',
        settings: {
          action: 'addRow',
          appId: args.appId,
          worksheetId: args.worksheetId,
          viewId: args.viewId,
        },
      }).then(res => {
        if (res.action === 'close') {
          return;
        } else if (res.action === 'addRow') {
          return safeParse(res.value)[0];
        }
      });
    }
    return new Promise((resolve, reject) => {
      (isMobile ? mobileAddRecord : addRecord)({
        ...args,
        onAdd: resolve,
      });
    });
  },
  selectUsers: ({ unique, onClose = () => {}, onSelect = () => {}, ...rest } = {}) => {
    if (window.isMingDaoApp) {
      const sessionId = Math.random().toString(32).slice(2);
      return mdAppResponse({
        sessionId,
        type: 'native',
        settings: {
          action: 'selectUsers',
          projectId: rest.projectId,
          unique: unique,
        },
      }).then(res => {
        if (res.action === 'close') {
          return [];
        } else if (res.action === 'selectUsers') {
          const users = safeParse(res.value, 'array').map(user => ({
            accountId: user.account_id,
            avatar: user.avatar,
            fullname: user.full_name || user.fullname,
          }));
          emitWidgetAction('select-users', users);
          return users;
        }
      });
    }
    return new Promise((resolve, reject) => {
      function handleSelect(users) {
        emitWidgetAction('select-users', users);
        resolve(users);
      }
      if (isMobile) {
        selectUser({
          type: 'user',
          projectId: rest.projectId,
          onlyOne: unique,
          onSave: handleSelect,
          ...rest,
        });
      } else {
        dialogSelectUser({
          SelectUserSettings: {
            projectId: rest.projectId,
            callback: handleSelect,
            ...rest,
          },
        });
      }
    });
  },
  selectDepartments: ({ unique, onClose = () => {}, onSelect = () => {}, ...rest } = {}) => {
    if (window.isMingDaoApp) {
      const sessionId = Math.random().toString(32).slice(2);
      return mdAppResponse({
        sessionId,
        type: 'native',
        settings: {
          action: 'selectDepartments',
          projectId: rest.projectId,
          unique: unique,
        },
      }).then(res => {
        if (res.action === 'close') {
          return;
        } else if (res.action === 'selectDepartments') {
          const departments = safeParse(res.value, 'array').map(department => ({
            departmentId: department.department_id,
            departmentName: department.department_name,
          }));
          emitWidgetAction('select-departments', departments);
          return departments;
        }
      });
    }
    return new Promise((resolve, reject) => {
      function handleSelect(departments) {
        emitWidgetAction('select-departments', departments);
        resolve(departments);
      }
      if (isMobile) {
        selectUser({
          type: 'department',
          projectId: rest.projectId,
          onlyOne: unique,
          onSave: handleSelect,
          ...rest,
        });
      } else {
        dialogSelectDept({
          projectId: rest.projectId,
          isIncludeRoot: rest.isIncludeRoot,
          unique: unique,
          showCreateBtn: rest.showCreateBtn,
          allPath: rest.allPath,
          selectFn: handleSelect,
          onClose: () => resolve(),
          ...rest,
        });
      }
    });
  },
  selectOrgRole: ({ unique, onClose = () => {}, onSelect = () => {}, ...rest } = {}) => {
    if (window.isMingDaoApp) {
      const sessionId = Math.random().toString(32).slice(2);
      return mdAppResponse({
        sessionId,
        type: 'native',
        settings: {
          action: 'selectOrgRole',
          projectId: rest.projectId,
          unique: unique,
        },
      }).then(res => {
        if (res.action === 'close') {
          return;
        } else if (res.action === 'selectOrgRole') {
          const orgs = safeParse(res.value, 'array').map(orgRole => ({
            organizeId: orgRole.organizeId,
            organizeName: orgRole.organizeName,
          }));
          emitWidgetAction('select-org-roles', orgs);
          return orgs;
        }
      });
    }
    return new Promise((resolve, reject) => {
      function handleSelect(orgs) {
        emitWidgetAction('select-org-roles', orgs);
        resolve(orgs);
      }
      if (isMobile) {
        mobileSelectOrgRole({
          projectId: rest.projectId,
          onlyOne: unique,
          onSave: handleSelect,
          ...rest,
        });
      } else {
        return dialogSelectOrgRole({
          projectId: rest.projectId,
          unique: unique,
          onSave: handleSelect,
          ...rest,
        });
      }
    });
  },
  selectRecord: ({ relateSheetId, multiple, onClose = () => {}, onSelect = () => {}, ...rest } = {}) => {
    if (window.isMingDaoApp) {
      const sessionId = Math.random().toString(32).slice(2);
      return mdAppResponse({
        sessionId,
        type: 'native',
        settings: {
          action: 'selectRecord',
          projectId: rest.projectId,
          relateSheetId,
          multiple,
        },
      }).then(res => {
        if (res.action === 'close') {
          return;
        } else if (res.action === 'selectRecord') {
          const records = safeParse(res.value, 'array');
          emitWidgetAction('select-records', records);
          return records;
        }
      });
    }
    return new Promise((resolve, reject) => {
      (isMobile ? mobileSelectRecord : selectRecord)({
        projectId: rest.projectId,
        canSelectAll: false,
        pageSize: rest.pageSize,
        multiple: multiple,
        singleConfirm: true,
        relateSheetId,
        onOk: records => {
          emitWidgetAction('select-records', records);
          resolve(records);
        },
        ...rest,
      });
    });
  },
  selectLocation: (options = {}) => {
    const { distance, onClose = () => {}, onSelect = () => {} } = options;
    if (window.isMingDaoApp) {
      const sessionId = Math.random().toString(32).slice(2);
      return mdAppResponse({
        sessionId,
        type: 'map',
        settings: {
          action: 'map',
          range: distance,
        },
      }).then(res => {
        if (res.action === 'close') {
          return;
        } else if (res.action === 'map') {
          const value = safeParse(res.value);
          const location = !isEmpty(value)
            ? {
                address: value.address,
                lat: value.lat,
                lng: value.lon,
                name: value.title,
              }
            : undefined;
          emitWidgetAction('select-location', [location]);
          return location;
        }
      });
    }
    return new Promise((resolve, reject) => {
      selectLocation({
        ...options,
        onSelect: location => {
          resolve(location);
          emitWidgetAction('select-location', [location]);
        },
      });
    });
  },
  renderText,
};
