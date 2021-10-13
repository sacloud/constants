export interface SakuraCloud {
    Archive:              Archive;
    Auth:                 Auth;
    Backup:               Backup;
    CertificateAuthority: CertificateAuthority;
    Common:               Common;
    ContainerRegistry:    ContainerRegistry;
    DNS:                  DNS;
    Database:             Database;
    Disk:                 Disk;
    GSLB:                 Gslb;
    Internet:             Internet;
    LoadBalancer:         LoadBalancer;
    Meta:                 Meta;
    NFS:                  NFS;
    Note:                 Note;
    PacketFilter:         PacketFilter;
    PrivateHost:          Note;
    ProxyLB:              ProxyLB;
    SIM:                  Sim;
    Server:               Server;
    SimpleMonitor:        SimpleMonitor;
    VPCRouter:            VPCRouter;
    WebAccel:             WebAccel;
    Zone:                 Zone;
}

export interface Archive {
    OSTypeQueries: OSTypeQueries;
    OSTypes:       OSTypes;
    Sizes:         number[];
}

export interface OSTypeQueries {
    AlmaLinux:                           AlmaLinux[];
    CentOS:                              AlmaLinux[];
    CentOS7:                             AlmaLinux[];
    CentOS8:                             AlmaLinux[];
    CentOS8Stream:                       AlmaLinux[];
    CoreOS:                              AlmaLinux[];
    Debian:                              AlmaLinux[];
    Debian10:                            AlmaLinux[];
    Debian11:                            AlmaLinux[];
    FreeBSD:                             AlmaLinux[];
    K3OS:                                AlmaLinux[];
    Kusanagi:                            AlmaLinux[];
    RancherOS:                           AlmaLinux[];
    RockyLinux:                          AlmaLinux[];
    Ubuntu:                              AlmaLinux[];
    Ubuntu1804:                          AlmaLinux[];
    Ubuntu2004:                          AlmaLinux[];
    Windows2016:                         LivingstoneSouthernWhiteFacedOwl[];
    Windows2016RDS:                      LivingstoneSouthernWhiteFacedOwl[];
    Windows2016RDSOffice:                LivingstoneSouthernWhiteFacedOwl[];
    Windows2016SQLServer2017Enterprise:  LivingstoneSouthernWhiteFacedOwl[];
    Windows2016SQLServer2017Standard:    LivingstoneSouthernWhiteFacedOwl[];
    Windows2016SQLServer2017StandardAll: LivingstoneSouthernWhiteFacedOwl[];
    Windows2016SQLServerStandard:        LivingstoneSouthernWhiteFacedOwl[];
    Windows2016SQLServerStandardAll:     LivingstoneSouthernWhiteFacedOwl[];
    Windows2016SQLServerWeb:             LivingstoneSouthernWhiteFacedOwl[];
    Windows2019:                         LivingstoneSouthernWhiteFacedOwl[];
    Windows2019RDS:                      LivingstoneSouthernWhiteFacedOwl[];
    Windows2019RDSOffice2019:            LivingstoneSouthernWhiteFacedOwl[];
    Windows2019SQLServer2017Enterprise:  LivingstoneSouthernWhiteFacedOwl[];
    Windows2019SQLServer2017Standard:    LivingstoneSouthernWhiteFacedOwl[];
    Windows2019SQLServer2017StandardAll: LivingstoneSouthernWhiteFacedOwl[];
    Windows2019SQLServer2017Web:         LivingstoneSouthernWhiteFacedOwl[];
    Windows2019SQLServer2019Enterprise:  LivingstoneSouthernWhiteFacedOwl[];
    Windows2019SQLServer2019Standard:    LivingstoneSouthernWhiteFacedOwl[];
    Windows2019SQLServer2019StandardAll: LivingstoneSouthernWhiteFacedOwl[];
    Windows2019SQLServer2019Web:         LivingstoneSouthernWhiteFacedOwl[];
}

export interface AlmaLinux {
    Key:   string;
    Value: Array<string[]>;
}

export interface LivingstoneSouthernWhiteFacedOwl {
    Key:   string;
    Value: Array<string[] | string>;
}

