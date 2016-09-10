# Why
We want to add `react-lite` support but we don't want to eject!  
so we will hack `react-scripts` by inject our script into `webpack` config without eject.

# How to use.
### Download to your root prject that already init react-scripts
```shell
$ curl -O https://github.com/katopz/webpack-mod/raw/master/inject.js
```

### Inject production
```shell
$ node inject react-lite prod
```

### Inject development
```shell
$ node inject react-lite dev
```

### Uninject production
```shell
$ node inject react-lite prod -u
```

### Uninject development
```shell
$ node inject react-lite dev -u
```