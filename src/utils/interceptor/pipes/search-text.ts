export const regexSearchExcludeHtmlTags = (searchValue: string) => 
  `(${searchValue})((?=[^>]*<)|(?![^<]*>))`;
