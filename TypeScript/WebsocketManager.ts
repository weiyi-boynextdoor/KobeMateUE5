import * as UE from "ue";
import { G } from "./G";

export class WebsocketManager {
    ws_subsystem: UE.WebsocketSubsystem;

    init(ws_subsystem: UE.WebsocketSubsystem) {
        console.log("WebsocketManager initialized with subsystem:", ws_subsystem);
        this.ws_subsystem = ws_subsystem;
        ws_subsystem.OnConnected.Add(this.on_connected.bind(this));
    }

    connect(url: string) {
        this.ws_subsystem.Connect(url);
    }

    on_connected() {
        console.log("Websocket connected!");
        this.send_json({ action: "create_session" });
    }

    send_json(json: object) {
        this.ws_subsystem.SendMessage(JSON.stringify(json));
    }
}
