#include "TsWrapperSubsystem.h"
#include "PuertsWrapperSetting.h"

void UTsWrapperSubsystem::Initialize(FSubsystemCollectionBase& Collection)
{
	UPuertsWrapperSetting& Settings = *GetMutableDefault<UPuertsWrapperSetting>();
	if (Settings.bEnable)
	{
		CreateVM();
	}
}

void UTsWrapperSubsystem::Deinitialize()
{
	JsEnv.Reset();
}

void UTsWrapperSubsystem::CreateVM()
{
	UPuertsWrapperSetting& Settings = *GetMutableDefault<UPuertsWrapperSetting>();
	if (Settings.JsDebugPort <= 0)
	{
		JsEnv = MakeShared<puerts::FJsEnv>(Settings.JsRootPath);
	}
	else
	{
		JsEnv = MakeShared<puerts::FJsEnv>(std::make_unique<puerts::DefaultJSModuleLoader>(Settings.JsRootPath), std::make_shared<puerts::FDefaultLogger>(), Settings.JsDebugPort);
		if (Settings.bWaitDebugger)
		{
			JsEnv->WaitDebugger();
		}

		if (!Settings.JsEntryFile.IsEmpty())
		{
			TArray<TPair<FString, UObject*>> Arguments;
			Arguments.Add(TPair<FString, UObject*>(TEXT("GameInstance"), GetGameInstance()));
			JsEnv->Start(Settings.JsEntryFile, Arguments);
		}
	}
}
