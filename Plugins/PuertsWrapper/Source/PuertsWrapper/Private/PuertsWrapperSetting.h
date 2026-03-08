#pragma once

#include "Engine/DeveloperSettings.h"
#include "PuertsWrapperSetting.generated.h"

UCLASS(MinimalAPI, config = Puerts, defaultconfig, meta = (DisplayName = "Puerts Wrapper"))
class UPuertsWrapperSetting : public UDeveloperSettings
{
	GENERATED_BODY()

public:
	UPROPERTY(config, EditAnywhere, Category = "PuertsWrapper")
	bool bEnable = false;

	UPROPERTY(config, EditAnywhere, Category = "PuertsWrapper")
	FString JsRootPath = TEXT("JavaScript");

	UPROPERTY(config, EditAnywhere, Category = "PuertsWrapper")
	FString JsEntryFile;

	UPROPERTY(config, EditAnywhere, Category = "PuertsWrapper")
	int JsDebugPort = 8080;

	UPROPERTY(config, EditAnywhere, Category = "PuertsWrapper")
	bool bWaitDebugger = false;

public:
	virtual FName GetCategoryName() const override;
};
