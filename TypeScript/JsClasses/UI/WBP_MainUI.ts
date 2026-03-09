import * as UE from "ue";
import { JsClass } from "../../JsClass";
import { G } from "../../G";

export class WBP_MainUI extends JsClass {
    initialize(Object: UE.Object): void {
        const widget = Object as UE.Game.UI.WBP_MainUI.WBP_MainUI_C;
        widget.Btn_Connect.OnClicked.Add(() => {
            G.websocket_manager.connect("ws://127.0.0.1:8024/ws");
        });
    }
}
