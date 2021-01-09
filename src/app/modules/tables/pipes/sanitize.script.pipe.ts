import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeScript } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeScript'
})
export class SanitizeScriptPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) {
  }

  transform(v: string):SafeScript {
    return this._sanitizer.bypassSecurityTrustScript(v);
  }
}