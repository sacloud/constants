# Constants for SAKURA Cloud

The definition of constants for SAKURA Cloud.

## Supported languages

- Node.js -  JavaScript, TypeScript, or any other Node.js compatible language
- Python(planning)
- .NET Core(planning)

If you would like to use Go, please see [Libsacloud](https://github.com/sacloud/libsacloud) project.
The constants on the project are generated by using the Libsacloud.

## Usage

### JavaScript/TypeScript

To use from JavaScript or TypeScript in Node.js, install using either `npm`:

    $ npm install @sacloud/constants

or `yarn`:

    $ yarn add @sacloud/constants

After that you can use the Constants as follows:

```typescript
import Constants from "@sacloud/constants";

console.log("Based libsacloud version", Constants.Meta.Version);
console.log("Archive OSTypes", Constants.Archive.OSTypes);
/*
# Output Example
Based libsacloud version 2.8.2

Archive OSTypes {
  CentOS: 'centos',
  CentOS6: 'centos6',
  CentOS7: 'centos7',
  CentOS8: 'centos8',
  ...
}
 */

``` 

See [constants.json](constants.json) for full constants.

## License

  `libsacloud` Copyright (C) 2016-2021 The Libsacloud Authors.

  This project is published under [Apache 2.0 License](LICENSE).

