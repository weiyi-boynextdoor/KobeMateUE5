import * as UE from "ue";
import { JsClass } from "../../JsClass";
import { G } from "../../G";
import { ConnectionStatus } from "../../WebsocketManager";
import * as utils from "../../utils";

export class WBP_MainUI extends JsClass {
    widget: UE.Game.UI.WBP_MainUI.WBP_MainUI_C;

    initialize(Object: UE.Object): void {
        const widget = Object as UE.Game.UI.WBP_MainUI.WBP_MainUI_C;

        this.widget = widget;
        if (!G.config.Host_IP) {
            G.config.Host_IP = "127.0.0.1";
        }
        widget.Input_IP.SetText(G.config.Host_IP as string);
        if (!G.config.Host_Port) {
            G.config.Host_Port = "8024";
        }
        widget.Input_Port.SetText(G.config.Host_Port as string);

        const websocket_manager = G.websocket_manager;

        widget.Btn_Connect.OnClicked.Add(() => {
            if (G.websocket_manager.connection_status === ConnectionStatus.CONNECTING) {
                return;
            }
            if (G.websocket_manager.connection_status === ConnectionStatus.CONNECTED) {
                G.websocket_manager.close();
                return;
            }
            const ip = this.widget.Input_IP.GetText().toString();
            const port = this.widget.Input_Port.GetText().toString();
            G.config.Host_IP = ip;
            G.config.Host_Port = port;
            const url = `ws://${ip}:${port}/ws`;
            G.websocket_manager.connect(url);
        });

        widget.Btn_Send.OnClicked.Add(() => {
            if (G.websocket_manager.connection_status !== ConnectionStatus.CONNECTED) {
                return;
            }
            const text = this.widget.Input_UserChat.GetText().toString();
            G.websocket_manager.send_json({ action: "chat", message: text });
        });

        websocket_manager.add_connection_status_listener(this.on_connection_status_changed);
        websocket_manager.add_message_listener(this.on_websocket_message);
    }

    deinitialize() {
        this.widget = null;
        G.websocket_manager.remove_connection_status_listener(this.on_connection_status_changed);
        G.websocket_manager.remove_message_listener(this.on_websocket_message);
    }

    on_connection_status_changed = () => {
        switch (G.websocket_manager.connection_status) {
            case ConnectionStatus.DISCONNECTED:
                this.widget.Text_Connect.SetText("Connect");
                break;
            case ConnectionStatus.CONNECTING:
                this.widget.Text_Connect.SetText("Connecting...");
                break;
            case ConnectionStatus.CONNECTED:
                this.widget.Text_Connect.SetText("Disconnect");
                utils.save_game_config();
                break;
        }
    };

    on_websocket_message = (json: JSON) => {
        if (json["event"] === "text_response") {
            this.widget.Text_Response.SetText("Kobe: " + (json["content"] as string));
        }
    };
}
