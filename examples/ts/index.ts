import Constants from "@sacloud/constants";

console.log("Based libsacloud version", Constants.Meta.Version);

console.log("Archive OSTypes", Constants.Archive.OSTypes);

/*
# Output Example
$ yarn start

Based libsacloud version 2.1.2

Archive OSTypes {
  CentOS: 'centos',
  CentOS6: 'centos6',
  CentOS7: 'centos7',
  CentOS8: 'centos8',
  ...
}
 */
