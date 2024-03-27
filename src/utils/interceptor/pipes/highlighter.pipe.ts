import {Pipe, PipeTransform} from '@angular/core';
import { regexSearchExcludeHtmlTags } from './search-text';
  
@Pipe({
  name: "highlighter",
})
export class HighlighterPipe implements PipeTransform {
  transform(value: any, searchValue: string, type: string, classColor: string): any {
    if (!searchValue) return value;
    if (type === "full") {
      const regex = new RegExp(regexSearchExcludeHtmlTags(searchValue), "igm");
      value = value.replace(regex, `<span class="${classColor}">$1</span>`);
    } else {
      const re = new RegExp(searchValue, "igm");
      value = value.replace(re, `<span class=${classColor}">$&</span>`);
    }
    return value;
  }
}
