import * as UE from "ue";
import { G } from "./G";

export enum ConnectionStatus {
    DISCONNECTED,
    CONNECTING,
    CONNECTED,
}

export class WebsocketManager {
    connection_status: ConnectionStatus;
    private on_connection_status_changed_listeners: Set<() => void>;
    private on_message_listeners: Set<(json: JSON) => void>;

    constructor() {
        this.connection_status = ConnectionStatus.DISCONNECTED;
        this.on_connection_status_changed_listeners = new Set();
        this.on_message_listeners = new Set();
    }

    get_ws_subsystem() {
        return UE.SubsystemBlueprintLibrary.GetGameInstanceSubsystem(
            G.game_instance,
            UE.WebsocketSubsystem.StaticClass()
        ) as UE.WebsocketSubsystem;
    }

    init() {
        const ws_subsystem = this.get_ws_subsystem();
        console.log("WebsocketManager initialized with subsystem:", ws_subsystem);
        ws_subsystem.OnConnected.Add(this.on_connected);
        ws_subsystem.OnConnectionError.Add(this.on_connection_error);
        ws_subsystem.OnClosed.Add(this.on_closed);
        ws_subsystem.OnMessageReceived.Add(this.on_message);
    }

    connect(url: string) {
        this.connection_status = ConnectionStatus.CONNECTING;
        this.get_ws_subsystem().Connect(url);
        this.on_connection_state_changed();
    }

    close() {
        this.get_ws_subsystem().Close();
    }

    send_json(json: object) {
        this.get_ws_subsystem().SendMessage(JSON.stringify(json));
    }

    add_connection_status_listener(listener: () => void) {
        this.on_connection_status_changed_listeners.add(listener);
    }

    remove_connection_status_listener(listener: () => void) {
        this.on_connection_status_changed_listeners.delete(listener);
    }

    add_message_listener(listener: (json: JSON) => void) {
        this.on_message_listeners.add(listener);
    }

    remove_message_listener(listener: (json: JSON) => void) {
        this.on_message_listeners.delete(listener);
    }

    on_connected = () => {
        console.log("Websocket connected!");
        this.connection_status = ConnectionStatus.CONNECTED;
        this.on_connection_state_changed();
    };

    on_connection_error = (error: string) => {
        console.log("Websocket connection error:", error);
        this.connection_status = ConnectionStatus.DISCONNECTED;
        this.on_connection_state_changed();
    };

    on_closed = (status_code: number, reason: string, was_clean: boolean) => {
        console.log("Websocket closed!", status_code, reason, was_clean);
        this.connection_status = ConnectionStatus.DISCONNECTED;
        this.on_connection_state_changed();
    };

    on_connection_state_changed() {
        for (const listener of this.on_connection_status_changed_listeners) {
            listener();
        }
    }

    on_message = (message: string) => {
        const json = JSON.parse(message);
        for (const listener of this.on_message_listeners) {
            listener(json);
        }
    };
}
