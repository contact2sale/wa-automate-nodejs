import * as path from 'path';
var uniq = require('lodash.uniq');
const fs = require('fs');
var pkg = require('../../package.json');
const hasha = require('hasha');
const currentHash = '8d3a09fe3156605ac2cf55ce920bbbab'

export async function checkWAPIHash(){
  return true;
}

export async function integrityCheck(waPage, notifier, spinner, debugInfo) {
  return true;
}

function catchRequests(page, reqs = 0) {
  const started = () => (reqs = reqs + 1);
  const ended = () => (reqs = reqs - 1);
  page.on('request', started);
  page.on('requestfailed', ended);
  page.on('requestfinished', ended);
  return async (timeout = 5000, success = false) => {
    while (true) {
      if (reqs < 1) break;
      await new Promise((yay) => setTimeout(yay, 100));
      if ((timeout = timeout - 100) < 0) {
        throw new Error('Timeout');
      }
    }
    page.off('request', started);
    page.off('requestfailed', ended);
    page.off('requestfinished', ended);
  };
}