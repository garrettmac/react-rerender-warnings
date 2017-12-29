





![MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![github](https://img.shields.io/github/stars/garrettmac/react-rerender-warnings.svg)
![react-rerender-warnings issues](https://img.shields.io/issuestats/p/github/garrettmac/react-rerender-warnings.svg)
![github](https://img.shields.io/github/forks/garrettmac/react-rerender-warnings.svg)
![twitter](https://img.shields.io/twitter/url/https/github.com/garrettmac/react-rerender-warnings.svg)
![react-rerender-warnings](https://badges.gitter.im/garrettmac/react-rerender-warnings.svg)

# react-rerender-warnings


Helps you catch avoidable rerender with rerender warnings - don't update if you dont have to
## Installation

- Install `react-rerender-warnings` first

```bash
yarn add react-rerender-warnings
```



## Setup 


Add this anywhere in your app and you're done! You'll now get beautiful logs of prop and state changes that could have been avioded throught your entire app.

NOTE: Supports react 16 and fiber. No support for ES5's createClass.


```jsx

import React from 'react';
import ReRenderWarnings from 'react-rerender-warnings';


process.env.NODE_ENV !== 'production' &&  ReRenderWarnings(React);


```
## Done!

# Contributing
Please share what you got and make a pr!
