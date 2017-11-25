var contextMenuItem = {
  "id": "run",
  "title": "Run",
  "contexts": ["selection"]
};
var langNamesMap = {
  "c": 1,
  "cpp": 2,
  "java": 3,
  "python": 5,
  "perl": 6,
  "php": 7,
  "ruby": 8,
  "csharp": 9,
  "mysql": 10,
  "oracle": 11,
  "haskell": 12,
  "clojure": 13,
  "bash": 14,
  "scala": 15,
  "erlang": 16,
  "lua": 18,
  "javascript": 20,
  "go": 21,
  "d": 22,
  "ocaml": 23,
  "r": 24,
  "pascal": 25,
  "sbcl": 26,
  "python3": 30,
  "groovy": 31,
  "objectivec": 32,
  "fsharp": 33,
  "cobol": 36,
  "visualbasic": 37,
  "lolcode": 38,
  "smalltalk": 39,
  "tcl": 40,
  "whitespace": 41,
  "tsql": 42,
  "java8": 43,
  "db2": 44,
  "octave": 46,
  "xquery": 48,
  "racket": 49,
  "rust": 50,
  "swift": 51,
  "fortran": 54
}
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData) {
  if (clickData.menuItemId == "run" && clickData.selectionText) {
    // console.log("Text Selected" + clickData.selectionText);
    var input = clickData.selectionText;
    var input1 = "";
    // $("bo").append("<div>hello world</div>")

    for (var i = 0; i < input.length; i++) {
      if (input.charCodeAt(i) <= 127) {
        input1 += input.charAt(i);
      } else {
        // input1 += " "
      }
    }
    Algorithmia.client("simO91UBDDTh/UPohPD0m7V97A11")
      .algo("PetiteProgrammer/ProgrammingLanguageIdentification/0.1.3")
      .pipe(input1)
      .then(function(output) {
        // console.log(output.result);
        var maxInd = 0,
          maxVal = 0;

        for (var i = 0; i < output.result.length; i++) {
          if (output.result[i][1] > maxVal) {
            maxInd = i;
            maxVal = output.result[i][1];
          }
        }
        if(maxVal<0.55) alert("Language Detection Error Output may vary...");
        var lang = output.result[maxInd][0];
        console.log(langNamesMap[lang] + "\n" + input);
        $.ajax({

          url: 'http://api.hackerrank.com/checker/submission.json',
          type: 'POST',
          data: {
            source: input1,
            testcases: '["1"]',
            lang: "" + langNamesMap[lang] + "",
            api_key: 'hackerrank|1340717-2223|5eb3b077d09921bb11ec13ca11dc5b5db1497c3f',
            wait: true
          },
          success: function(data) {
            console.log(data);
            if (data.result.stdout) {
              alert("Language Detected : "+lang+"\nOutput :"+data.result.stdout);
            } else if (data.result.compilemessage) {
              alert("Language Detected : "+lang+"\nError Occured :"+data.result.compilemessage);
            } else if (data.result.stderr){
              alert("Language Detected : "+lang+"\nStandard I/o error Occured :"+data.result.stderr);
            }
          },
          error: function() {
            alert("Cannot get data\nCheck your internet connection.");
          },
          timeout: 100000,
          dataType: "json",
          contentType: "application/x-www-form-urlencoded;charset=utf-16"
        })
      });
  }
})
