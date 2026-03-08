// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Subsystems/GameInstanceSubsystem.h"
#include "TsWrapperSubsystem.generated.h"

/**
 * 
 */
UCLASS()
class PUERTSWRAPPER_API UTsWrapperSubsystem final : public UGameInstanceSubsystem
{
	GENERATED_BODY()
	
public:
	void CreateJsVM();
};
