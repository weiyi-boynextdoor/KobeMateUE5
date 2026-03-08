import * as UE from "ue";
import { JsClass } from "../../JsClass";

export class WBP_MainUI extends JsClass {
    initialize(Object: UE.Object): void {
        const widget = Object as UE.Game.UI.WBP_MainUI.WBP_MainUI_C;
        widget.Btn_Connect.OnClicked.Add(() => {
            UE.KismetSystemLibrary.PrintString(widget.GetWorld(), "Connect button clicked!");
        });
    }
}