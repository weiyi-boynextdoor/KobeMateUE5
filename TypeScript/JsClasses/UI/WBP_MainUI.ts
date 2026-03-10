import * as UE from "ue";
import { JsClass } from "../../JsClass";
import { G } from "../../G";
import { ConnectionStatus } from "../../WebsocketManager";

export class WBP_MainUI extends JsClass {
    // Use WeakRef to avoid circular reference
    weak_widget: WeakRef<UE.Game.UI.WBP_MainUI.WBP_MainUI_C>;

    initialize(Object: UE.Object): void {
        const widget = Object as UE.Game.UI.WBP_MainUI.WBP_MainUI_C;

        this.weak_widget = new WeakRef(widget);
        widget.Input_IP.SetText("127.0.0.1");
        widget.Input_Port.SetText("8024");

        const websocket_manager = G.websocket_manager;

        widget.Btn_Connect.OnClicked.Add(() => {
            if (G.websocket_manager.connection_status === ConnectionStatus.CONNECTING) {
                return;
            }
            if (G.websocket_manager.connection_status === ConnectionStatus.CONNECTED) {
                G.websocket_manager.close();
                return;
            }
            const widget = this.weak_widget.deref();
            const ip = widget.Input_IP.GetText().toString();
            const port = widget.Input_Port.GetText().toString();
            const url = `ws://${ip}:${port}/ws`;
            G.websocket_manager.connect(url);
        });

        websocket_manager.add_connection_status_listener(this.on_connection_status_changed);
    }

    deinitialize() {
        G.websocket_manager.remove_connection_status_listener(this.on_connection_status_changed);
    }

    on_connection_status_changed = () => {
        const widget = this.weak_widget.deref();

        switch (G.websocket_manager.connection_status) {
            case ConnectionStatus.DISCONNECTED:
                widget.Text_Connect.SetText("Connect");
                break;
            case ConnectionStatus.CONNECTING:
                widget.Text_Connect.SetText("Connecting...");
                break;
            case ConnectionStatus.CONNECTED:
                widget.Text_Connect.SetText("Disconnect");
                break;
        }
    };
}
