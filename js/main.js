"use strict";

var configs = (function () {
    var instance;
    var Singleton = function (options) {
        var options = options || Singleton.defaultOptions;
        for (var key in Singleton.defaultOptions) {
            this[key] = options[key] || Singleton.defaultOptions[key];
        }
    };
    Singleton.defaultOptions = {
        type_delay: 10
    };
    return {
        getInstance: function (options) {
            instance === void 0 && (instance = new Singleton(options));
            return instance;
        }
    };
})();

var main = (function () {

    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    var isUsingIE = window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);

    var ignoreEvent = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    
    var scrollToBottom = function () {
        window.scrollTo(0, document.body.scrollHeight);
    };
    
    var isURL = function (str) {
        return (str.startsWith("http") || str.startsWith("www")) && str.indexOf(" ") === -1 && str.indexOf("\n") === -1;
    };
    
    var InvalidArgumentException = function (message) {
        this.message = message;
        if ("captureStackTrace" in Error) {
            Error.captureStackTrace(this, InvalidArgumentException);
        } else {
            this.stack = (new Error()).stack;
        }
    };

    InvalidArgumentException.prototype = Object.create(Error.prototype);
    InvalidArgumentException.prototype.name = "InvalidArgumentException";
    InvalidArgumentException.prototype.constructor = InvalidArgumentException;

    var Terminal = function (prompt, cmdLine, output, outputTimer) {
        if (!(prompt instanceof Node) || prompt.nodeName.toUpperCase() !== "DIV") {
            throw new InvalidArgumentException("Invalid value " + prompt + " for argument 'prompt'.");
        }
        if (!(cmdLine instanceof Node) || cmdLine.nodeName.toUpperCase() !== "INPUT") {
            throw new InvalidArgumentException("Invalid value " + cmdLine + " for argument 'cmdLine'.");
        }
        if (!(output instanceof Node) || output.nodeName.toUpperCase() !== "DIV") {
            throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
        }
        this.completePrompt = "> "
        this.prompt = prompt;
        this.cmdLine = cmdLine;
        this.output = output;
        this.typeSimulator = new TypeSimulator(outputTimer, output);
    };

    Terminal.prototype.type = function (text, callback) {
        this.typeSimulator.type(text, callback);
    };

    Terminal.prototype.exec = function () {
        var command = this.cmdLine.value;
        this.cmdLine.value = "";
        this.prompt.textContent = "";
        this.output.innerHTML += "<span class=\"prompt-color\">" + this.completePrompt + "</span> " + command + "<br/>";
    };

    Terminal.prototype.init = function () {
        this.cmdLine.disabled = true;
        document.body.addEventListener("dblclick", function (event) {
            this.focus();
        }.bind(this));
        this.cmdLine.addEventListener("keydown", function (event) {
            if (event.which === 13 || event.keyCode === 13) {
                this.handleCmd();
                ignoreEvent(event);
            } else if (event.which === 9 || event.keyCode === 9) {
                this.handleFill();
                ignoreEvent(event);
            }
        }.bind(this));
        this.reset();
    };

    Terminal.makeElementDisappear = function (element) {
        element.style.opacity = 0;
        element.style.transform = "translateX(-300px)";
    };

    Terminal.makeElementAppear = function (element) {
        element.style.opacity = 1;
        element.style.transform = "translateX(0)";
    };

    Terminal.prototype.lock = function () {
        this.exec();
        this.cmdLine.blur();
        this.cmdLine.disabled = true;
    };

    Terminal.prototype.unlock = function () {
        this.cmdLine.disabled = false;
        this.prompt.textContent = this.completePrompt;
        scrollToBottom();
        this.focus();
    };

    Terminal.prototype.handleCmd = function () {
        var cmdComponents = this.cmdLine.value.trim().split(" ");
        this.lock();
        switch (cmdComponents[0]) {
            case "":
                this.type("", this.unlock.bind(this));
                break;
            default:
                this.response(cmdComponents);
                break;
        };
    };

    Terminal.prototype.response = function (cmdComponents) {
        var lethis = this;
        console.log("Cookie idEnigme : "+getCookie("idEnigme"))
        jQuery.post( "responsesthegame.php", { response: cmdComponents[0], idEnigme: getCookie("idEnigme") })
          .done(function( data ) {
            console.log("Data : "+data)
            var obj = JSON.parse(data);
            if (obj["goodOrNot"] != "error") {
                document.cookie = "idEnigme="+obj["goodOrNot"]+";";
                lethis.type(obj["scenario"]+"\n"+obj["intituleEnigme"], lethis.unlock.bind(lethis));
            }
            else {
                lethis.type(obj["scenario"], lethis.unlock.bind(lethis));
            }
        });
    };

    Terminal.prototype.reset = function () {
        this.output.textContent = "";
        this.prompt.textContent = "";
        var lethis = this;
        console.log("Cookie :"+document.cookie);
        console.log("GetCookie :"+getCookie("idEnigme"));
        var idEnigme = getCookie("idEnigme");
        if (idEnigme == "") {
            document.cookie = "idEnigme=initmessage";
            idEnigme = "initmessage";
        }
        if (this.typeSimulator) {
            jQuery.post( "responsesthegame.php", { idEnigme: idEnigme })
                .done(function( data ) {
                console.log(data);
                var obj = JSON.parse(data);
                console.log(obj["scenario"]);
                console.log(obj["intituleEnigme"]);
                if (obj["goodOrNot"] != "error") {
                    document.cookie = "idEnigme="+obj["goodOrNot"]+";";
                    lethis.type(obj["scenario"]+"\n"+obj["intituleEnigme"], lethis.unlock.bind(lethis));
                }
                else {
                    lethis.type(obj["scenario"]+"\n"+obj["intituleEnigme"], lethis.unlock.bind(lethis));
                }
            });
        }
    };

    Terminal.prototype.focus = function () {
        this.cmdLine.focus();
    };

    Terminal.prototype.invalidCommand = function (cmdComponents) {
        this.type(configs.getInstance().invalid_command_message.replace(configs.getInstance().value_token, cmdComponents[0]), this.unlock.bind(this));
    };

    var TypeSimulator = function (timer, output) {
        var timer = parseInt(timer);
        if (timer === Number.NaN || timer < 0) {
            throw new InvalidArgumentException("Invalid value " + timer + " for argument 'timer'.");
        }
        if (!(output instanceof Node)) {
            throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
        }
        this.timer = timer;
        this.output = output;
    };

    TypeSimulator.prototype.type = function (text, callback) {
        text = "\n"+text+"\n"
        if (isURL(text)) {
            window.open(text);
        }
        var i = 0;
        var htmlcount = 0;
        var output = this.output;
        var timer = this.timer;
        var skipped = false;
        var isNewLineDataBase = false;
        var isSleep = false;
        /*var skip = function () {
            skipped = true;
        }.bind(this);
        document.addEventListener("dblclick", skip);*/
        (function typer() {
            if (i < text.length) {
                var char = text.charAt(i);
                isSleep = false;
                if (((char == '\\') && (text.charAt(i+1) == 'n'))) {
                    isNewLineDataBase = true;
                    //isSleep = true;
                    output.innerHTML += "<br/>";
                    i++;
                }
                else if (char == '\n') {
                    isSleep = char === "\n";
                    //isSleep = true;
                    output.innerHTML += "<br/>";
                }
                else if (char == " ") {
                    output.innerHTML += "&nbsp;";
                }
                else if (((char == '<') && (text.charAt(i+1) == 'h')) && (text.charAt(i+2) == 't') && (text.charAt(i+3) == 'm') && (text.charAt(i+4) == 'l') && (text.charAt(i+5) == '>')) {
                    htmlcount++;
                    if (htmlcount > 1) {
                        htmlcount++;
                    }
                    var cut_txt = text.split('<html>');
                    output.innerHTML += cut_txt[htmlcount]+"<br/>";
                    i = i+cut_txt[htmlcount].length+("html>".length+"<html>".length);
                    isSleep = true;
                }
                else if (((char == '<') && (text.charAt(i+1) == 's')) && (text.charAt(i+2) == 'l') && (text.charAt(i+3) == 'e') && (text.charAt(i+4) == 'e') && (text.charAt(i+5) == 'p') && (text.charAt(i+6) == '>')) {
                    isSleep = true;
                    i = i+"sleep>".length;
                }
                else {
                    output.innerHTML += char;
                }
                i++;
                //if (!skipped) {
                    setTimeout(typer, isSleep ? timer * 50 : timer);
                /*} else {
                    output.innerHTML += (text.substring(i).replace(new RegExp("\n", 'g'), "<br/>").replace(new RegExp(" ", 'g'), "&nbsp;")) + "<br/>";
                    document.removeEventListener("dblclick", skip);
                    callback();
                }*/
            } else if (callback) {
                output.innerHTML += "<br/>";
                //document.removeEventListener("dblclick", skip);
                callback();
            }
            scrollToBottom();
        })();
    };

    return {
        listener: function () {
            new Terminal(
                document.getElementById("prompt"),
                document.getElementById("cmdline"),
                document.getElementById("output"),
                configs.getInstance().type_delay
            ).init();
        }
    };
})();

window.onload = main.listener;