export interface OSTypes {
    AlmaLinux:                           string;
    CentOS:                              string;
    CentOS7:                             string;
    CentOS8:                             string;
    CentOS8Stream:                       string;
    CoreOS:                              string;
    Debian:                              string;
    Debian10:                            string;
    Debian11:                            string;
    FreeBSD:                             string;
    K3OS:                                string;
    Kusanagi:                            string;
    RancherOS:                           string;
    RockyLinux:                          string;
    Ubuntu:                              string;
    Ubuntu1804:                          string;
    Ubuntu2004:                          string;
    Windows2016:                         string;
    Windows2016RDS:                      string;
    Windows2016RDSOffice:                string;
    Windows2016SQLServer2017Enterprise:  string;
    Windows2016SQLServer2017Standard:    string;
    Windows2016SQLServer2017StandardAll: string;
    Windows2016SQLServerStandard:        string;
    Windows2016SQLServerStandardAll:     string;
    Windows2016SQLServerWeb:             string;
    Windows2019:                         string;
    Windows2019RDS:                      string;
    Windows2019RDSOffice2019:            string;
    Windows2019SQLServer2017Enterprise:  string;
    Windows2019SQLServer2017Standard:    string;
    Windows2019SQLServer2017StandardAll: string;
    Windows2019SQLServer2017Web:         string;
    Windows2019SQLServer2019Enterprise:  string;
    Windows2019SQLServer2019Standard:    string;
    Windows2019SQLServer2019StandardAll: string;
    Windows2019SQLServer2019Web:         string;
}

export interface Auth {
    Classes:     Classes;
    Methods:     Methods;
    Penalties:   Penalties;
    Permissions: AuthPermissions;
}

export interface Classes {
    Unknown: string;
    Account: string;
}

export interface Methods {
    Unknown: string;
    APIKey:  string;
}

export interface Penalties {
    Unknown: string;
    None:    string;
}

export interface AuthPermissions {
    Unknown: string;
    Create:  string;
    Arrange: string;
    Power:   string;
    View:    string;
}

export interface Backup {
    SpanTypes: SpanTypes;
    Weekdays:  Weekdays;
}

export interface SpanTypes {
    Weekdays: string;
}

export interface Weekdays {
    Sunday:    string;
    Monday:    string;
    Tuesday:   string;
    Wednesday: string;
    Thursday:  string;
    Friday:    string;
    Saturday:  string;
}

export interface CertificateAuthority {
    IssuanceMethods: IssuanceMethods;
}

export interface IssuanceMethods {
    URL:       string;
    EMail:     string;
    PublicKey: string;
    CSR:       string;
}

export interface Common {
    APIRoot:         string;
    APISecretEnvKey: string;
    APITokenEnvKey:  string;
    Availabilities:  Availabilities;
    InstanceStatus:  InstanceStatus;
    Scopes:          Scopes;
}

export interface Availabilities {
    Unknown:      string;
    Available:    string;
    Uploading:    string;
    Failed:       string;
    Migrating:    string;
    Transferring: string;
    Discontinued: string;
}

export interface InstanceStatus {
    Unknown:  string;
    Up:       string;
    Cleaning: string;
    Down:     string;
}

export interface Scopes {
    Shared: string;
    User:   string;
}

export interface ContainerRegistry {
    AccessLevel: AccessLevel;
    Permissions: ContainerRegistryPermissions;
}

export interface AccessLevel {
    ReadWrite: string;
    ReadOnly:  string;
    None:      string;
}

export interface ContainerRegistryPermissions {
    All:       string;
    ReadWrite: string;
    ReadOnly:  string;
}

export interface DNS {
    RecordTypes: RecordTypes;
}

export interface RecordTypes {
    A:     string;
    AAAA:  string;
    ALIAS: string;
    CNAME: string;
    NS:    string;
    MX:    string;
    TXT:   string;
    SRV:   string;
    CAA:   string;
    PTR:   string;
}

export interface Database {
    PlanNames:         { [key: string]: string };
    Plans:             { [key: string]: number };
    ReplicationModels: ReplicationModels;
    Types:             Types;
    Versions:          Version[];
}

export interface ReplicationModels {
    MasterSlave:  string;
    AsyncReplica: string;
}

export interface Types {
    MariaDB:    string;
    PostgreSQL: string;
}

export interface Version {
    Name:     string;
    Version:  string;
    Revision: string;
}

export interface Disk {
    Connections: Connections;
    PlanNames:   { [key: string]: string };
    Plans:       DiskPlans;
    Sizes:       DiskSize[];
}

export interface Connections {
    VirtIO: string;
    IDE:    string;
}

export interface DiskPlans {
    SSD: number;
    HDD: number;
}

export interface DiskSize {
    PlanID:        number;
    Name:          string;
    DisplaySize:   number;
    DisplaySuffix: string;
    SizeMB:        number;
    SizeGB:        number;
    Zone:          string;
}

export interface Gslb {
    HealthCheckProtocols: HealthCheckProtocols;
}

export interface HealthCheckProtocols {
    HTTP:  string;
    HTTPS: string;
    TCP:   string;
    Ping?: string;
}

export interface Internet {
    BandWidths: number[];
}

export interface LoadBalancer {
    HealthCheckProtocols: HealthCheckProtocols;
    PlanNames:            { [key: string]: string };
    Plans:                LoadBalancerPlans;
}

