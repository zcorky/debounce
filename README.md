# debounce

[![NPM version](https://img.shields.io/npm/v/@zcorky/debounce.svg?style=flat)](https://www.npmjs.com/package/@zcorky/debounce)
[![Coverage Status](https://img.shields.io/coveralls/zcorky/debounce.svg?style=flat)](https://coveralls.io/r/zcorky/debounce)
[![Dependencies](https://david-dm.org/@zcorky/debounce/status.svg)](https://david-dm.org/@zcorky/debounce)
[![Build Status](https://travis-ci.com/zcorky/debounce.svg?branch=master)](https://travis-ci.com/zcorky/debounce)
![license](https://img.shields.io/github/license/zcorky/debounce.svg)
[![issues](https://img.shields.io/github/issues/zcorky/debounce.svg)](https://github.com/zcorky/debounce/issues)

> Do action after a repeated action has completed.

### Install

```
$ npm install @zcorky/debounce
```

### Usage

```javascript
// import
import debounce from '@zcorky/debounce';

// debounce
function resize(e) {
  console.log('width', window.innerWidth);
  console.log('height', window.innerHeight);
}

window.onresize = debounce(resize, 200);
```

### Relatived
* [debounce](https://github.com/component/debounce)
* [blog: debounce](https://github.com/mqyqingfeng/Blog/issues/22)
