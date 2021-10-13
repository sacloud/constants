#
# Copyright 2020 The Constants Authors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# Parameters
VERSION ?= dev

# constants
AUTHOR          ?="The Constants Authors"
COPYRIGHT_YEAR  ?="2020-2021"
COPYRIGHT_FILES ?=$$(find . -name "*.go" -print | grep -v "/vendor/")

default: all

.PHONY: all
all: fmt set-license goimports json ts

.PHONY: tests
test:
	go test ./... $(TESTARGS) -v -timeout=120m -parallel=8 ;

.PHONY: tools
tools:
	go install golang.org/x/tools/cmd/goimports@latest
	go install golang.org/x/tools/cmd/stringer@latest
	go install github.com/sacloud/addlicense@latest
	go install github.com/client9/misspell/cmd/misspell@latest
	curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/v1.42.1/install.sh | sh -s -- -b $$(go env GOPATH)/bin v1.42.1
	npm install -g quicktype

.PHONY: clean
clean:
	rm -f constants.json
	rm -f nodejs/*.bak
	rm -rf nodejs/bin

.PHONY: output
output: goimports set-license
	@(cd tools/sacloud-constants-generator; go run . json)

.PHONY: json
json: goimports set-license
	@(cd tools/sacloud-constants-generator; go run . json > ../../constants.json)

.PHONY: ts
ts: json
	@echo "Building @sacloud/constants@${VERSION}"
	@quicktype -l ts -o nodejs/types.ts -t SakuraCloud --just-types --acronym-style original --no-enums constants.json
	@(cd tools/sacloud-constants-generator; go run . ts > ../../nodejs/constants.ts)
	cd nodejs && rm -f *.bak && rm -rf nodejs/bin && \
    	yarn install && \
    	yarn run tsc && \
    	cp ../README.md ../LICENSE package.json yarn.lock ./bin/ && \
    	sed -i.bak "s/\$${VERSION}/$(VERSION)/g" ./bin/package.json

#.PHONY: dotnet
#ts: json
#	@quicktype -l ts -o nodejs/types.ts -t SakuraCloud --just-types --acronym-style original --no-enums constants.json
#	@go run tools/sacloud-constants-generator/main.go ts > nodejs/constants.ts
#

.PHONY: goimports
goimports: fmt
	@goimports -l -w .

.PHONY: fmt
fmt:
	@find . -name '*.go' | grep -v vendor | xargs gofmt -s -w

.PHONY: godoc
godoc:
	@echo "URL: http://localhost:6060/pkg/github.com/sacloud/libsacloud/"; \
	docker run -it --rm -v $$PWD:/go/src/github.com/sacloud/libsacloud -p 6060:6060 golang:1.12 godoc -http=:6060

.PHONY: lint
lint:
	@golangci-lint run ./...

.PHONY: set-license
set-license:
	@addlicense -c $(AUTHOR) -y $(COPYRIGHT_YEAR) $(COPYRIGHT_FILES)

.PHONY: publish_npm
publish_npm:
	cd nodejs/bin && \
	npm publish --access public
