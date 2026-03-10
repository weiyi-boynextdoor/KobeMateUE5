// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Sound/SoundWaveProcedural.h"
#include "KobeSoundWaveProcedural.generated.h"

/**
 * 
 */
UCLASS()
class KOBEMATE_API UKobeSoundWaveProcedural : public USoundWaveProcedural
{
	GENERATED_BODY()
	
public:
	UFUNCTION(BlueprintCallable, Category = "Audio")
	void QueueAudioHexData(const FString& HexData);	
};
