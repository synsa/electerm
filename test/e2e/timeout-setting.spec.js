/**
 * timeout setting
 * need TEST_HOST TEST_PASS TEST_USER env set
 */

const { Application } = require('spectron')
const electronPath = require('electron')
const {resolve} = require('path')
const {expect} = require('chai')
const cwd = process.cwd()
const delay = require('./common/wait')
const {log} = console
const {
  TEST_HOST,
  TEST_PASS,
  TEST_USER
} = require('./common/env')

describe('timeout setting', function () {
  this.timeout(100000)

  beforeEach(async function() {
    this.app = new Application({
      path: electronPath,
      webdriverOptions: {
        deprecationWarnings: false
      },
      args: [resolve(cwd, 'work/app')]
    })
    return this.app.start()
  })

  afterEach(function() {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('timeout setting works', async function() {
    const {client} = this.app

    await client.waitUntilWindowLoaded()

    log('open setting')
    await client.execute(function() {
      document.querySelector('.btns .anticon-setting').click()
    })
    await delay(1500)

    client.setValue(
      '.ant-modal .ant-tabs-tabpane-active .timeout-desc .ant-input-number-input',
      100
    )
    await delay(150)
    await client.execute(function() {
      document.querySelector('.ant-modal .ant-modal-close').click()
    })
    await delay(900)
    await client.click('.btns .anticon-edit')
    await delay(500)
    await client.setValue('#host', TEST_HOST)
    await client.setValue('#username', TEST_USER)
    await client.setValue('#password', TEST_PASS)
    await client.execute(function() {
      document.querySelector('.ant-modal .ant-tabs-tabpane-active .ant-btn-primary').click()
    })
    await delay(500)
    let txt = await client.getText('.ant-notification .ant-notification-notice-message div')
    expect(txt.includes('Timed out')).equal(true)
    await client.execute(function() {
      document.querySelector('.btns .anticon-setting').click()
    })
    await delay(1500)
    client.setValue(
      '.ant-modal .ant-tabs-tabpane-active .timeout-desc .ant-input-number-input',
      50000
    )
    await client.execute(function() {
      document.querySelector('.ant-modal .ant-modal-close').click()
    })
  })

})
