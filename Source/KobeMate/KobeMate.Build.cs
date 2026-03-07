// Copyright Epic Games, Inc. All Rights Reserved.

using UnrealBuildTool;

public class KobeMate : ModuleRules
{
	public KobeMate(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

		PublicDependencyModuleNames.AddRange(new string[] {
			"Core",
			"CoreUObject",
			"Engine",
			"InputCore",
			"EnhancedInput",
			"AIModule",
			"StateTreeModule",
			"GameplayStateTreeModule",
			"UMG",
			"Slate"
		});

		PrivateDependencyModuleNames.AddRange(new string[] { });

		PublicIncludePaths.AddRange(new string[] {
			"KobeMate",
			"KobeMate/Variant_Platforming",
			"KobeMate/Variant_Platforming/Animation",
			"KobeMate/Variant_Combat",
			"KobeMate/Variant_Combat/AI",
			"KobeMate/Variant_Combat/Animation",
			"KobeMate/Variant_Combat/Gameplay",
			"KobeMate/Variant_Combat/Interfaces",
			"KobeMate/Variant_Combat/UI",
			"KobeMate/Variant_SideScrolling",
			"KobeMate/Variant_SideScrolling/AI",
			"KobeMate/Variant_SideScrolling/Gameplay",
			"KobeMate/Variant_SideScrolling/Interfaces",
			"KobeMate/Variant_SideScrolling/UI"
		});

		// Uncomment if you are using Slate UI
		// PrivateDependencyModuleNames.AddRange(new string[] { "Slate", "SlateCore" });

		// Uncomment if you are using online features
		// PrivateDependencyModuleNames.Add("OnlineSubsystem");

		// To include OnlineSubsystemSteam, add it to the plugins section in your uproject file with the Enabled attribute set to true
	}
}
