import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon, LoadDiv, Switch, ScrollView, UserHead } from 'ming-ui';
import { Select } from 'antd';
import AdminTitle from 'src/pages/Admin/common/AdminTitle';
import TableEmpty from 'src/pages/Admin/common/TableEmpty';
import Search from 'src/pages/workflow/components/Search';
import PaginationWrap from '../../components/PaginationWrap';
import appManagementAjax from 'src/api/appManagement';
import projectAjax from 'src/api/project';
import syncTaskApi from 'src/pages/integration/api/syncTask.js';
import { getFeatureStatus, buriedUpgradeVersionDialog, upgradeVersionDialog } from 'src/util';
import { VersionProductType } from 'src/util/enum';
import { navigateTo } from 'src/router/navigateTo';
import { TASK_STATUS_TYPE } from 'src/pages/integration/dataIntegration/constant.js';
import { formatDate } from 'src/pages/integration/config.js';
import cx from 'classnames';
import './index.less';

export default class AggregationTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appList: [{ label: _l('全部应用'), value: '' }],
      appId: '',
      taskStatus: '',
      pageIndex: 1,
      list: [],
      sortId: 'createDate',
    };
    this.ajaxPromise = null;
    this.changeTaskAjax = null;
  }

  componentDidMount() {
    const { projectId } = this.props.match.params || {};
    const featureType = getFeatureStatus(projectId, VersionProductType.aggregation);
    this.getList();
    if (!featureType || featureType === '2') return;
    this.getAggregationTableUsage();
  }

  getList = () => {
    const { projectId } = this.props.match.params;
    const { appId, keyWords, pageIndex, taskStatus, isAsc, sortId } = this.state;

    this.setState({ loading: true });

    if (this.ajaxPromise) {
      this.ajaxPromise.abort();
    }

    this.ajaxPromise = syncTaskApi.list({
      projectId,
      pageNo: pageIndex - 1,
      pageSize: 50,
      searchBody: keyWords,
      sort: { fieldName: sortId, sortDirection: isAsc ? 'ASC' : 'DESC' },
      taskType: 1, //聚合表
      appId: appId ? appId : undefined,
      status: taskStatus ? taskStatus : undefined,
      type: 1, // 组织下聚合表数据（非应用下不包含数据源）
    });
    this.ajaxPromise.then(result => {
      if (result) {
        this.setState({
          list: result.content,
          count: result.totalElements,
          loading: false,
        });
      }
    });
  };

  // 获取工作表用量信息
  getAggregationTableUsage = () => {
    const { projectId } = this.props.match.params || {};
    projectAjax
      .getProjectLicenseSupportInfo({
        projectId,
        onlyUsage: true,
      })
      .then(({ limitAggregationTableCount = 20, effectiveAggregationTableCount = 0 }) => {
        this.setState({ limitAggregationTableCount, effectiveAggregationTableCount });
      });
  };

  getAppList() {
    const { appList } = this.state;
    const { projectId } = this.props.match.params || {};

    appManagementAjax
      .getAppsForProject({
        projectId,
        status: '',
        order: 3,
        pageIndex: 1,
        pageSize: 100000,
        keyword: '',
      })
      .then(({ apps }) => {
        const newAppList = apps.map(item => {
          return {
            label: item.appName,
            value: item.appId,
          };
        });
        this.setState({ appList: appList.concat(newAppList) });
      });
  }

  searchDataList = _.throttle(() => {
    this.getList();
  }, 200);

  changeTask = item => {
    const { projectId } = this.props.match.params || {};
    const { list = [] } = this.state;

    if (this.changeTaskAjax) {
      this.changeTaskAjax.abort();
    }

    if (item.taskStatus === TASK_STATUS_TYPE.RUNNING) {
      this.changeTaskAjax = syncTaskApi.stopTask({ projectId, taskId: item.id });
    } else {
      this.changeTaskAjax = syncTaskApi.startTask({ projectId, taskId: item.id });
    }
    this.changeTaskAjax.then(
      res => {
        let isSucceeded = item.taskStatus === TASK_STATUS_TYPE.RUNNING ? res : (res || {}).isSucceeded;
        const { errorMsg } = res;
        if (isSucceeded) {
          this.setState({
            list: list.map(o => {
              if (item.id === o.id) {
                return {
                  ...item,
                  taskStatus:
                    item.taskStatus !== TASK_STATUS_TYPE.RUNNING ? TASK_STATUS_TYPE.RUNNING : TASK_STATUS_TYPE.STOP,
                };
              } else {
                return o;
              }
            }),
          });
        } else {
          alert(errorMsg || _l('失败，请稍后再试'), 2);
        }
      },
      () => {
        setState({
          updating: false,
        });
      },
    );
  };

  render() {
    const { match = {} } = this.props;
    const { projectId } = match.params || {};
    const {
      appList,
      appId,
      sortId,
      isAsc,
      loading,
      pageIndex,
      list = [],
      count,
      taskStatus,
      limitAggregationTableCount = 0,
      effectiveAggregationTableCount = 0,
    } = this.state;
    let featureType = getFeatureStatus(projectId, VersionProductType.aggregation);

    return (
      <div className="orgManagementWrap aggregationTableWrap">
        <AdminTitle prefix={_l('使用分析')} />
        <div className="orgManagementHeader">{_l('聚合表')}</div>
        <div className="orgManagementContent flexColumn">
          <div className="appManagementCount">
            {featureType === '2' ? (
              <Fragment>
                <span>{_l('升级版本后可在应用中创建聚合表')}</span>
                <a
                  href="javascript:void(0);"
                  className="ThemeColor3 ThemeHoverColor2 mLeft20 NoUnderline"
                  onClick={() => buriedUpgradeVersionDialog(projectId, VersionProductType.aggregation)}
                >
                  {_l('升级')}
                </a>
              </Fragment>
            ) : (
              <Fragment>
                <span className="Gray_9e mRight5">{_l('已启用聚合表个数')}</span>
                <span className="bold">
                  {_l('%0 / %1 个', effectiveAggregationTableCount, limitAggregationTableCount)}
                </span>
                <span className="Gray_9e mLeft15 mRight5">{_l('剩余')}</span>
                <span className="bold">{_l('%0个', limitAggregationTableCount - effectiveAggregationTableCount)}</span>
                <Link
                  className={cx('ThemeColor3 ThemeHoverColor2  NoUnderline mLeft5')}
                  to={`/admin/exaggregationtable/${projectId}/aggregationtable`}
                >
                  {_l('扩充')}
                </Link>
              </Fragment>
            )}
          </div>
          <div className="flexRow">
            <Select
              className="w180 mdAntSelect mRight20"
              showSearch
              defaultValue={appId}
              options={appList}
              onFocus={() => appList.length === 1 && this.getAppList(projectId)}
              filterOption={(inputValue, option) =>
                appList
                  .find(item => item.value === option.value)
                  .label.toLowerCase()
                  .indexOf(inputValue.toLowerCase()) > -1
              }
              suffixIcon={<Icon icon="arrow-down-border Font14" />}
              notFoundContent={<span className="Gray_9e">{_l('无搜索结果')}</span>}
              onChange={value => this.setState({ appId: value, pageIndex: 1 }, this.searchDataList)}
            />

            <Select
              className="w180 mdAntSelect mLeft15"
              defaultValue={taskStatus}
              options={[
                { label: _l('全部状态'), value: '' },
                { label: _l('未发布'), value: 'UN_PUBLIC' },
                { label: _l('运行中'), value: 'RUNNING' },
                { label: _l('停止'), value: 'STOP' },
                { label: _l('异常'), value: 'ERROR' },
                { label: _l('创建中'), value: 'CREATING' },
              ]}
              suffixIcon={<Icon icon="arrow-down-border Font14" />}
              onChange={value => this.setState({ taskStatus: value }, this.searchDataList)}
            />

            <div className="flex" />
            <Search
              placeholder={_l('聚合表名称 / 创建人')}
              handleChange={keyWords => {
                this.setState({ keyWords, list: [], pageIndex: 1 }, this.searchDataList);
              }}
            />
          </div>
          <div className="flexRow listHeader bold mTop16">
            <div className="flex pLeft10">{_l('聚合表名称')}</div>
            <div className="columnWidth">{_l('状态')}</div>
            <div className="columnWidth flexRow">
              <div
                className="pointer ThemeHoverColor3 pRight12"
                onClick={() =>
                  this.setState(
                    { isAsc: sortId === 'createDate' ? !isAsc : false, sortId: 'createDate' },
                    this.searchDataList,
                  )
                }
              >
                {_l('创建时间')}
              </div>
              <div
                className="flexColumn manageListOrder pointer"
                onClick={() =>
                  this.setState(
                    { isAsc: sortId === 'createDate' ? !isAsc : false, sortId: 'createDate' },
                    this.searchDataList,
                  )
                }
              >
                <Icon icon="arrow-up" className={cx({ ThemeColor3: isAsc && sortId === 'createDate' })} />
                <Icon icon="arrow-down" className={cx({ ThemeColor3: !isAsc && sortId === 'createDate' })} />
              </div>
            </div>
            <div className="w140">{_l('创建人')}</div>
          </div>
          <div className="flex">
            {loading && pageIndex === 1 ? (
              <LoadDiv className="mTop15" />
            ) : _.isEmpty(list) ? (
              <TableEmpty className="pTop0 h100" detail={{ icon: 'icon-business1', desc: _l('暂无聚合表') }} />
            ) : (
              <ScrollView className="w100 h100">
                {list.map(item => {
                  const { name, appName, taskStatus, createDate, creatorName, creatorAvatar, createBy } = item;

                  return (
                    <div className="flexRow alignItemsCenter listContent">
                      <div className="flex flexRow pLeft10">
                        <div
                          className="iconWrap"
                          style={{
                            backgroundColor: item.taskStatus !== TASK_STATUS_TYPE.RUNNING ? '#bdbdbd' : '#0096EF',
                          }}
                        >
                          <Icon icon="aggregate_table" className="Font24 White" />
                        </div>
                        <div className="flex flexColumn name mLeft10 mRight40">
                          <div className="ellipsis Font14" title={name}>
                            {name}
                          </div>
                          <div className="ellipsis Font12 Gray_bd" title={item.apkName}>
                            {appName}
                          </div>
                        </div>
                      </div>
                      <div className="columnWidth">
                        <Switch
                          className="TxtMiddle tableSwitch mRight10"
                          checked={taskStatus === TASK_STATUS_TYPE.RUNNING}
                          text={taskStatus === TASK_STATUS_TYPE.RUNNING ? _l('同步') : _l('关闭')}
                          onClick={() => {
                            if (
                              limitAggregationTableCount &&
                              effectiveAggregationTableCount === limitAggregationTableCount
                            ) {
                              upgradeVersionDialog({
                                projectId: projectId,
                                featureId: VersionProductType.aggregation,
                                okText: _l('立即购买'),
                                onOk: () => navigateTo(`/admin/exaggregationtable/${projectId}/aggregationtable`),
                              });
                              return;
                            }

                            this.changeTask(item);
                          }}
                        />
                      </div>
                      <div className="columnWidth">{formatDate(createDate)}</div>
                      <div className="w140 flexRow alignItemsCenter">
                        <UserHead
                          projectId={projectId}
                          size={28}
                          user={{ userHead: creatorAvatar, accountId: createBy }}
                        />
                        <div className="mLeft12 ellipsis flex mRight20">{creatorName}</div>
                      </div>
                    </div>
                  );
                })}
              </ScrollView>
            )}
          </div>
          {!_.isEmpty(list) && (
            <PaginationWrap
              total={count}
              pageIndex={pageIndex}
              pageSize={50}
              onChange={pageIndex => this.setState({ pageIndex }, this.getList)}
            />
          )}
        </div>
      </div>
    );
  }
}
