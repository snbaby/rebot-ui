import { Loading } from 'element-ui';
import '../../static/default/css/framework.css';
// eslint-disable-next-line
import _ from 'lodash';

let needLoadingRequestCount = 0;
let loading;

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)',
  });
}

function endLoading() {
  loading.close();
}

const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount += 1;
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount -= 1;
  if (needLoadingRequestCount === 0) {
    _.debounce(tryCloseLoading, 300)();
  }
}
