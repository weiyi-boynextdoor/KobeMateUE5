// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Subsystems/GameInstanceSubsystem.h"
#include "IWebSocket.h"
#include "WebsocketSubsystem.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnWebSocketMessageReceived, const FString&, Message);
DECLARE_DYNAMIC_MULTICAST_DELEGATE(FOnWebSocketConnected);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnWebSocketConnectionError, const FString&, Error);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_ThreeParams(FOnWebSocketClosed, int32, StatusCode, const FString&, Reason, bool, bWasClean);

UCLASS()
class KOBEMATE_API UWebsocketSubsystem : public UGameInstanceSubsystem
{
	GENERATED_BODY()

public:
	virtual void Initialize(FSubsystemCollectionBase& Collection) override;
	virtual void Deinitialize() override;

	UPROPERTY(BlueprintAssignable, Category = "WebSocket")
	FOnWebSocketMessageReceived OnMessageReceived;

	UPROPERTY(BlueprintAssignable, Category = "WebSocket")
	FOnWebSocketConnected OnConnected;

	UPROPERTY(BlueprintAssignable, Category = "WebSocket")
	FOnWebSocketConnectionError OnConnectionError;

	UPROPERTY(BlueprintAssignable, Category = "WebSocket")
	FOnWebSocketClosed OnClosed;

	UFUNCTION(BlueprintCallable, Category = "Websocket")
	void Connect(const FString& Url);

	UFUNCTION(BlueprintCallable, Category = "Websocket")
	void Close();

	UFUNCTION(BlueprintAuthorityOnly, BlueprintCallable, Category = "Websocket")
	bool SendMessage(const FString& Message);

private:
	TSharedPtr<IWebSocket> Socket;
};
