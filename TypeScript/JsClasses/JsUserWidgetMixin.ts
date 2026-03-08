import * as UE from "ue"
import { blueprint } from "puerts"

let BP = UE.Class.Load("/PuertsWrapper/JsUserWidget.JsUserWidget_C");

const BP_Mixin = blueprint.tojs<typeof UE.PuertsWrapper.JsUserWidget.JsUserWidget_C>(BP);

interface BPExt extends UE.PuertsWrapper.JsUserWidget.JsUserWidget_C {};

class BPExt {
    PreConstruct(IsDesignTime: boolean) {
        UE.KismetSystemLibrary.PrintString(this.GetWorld(), "JsUserWidget mixin succeeded: " + this.MixinClass);
    }
}

blueprint.mixin(BP_Mixin, BPExt, {objectTakeByNative: true});
