// Fill out your copyright notice in the Description page of Project Settings.


#include "KobeSoundWaveProcedural.h"
#include "Misc/Char.h"

void UKobeSoundWaveProcedural::QueueAudioHexData(const FString& HexData)
{
    TArray<uint8> AudioData;
	AudioData.SetNumUninitialized(HexData.Len() / 2);
	FString::ToHexBlob(HexData, AudioData.GetData(), AudioData.Num());

    QueueAudio(AudioData.GetData(), AudioData.Num());
}
