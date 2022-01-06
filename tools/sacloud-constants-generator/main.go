// Copyright 2020-2022 The Constants Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"text/template"

	"github.com/sacloud/libsacloud/v2"
	"github.com/sacloud/libsacloud/v2/sacloud"
	"github.com/sacloud/libsacloud/v2/sacloud/ostype"
	"github.com/sacloud/libsacloud/v2/sacloud/types"
)

const usage = `
USAGE:
	sacloud-constants-generator [json | cs | py | ts]
`

func main() {
	if len(os.Args) != 2 {
		log.Print(usage)
		os.Exit(0)
	}

	constants, err := generate()
	if err != nil {
		log.Fatal(err)
	}

	switch os.Args[1] {
	case "json":
		writeJSON(constants)
	case "cs":
	case "py":
	case "ts":
		writeTypeScript(constants)
	default:
		log.Print(usage)
		os.Exit(0)
	}
}
func generate() (map[string]map[string]interface{}, error) {
	caller, err := sacloud.NewClientFromEnv()
	if err != nil {
		return nil, err
	}

	constants := map[string]map[string]interface{}{
		"Archive": {
			"Sizes":         types.ArchiveSizes,
			"OSTypes":       osTypes(),
			"OSTypeQueries": osTypeQueries(),
		},
		"Auth": {
			"Classes":     types.AuthClasses,
			"Methods":     types.AuthMethods,
			"Penalties":   types.OperationPenalties,
			"Permissions": types.Permissions,
		},
		"Backup": {
			"SpanTypes": types.BackupSpanTypes,
			"Weekdays":  types.BackupSpanWeekdays,
		},
		"Common": {
			"Availabilities":  types.Availabilities,
			"InstanceStatus":  types.ServerInstanceStatuses,
			"Scopes":          types.Scopes,
			"APIRoot":         sacloud.SakuraCloudAPIRoot,
			"APITokenEnvKey":  sacloud.APIAccessTokenEnvKey,
			"APISecretEnvKey": sacloud.APIAccessSecretEnvKey,
		},
		"CertificateAuthority": {
			"IssuanceMethods": types.CertificateAuthorityIssuanceMethods,
		},
		"ContainerRegistry": {
			"AccessLevel": types.ContainerRegistryAccessLevels,
			"Permissions": types.ContainerRegistryPermissions,
		},
		"Database": {
			"Plans":             types.DatabasePlans,
			"PlanNames":         types.DatabasePlanNameMap,
			"ReplicationModels": types.DatabaseReplicationModels,
			"Versions":          []*types.RDBMSVersion{types.RDBMSVersions[types.RDBMSTypesPostgreSQL], types.RDBMSVersions[types.RDBMSTypesMariaDB]},
			"Types": map[string]interface{}{
				"PostgreSQL": types.RDBMSTypesPostgreSQL,
				"MariaDB":    types.RDBMSTypesMariaDB,
			},
		},
		"Disk": {
			"Connections": types.DiskConnections,
			"Plans":       types.DiskPlans,
			"PlanNames":   types.DiskPlanNameMap,
			"Sizes":       diskPlans(caller),
		},
		"DNS": {
			"RecordTypes": types.DNSRecordTypes,
		},
		"GSLB": {
			"HealthCheckProtocols": types.GSLBHealthCheckProtocols,
		},
		"Internet": {
			"BandWidths": types.InternetBandWidths,
		},
		"LoadBalancer": {
			"HealthCheckProtocols": types.LoadBalancerHealthCheckProtocols,
			"Plans":                types.LoadBalancerPlans,
			"PlanNames":            types.LoadBalancerPlanNameMap,
		},
		"Meta": {
			"Version": libsacloud.Version,
		},
		"NFS": {
			"Plans":     types.NFSPlans,
			"PlanNames": types.NFSPlanNameMap,
			"Sizes":     nfsSizes(),
		},
		"Note": {
			"Classes": types.NoteClassStrings,
		},
		"PacketFilter": {
			"Actions":   types.Actions,
			"Protocols": types.Protocols,
		},
		"PrivateHost": {
			"Classes": types.PrivateHostClasses,
		},
		"ProxyLB": {
			"BindModes":            types.ProxyLBProxyModes,
			"HealthCheckProtocols": types.ProxyLBProtocols,
			"Plans":                types.ProxyLBPlans,
			"Regions":              types.ProxyLBRegions,
			"Rule": map[string]interface{}{
				"FixedStatusCodes":    types.ProxyLBFixedStatusCodes,
				"FixedContentTypes":   types.ProxyLBFixedContentTypes,
				"RedirectStatusCodes": types.ProxyLBRedirectStatusCodes,
				"Actions":             types.ProxyLBRuleActions,
			},
		},
		"SIM": {
			"NetworkOperators": types.SIMOperators,
		},
		"SimpleMonitor": {
			"HealthCheckProtocols": types.SimpleMonitorProtocols,
			"HealthCheckFTPS":      types.SimpleMonitorFTPSValues,
			"HealthStatus":         types.SimpleMonitorHealth,
		},
		"Server": {
			"Commitments":      types.Commitments,
			"InterfaceDrivers": types.InterfaceDrivers,
			"PlanGeneration":   types.PlanGenerations,
			"SpecialTags":      types.SpecialTags,
			"Plans":            serverPlans(caller),
		},
		"VPCRouter": {
			"FirewallProtocols":    types.VPCRouterFirewallProtocols,
			"PortForwardProtocols": types.VPCRouterPortForwardingProtocols,
			"Plans":                types.VPCRouterPlans,
			"PlanNames":            types.VPCRouterPlanNameMap,
		},
		"WebAccel": {
			"DomainTypes": types.WebAccelDomainTypes,
			"Status":      types.WebAccelStatus,
		},
		"Zone": {
			"Names": types.ZoneNames,
			"IDs":   types.ZoneIDs,
		},
	}

	return constants, nil
}

