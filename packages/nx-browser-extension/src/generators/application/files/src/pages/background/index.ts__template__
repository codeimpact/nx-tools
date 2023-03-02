import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(async (msg, sender) => {
  console.log('on message', msg, sender);
});

browser.runtime.onInstalled.addListener(() => {
  console.log('on launched');
});
