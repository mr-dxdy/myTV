TIZEN_PATH ?= /c/tizen-studio
TIZEN = $(TIZEN_PATH)/tools/ide/bin/tizen.bat
SDB = $(TIZEN_PATH)/tools/sdb.exe
STAGING_CERT ?= german
PRODUCTION_CERT ?= samsung_s7
DEVICE_NAME ?= "T-samsung-5.0-x86"
BUILD_RESULT_PATH = "./dist/myTV/.buildResult/"

devices:
	$(SDB) devices

tests:
	npm run test

clean-tizen-project:
	rm -rf $(BUILD_RESULT_PATH)

build-tizen-project: clean-tizen-project build
	$(TIZEN) build-web -- "./dist/myTV/"

create-staging-wgt:
	$(TIZEN) package -s $(STAGING_CERT) -t wgt -- $(BUILD_RESULT_PATH)

create-production-wgt:
	$(TIZEN) package -s $(PRODUCTION_CERT) -t wgt -- $(BUILD_RESULT_PATH)

install-wgt:
	$(TIZEN) install -t $(DEVICE_NAME) --name myTV.wgt -- $(BUILD_RESULT_PATH)

deploy-to-staging: build-tizen-project create-staging-wgt install-wgt

deploy-to-production: build-tizen-project create-production-wgt install-wgt

build:
	npm run build