func serverPlans(caller sacloud.APICaller) []interface{} {
	var results []interface{}
	type plan struct {
		Name       string
		CPU        int
		MemoryMB   int
		MemoryGB   int
		Commitment types.ECommitment
		Zone       string
	}
	for _, zone := range types.ZoneNames {
		plans, err := sacloud.NewServerPlanOp(caller).Find(context.Background(), zone, nil)
		if err != nil {
			log.Fatal(err)
		}
		for _, p := range plans.ServerPlans {
			if !p.Availability.IsAvailable() || p.Generation != types.PlanGenerations.G200 {
				continue
			}
			results = append(results, &plan{
				Name:       p.Name,
				CPU:        p.CPU,
				MemoryMB:   p.MemoryMB,
				MemoryGB:   p.GetMemoryGB(),
				Commitment: p.Commitment,
				Zone:       zone,
			})
		}
	}
	return results
}

func diskPlans(caller sacloud.APICaller) []interface{} {
	type plan struct {
		PlanID        types.ID
		Name          string
		DisplaySize   int
		DisplaySuffix string
		SizeMB        int
		SizeGB        int
		Zone          string
	}
	var results []interface{}
	for _, zone := range types.ZoneNames {
		plans, err := sacloud.NewDiskPlanOp(caller).Find(context.Background(), zone, nil)
		if err != nil {
			log.Fatal(err)
		}
		for _, p := range plans.DiskPlans {
			if !p.Availability.IsAvailable() {
				continue
			}
			for _, s := range p.Size {
				results = append(results, &plan{
					PlanID:        p.ID,
					Name:          p.Name,
					DisplaySize:   s.DisplaySize,
					DisplaySuffix: s.DisplaySuffix,
					SizeMB:        s.SizeMB,
					SizeGB:        s.GetSizeGB(),
					Zone:          zone,
				})
			}
		}
	}
	return results
}

func nfsSizes() []interface{} {
	type size struct {
		PlanID types.ID
		Size   types.ENFSSize
	}
	return []interface{}{
		&size{PlanID: types.NFSPlans.HDD, Size: types.NFSHDDSizes.Size100GB},
		&size{PlanID: types.NFSPlans.HDD, Size: types.NFSHDDSizes.Size500GB},
		&size{PlanID: types.NFSPlans.HDD, Size: types.NFSHDDSizes.Size1TB},
		&size{PlanID: types.NFSPlans.HDD, Size: types.NFSHDDSizes.Size2TB},
		&size{PlanID: types.NFSPlans.HDD, Size: types.NFSHDDSizes.Size4TB},
		&size{PlanID: types.NFSPlans.HDD, Size: types.NFSHDDSizes.Size8TB},
		&size{PlanID: types.NFSPlans.SSD, Size: types.NFSSSDSizes.Size20GB},
		&size{PlanID: types.NFSPlans.SSD, Size: types.NFSSSDSizes.Size100GB},
		&size{PlanID: types.NFSPlans.SSD, Size: types.NFSSSDSizes.Size500GB},
		&size{PlanID: types.NFSPlans.SSD, Size: types.NFSSSDSizes.Size1TB},
		&size{PlanID: types.NFSPlans.SSD, Size: types.NFSSSDSizes.Size2TB},
		&size{PlanID: types.NFSPlans.SSD, Size: types.NFSSSDSizes.Size4TB},
	}

}

func osTypes() interface{} {
	var result = map[string]string{}
	for _, key := range ostype.OSTypeShortNames {
		result[ostype.StrToOSType(key).String()] = key
	}
	return result
}

func osTypeQueries() map[string][]interface{} {
	type criteria struct {
		Key   string
		Value interface{}
	}
	var result = map[string][]interface{}{}
	for t, c := range ostype.ArchiveCriteria {
		var queries []interface{}
		for k, v := range c {
			queries = append(queries, &criteria{Key: k.String(), Value: v})
		}
		result[t.String()] = queries
	}
	return result
}

func writeJSON(constants map[string]map[string]interface{}) {
	data, err := json.MarshalIndent(constants, "", "  ")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s", data)
}

const typeScriptTemplate = `import {SakuraCloud} from "./types";

const Constants: SakuraCloud = JSON.parse(` + "`{{.JSON}}`);" + `
export default Constants;`

func writeTypeScript(constants map[string]map[string]interface{}) {
	output, err := execTemplate(typeScriptTemplate, constants)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Print(output)
}

func execTemplate(tmpl string, constants map[string]map[string]interface{}) (string, error) {
	data, err := json.Marshal(constants)
	if err != nil {
		return "", err
	}

	buf := bytes.NewBufferString("")
	t := template.New("t")
	template.Must(t.Parse(tmpl))
	if err := t.Execute(buf, map[string]interface{}{"JSON": string(data)}); err != nil {
		return "", err
	}
	return buf.String(), nil
}
