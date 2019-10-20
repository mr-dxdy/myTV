# My IPTV

My samsung IPTV player + playlist.

## Deploy

``` bash
cp src/js/settings.js.sample src/js/settings.js
vim src/js/settings.js
make deploy-to-production DEVICE_NAME=<your-device-name>
```
## How to get device name?

Example:

![Device name](https://dr1stk14alc8x.cloudfront.net/media/2435/cli_01.png)

Device name is "t-1031-1".
Serial number is "emulator-26101".
