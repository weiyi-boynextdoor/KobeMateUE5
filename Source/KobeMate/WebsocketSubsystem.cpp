// Fill out your copyright notice in the Description page of Project Settings.

#include "WebsocketSubsystem.h"
#include "WebSocketsModule.h"

void UWebsocketSubsystem::Initialize(FSubsystemCollectionBase& Collection)
{
	Super::Initialize(Collection);
}

void UWebsocketSubsystem::Deinitialize()
{
	if (Socket.IsValid() && Socket->IsConnected())
	{
		Socket->Close();
		Socket.Reset();
	}
	Super::Deinitialize();
}

void UWebsocketSubsystem::Connect(const FString& Url)
{
	if (!Socket.IsValid())
	{
		Socket = FWebSocketsModule::Get().CreateWebSocket(Url);

		Socket->OnConnected().AddLambda([this]() {
			AsyncTask(ENamedThreads::GameThread, [this]() {
				OnConnected.Broadcast();
			});
		});

		Socket->OnMessage().AddLambda([this](const FString& MessageString) {
			AsyncTask(ENamedThreads::GameThread, [this, MessageString]() {
				OnMessageReceived.Broadcast(MessageString);
			});
		});
	}

	if (!Socket->IsConnected())
	{
		Socket->Connect();
	}
}

bool UWebsocketSubsystem::SendMessage(const FString& Message)
{
	if (Socket.IsValid() && Socket->IsConnected())
	{
		Socket->Send(Message);
		return true;
	}
	return false;
}
