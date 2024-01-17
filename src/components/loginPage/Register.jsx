import React from 'react'
import Login from 'ant-design-pro/lib/Login';
import { Alert, Checkbox } from 'antd';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

export default function Register() {
  return (
    <div className="login-warp">
    <Login
      defaultActiveKey={this.state.type}
      onTabChange={this.onTabChange}
      onSubmit={this.onSubmit}
    >
      <Tab key="tab1" tab="Account">
        {this.state.notice && (
          <Alert
            style={{ marginBottom: 24 }}
            message={this.state.notice}
            type="error"
            showIcon
            closable
          />
        )}
        <UserName name="username" />
        <Password name="password" />
      </Tab>
      <Tab key="tab2" tab="Mobile">
        <Mobile name="mobile" />
        <Captcha onGetCaptcha={() => console.log('Get captcha!')} name="captcha" />
      </Tab>
      <div>
        <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>
          Keep me logged in
        </Checkbox>
        <a style={{ float: 'right' }} href="">
          Forgot password
        </a>
      </div>
      <Submit>Login</Submit>
      <div>
        Other login methods
        <span className="icon icon-alipay" />
        <span className="icon icon-taobao" />
        <span className="icon icon-weibo" />
        <a style={{ float: 'right' }} href="">
          Register
        </a>
      </div>
    </Login>
  </div>
  )
}
