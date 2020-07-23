import axios from "axios";
import "nprogress/nprogress.css";
import { notification } from "ant-design-vue";

function request(options) {
  return axios(options)
    .then(res => {
      return res;
    })
    .catch(error => {
      const {
        response: { status, statusText }
      } = error;
      notification.error({
        // eslint-disable-next-line no-unused-vars
        message: h => (
          <div>
            请求错误<span style="color:red">{status}</span>:{options.url}
          </div>
        ),
        description: statusText
      });
      // 出错不会继续往下走
      return Promise.reject(error);
    });
}

export default request;
