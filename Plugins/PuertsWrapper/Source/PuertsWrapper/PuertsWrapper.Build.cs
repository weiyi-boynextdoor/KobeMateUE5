// Copyright Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool;

public class PuertsWrapper : ModuleRules
{
	public PuertsWrapper(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = ModuleRules.PCHUsageMode.UseExplicitOrSharedPCHs;			
		
		PublicDependencyModuleNames.AddRange(
			new string[]
			{
				"Puerts", "Core", "CoreUObject", "Engine"
			}
		);
	}
}
