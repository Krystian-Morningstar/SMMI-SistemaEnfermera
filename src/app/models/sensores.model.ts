import { Signal } from "@angular/core"

export interface sensores{
    freqResp: Signal<string>
    freqCard: Signal<string>
    presArtsist: Signal<string>
    presArtdiast: Signal<string>
    tempCorp: Signal<string>
}