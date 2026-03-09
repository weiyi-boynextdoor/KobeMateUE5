// Fill out your copyright notice in the Description page of Project Settings.

#include "WebsocketSubsystem.h"
#include "WebSocketsModule.h"

void UWebsocketSubsystem::Initialize(FSubsystemCollectionBase& Collection)
{
	Super::Initialize(Collection);
}

void UWebsocketSubsystem::Deinitialize()
{
	if (Socket.IsValid())
	{
		Socket->OnConnected().Clear();
		Socket->OnConnectionError().Clear();
		Socket->OnClosed().Clear();
		Socket->OnMessage().Clear();

		if (Socket->IsConnected())
		{
			Socket->Close();
		}

		Socket.Reset();
	}
	Super::Deinitialize();
}

void UWebsocketSubsystem::Connect(const FString& Url)
{
	if (!Socket.IsValid())
	{
		Socket = FWebSocketsModule::Get().CreateWebSocket(Url);
		const TWeakObjectPtr<UWebsocketSubsystem> WeakThis(this);

		Socket->OnConnected().AddLambda([WeakThis]() {
			AsyncTask(ENamedThreads::GameThread, [WeakThis]() {
				if (UWebsocketSubsystem* This = WeakThis.Get())
				{
					This->OnConnected.Broadcast();
				}
			});
		});

		Socket->OnConnectionError().AddLambda([WeakThis](const FString& Error) {
			AsyncTask(ENamedThreads::GameThread, [WeakThis, Error]() {
				if (UWebsocketSubsystem* This = WeakThis.Get())
				{
					This->OnConnectionError.Broadcast(Error);
				}
			});
		});

		Socket->OnClosed().AddLambda([WeakThis](int32 StatusCode, const FString& Reason, bool bWasClean) {
			AsyncTask(ENamedThreads::GameThread, [WeakThis, StatusCode, Reason, bWasClean]() {
				if (UWebsocketSubsystem* This = WeakThis.Get())
				{
					This->OnClosed.Broadcast(StatusCode, Reason, bWasClean);
				}
			});
		});

		Socket->OnMessage().AddLambda([WeakThis](const FString& MessageString) {
			AsyncTask(ENamedThreads::GameThread, [WeakThis, MessageString]() {
				if (UWebsocketSubsystem* This = WeakThis.Get())
				{
					This->OnMessageReceived.Broadcast(MessageString);
				}
			});
		});
	}

	if (!Socket->IsConnected())
	{
		Socket->Connect();
	}
}

void UWebsocketSubsystem::Close()
{
	if (Socket.IsValid() && Socket->IsConnected())
	{
		Socket->Close();
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