export interface LoadBalancerPlans {
    Standard: number;
    HighSpec: number;
}

export interface Meta {
    Version: string;
}

export interface NFS {
    PlanNames: { [key: string]: string };
    Plans:     DiskPlans;
    Sizes:     NFSSize[];
}

export interface NFSSize {
    PlanID: number;
    Size:   number;
}

export interface Note {
    Classes: string[];
}

export interface PacketFilter {
    Actions:   PacketFilterActions;
    Protocols: Protocols;
}

export interface PacketFilterActions {
    Allow: string;
    Deny:  string;
}

export interface Protocols {
    HTTP:     string;
    HTTPS:    string;
    TCP:      string;
    UDP:      string;
    ICMP:     string;
    Fragment: string;
    IP:       string;
}

export interface ProxyLB {
    BindModes:            HealthCheckProtocols;
    HealthCheckProtocols: PurpleHealthCheckProtocols;
    Plans:                { [key: string]: number };
    Regions:              Regions;
    Rule:                 Rule;
}

export interface PurpleHealthCheckProtocols {
    HTTP: string;
    TCP:  string;
}

export interface Regions {
    TK1:     string;
    IS1:     string;
    Anycast: string;
}

export interface Rule {
    Actions:             RuleActions;
    FixedContentTypes:   FixedContentTypes;
    FixedStatusCodes:    FixedStatusCodes;
    RedirectStatusCodes: RedirectStatusCodes;
}

export interface RuleActions {
    Forward:  string;
    Redirect: string;
    Fixed:    string;
}

export interface FixedContentTypes {
    Plain:      string;
    HTML:       string;
    JavaScript: string;
    JSON:       string;
}

export interface FixedStatusCodes {
    OK:                 number;
    Forbidden:          number;
    ServiceUnavailable: number;
}

export interface RedirectStatusCodes {
    MovedPermanently: number;
    Found:            number;
}

export interface Sim {
    NetworkOperators: NetworkOperators;
}

export interface NetworkOperators {
    KDDI:     string;
    Docomo:   string;
    SoftBank: string;
}

export interface Server {
    Commitments:      Commitments;
    InterfaceDrivers: InterfaceDrivers;
    PlanGeneration:   PlanGeneration;
    Plans:            Plan[];
    SpecialTags:      SpecialTags;
}

export interface Commitments {
    Unknown:      string;
    Standard:     string;
    DedicatedCPU: string;
}

export interface InterfaceDrivers {
    VirtIO: string;
    E1000:  string;
}

export interface PlanGeneration {
    Default: number;
    G100:    number;
    G200:    number;
}

export interface Plan {
    Name:       string;
    CPU:        number;
    MemoryMB:   number;
    MemoryGB:   number;
    Commitment: string;
    Zone:       string;
}

export interface SpecialTags {
    GroupA:      string;
    GroupB:      string;
    GroupC:      string;
    GroupD:      string;
    AutoReboot:  string;
    KeyboardUS:  string;
    BootCDROM:   string;
    BootNetwork: string;
    CPUTopology: string;
}

export interface SimpleMonitor {
    HealthCheckFTPS:      HealthCheckFTPS;
    HealthCheckProtocols: SimpleMonitorHealthCheckProtocols;
    HealthStatus:         HealthStatus;
}

export interface HealthCheckFTPS {
    Default:  string;
    Implicit: string;
    Explicit: string;
}

export interface SimpleMonitorHealthCheckProtocols {
    HTTP:           string;
    HTTPS:          string;
    Ping:           string;
    TCP:            string;
    DNS:            string;
    SSH:            string;
    SMTP:           string;
    POP3:           string;
    SNMP:           string;
    SSLCertificate: string;
    FTP:            string;
}

export interface HealthStatus {
    Up:   string;
    Down: string;
}

export interface VPCRouter {
    FirewallProtocols:    FirewallProtocols;
    PlanNames:            { [key: string]: string };
    Plans:                VPCRouterPlans;
    PortForwardProtocols: PortForwardProtocols;
}

export interface FirewallProtocols {
    TCP:  string;
    UDP:  string;
    ICMP: string;
    IP:   string;
}

export interface VPCRouterPlans {
    Standard:     number;
    Premium:      number;
    HighSpec:     number;
    HighSpec4000: number;
}

export interface PortForwardProtocols {
    TCP: string;
    UDP: string;
}

export interface WebAccel {
    DomainTypes: DomainTypes;
    Status:      Status;
}

export interface DomainTypes {
    Own:       string;
    SubDomain: string;
}

export interface Status {
    Enabled:  string;
    Disabled: string;
}

export interface Zone {
    IDs:   { [key: string]: number };
    Names: string[];
}
