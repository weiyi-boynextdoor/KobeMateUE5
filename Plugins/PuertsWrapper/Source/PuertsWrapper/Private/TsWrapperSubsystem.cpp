#include "TsWrapperSubsystem.h"
#include "PuertsWrapperSetting.h"

void UTsWrapperSubsystem::CreateJsVM()
{
	UPuertsWrapperSetting& Settings = *GetMutableDefault<UPuertsWrapperSetting>();
	if (Settings.JsDebugPort <= 0)
	{
		JsEnv = MakeShared<puerts::FJsEnv>(Settings.JsRootPath);
	}
	else
	{
		JsEnv = MakeShared<puerts::FJsEnv>(std::make_unique<puerts::DefaultJSModuleLoader>(Settings.JsRootPath), std::make_shared<puerts::FDefaultLogger>(), Settings.JsDebugPort);
		if (Settings.WaitDebugger)
		{
			JsEnv->WaitDebugger();
		}

		if (!Settings.JsEntryFile.IsEmpty())
		{
			JsEnv->Start(Settings.JsEntryFile);
		}
	}
}