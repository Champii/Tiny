// Generated by LiveScript 1.5.0
(function(){
  var fs, gramItems, gramLineParse, gramOr, gramEscape, gramUnescape, gramLineDecl, stdGram, join$ = [].join, slice$ = [].slice;
  fs = require('fs');
  gramItems = {};
  gramLineParse = function(it){
    var res, idx, ref$;
    res = {};
    if ((idx = it.indexOf('^')) > -1) {
      res.exclude = join$.call(slice$.call(it, idx + 1), '');
      return import$(res, gramLineParse(join$.call(slice$.call(it, 0, idx), '')));
    }
    if (it[0] === '%') {
      res.optional = true;
      return import$(res, gramLineParse(join$.call(slice$.call(it, 1), '')));
    }
    if (it[0] === '!') {
      res.replace = true;
      return import$(res, gramLineParse(join$.call(slice$.call(it, 1), '')));
    }
    if (it[0] === '"') {
      res.literal = join$.call(slice$.call(it, 1, elemIndex('"', tail(it)) + 1 || 9e9), '');
    } else {
      res.symbol = it;
    }
    if ((ref$ = it[it.length - 1]) === '+' || ref$ === '*' || ref$ === '?') {
      res.repeter = it[it.length - 1];
      if (res.symbol != null) {
        res.symbol = join$.call(slice$.call(res.symbol, 0, -1), '');
      }
    }
    return res;
  };
  gramOr = function(it){
    var res, i, ref$, $or, ref1$;
    res = [];
    i = 0;
    while (i < it.length) {
      if (((ref$ = it[i + 1]) != null ? ref$.symbol : void 8) === '|') {
        $or = [it[i]];
        i++;
        while (((ref1$ = it[i]) != null ? ref1$.symbol : void 8) != null && it[i].symbol === '|') {
          $or.push(it[i + 1]);
          i += 2;
        }
        res.push({
          or: $or
        });
      } else {
        res.push(it[i]);
        i++;
      }
    }
    return res;
  };
  gramEscape = function(it){
    var i, j, arr, res, open, i$, len$, l, final;
    i = 0;
    j = 0;
    arr = Array.from(it);
    res = new Buffer(it.length);
    open = false;
    for (i$ = 0, len$ = arr.length; i$ < len$; ++i$) {
      l = arr[i$];
      if (l === '"' && it[i - 1] !== '\\') {
        open = !open;
      }
      if (open && l === ' ') {
        res.writeUInt8(1, j);
        j++;
      } else if (open && l === '=') {
        res.writeUInt8(2, j);
        j++;
      } else if (open && l === '"' && it[i - 1] === '\\') {
        res.writeUInt8(3, j);
        j++;
      } else {
        res.writeUInt8(l.charCodeAt(0), j);
        j++;
      }
      i++;
    }
    final = res.slice(0, j);
    return final.toString().replace(/\\n/g, '\n');
  };
  gramUnescape = function(it){
    return map(function(it){
      switch (false) {
      case !in$('\u0001', it):
        return it.replace(/\001/g, ' ');
      case !in$('\u0002', it):
        return it.replace(/\002/g, '=');
      case !in$('\u0003', it):
        return it.replace(/\003/g, '"');
      default:
        return it;
      }
    })(
    it);
  };
  gramLineDecl = function(it){
    var parts, escaped;
    parts = gramUnescape(gramEscape(it).split(': '));
    escaped = gramUnescape(
    split(' ')(
    gramEscape(parts[1])));
    return gramItems[parts[0]] = gramOr(map(gramLineParse, escaped));
  };
  stdGram = {
    Character: [{
      or: [
        {
          symbol: "Alphanum",
          optional: true
        }, {
          symbol: "SpeChar",
          optional: true
        }
      ]
    }],
    SpeChar: [{
      or: [
        {
          literal: " "
        }, {
          literal: "/"
        }, {
          literal: "!"
        }, {
          literal: "@"
        }, {
          literal: "#"
        }, {
          literal: "$"
        }, {
          literal: "%"
        }, {
          literal: "^"
        }, {
          literal: "&"
        }, {
          literal: "*"
        }, {
          literal: "("
        }, {
          literal: ")"
        }, {
          literal: "_"
        }, {
          literal: "-"
        }, {
          literal: "="
        }, {
          literal: "+"
        }, {
          literal: "["
        }, {
          literal: "]"
        }, {
          literal: "{"
        }, {
          literal: "}"
        }, {
          literal: "|"
        }, {
          literal: "/"
        }, {
          literal: "?"
        }, {
          literal: "."
        }, {
          literal: ">"
        }, {
          literal: "<"
        }, {
          literal: ","
        }, {
          literal: ";"
        }, {
          literal: ":"
        }, {
          literal: "\\n"
        }, {
          literal: "\\"
        }
      ]
    }],
    Alphanum: [{
      or: [
        {
          symbol: 'Letter',
          optional: true
        }, {
          symbol: 'Digit',
          optional: true
        }
      ]
    }],
    Letter: [{
      or: [
        {
          literal: "a"
        }, {
          literal: "b"
        }, {
          literal: "c"
        }, {
          literal: "d"
        }, {
          literal: "e"
        }, {
          literal: "f"
        }, {
          literal: "g"
        }, {
          literal: "h"
        }, {
          literal: "i"
        }, {
          literal: "j"
        }, {
          literal: "k"
        }, {
          literal: "l"
        }, {
          literal: "m"
        }, {
          literal: "n"
        }, {
          literal: "o"
        }, {
          literal: "p"
        }, {
          literal: "q"
        }, {
          literal: "r"
        }, {
          literal: "s"
        }, {
          literal: "t"
        }, {
          literal: "u"
        }, {
          literal: "v"
        }, {
          literal: "w"
        }, {
          literal: "x"
        }, {
          literal: "y"
        }, {
          literal: "z"
        }, {
          literal: "A"
        }, {
          literal: "B"
        }, {
          literal: "C"
        }, {
          literal: "D"
        }, {
          literal: "E"
        }, {
          literal: "F"
        }, {
          literal: "G"
        }, {
          literal: "H"
        }, {
          literal: "I"
        }, {
          literal: "J"
        }, {
          literal: "K"
        }, {
          literal: "L"
        }, {
          literal: "M"
        }, {
          literal: "N"
        }, {
          literal: "O"
        }, {
          literal: "P"
        }, {
          literal: "Q"
        }, {
          literal: "R"
        }, {
          literal: "S"
        }, {
          literal: "T"
        }, {
          literal: "U"
        }, {
          literal: "V"
        }, {
          literal: "W"
        }, {
          literal: "X"
        }, {
          literal: "Y"
        }, {
          literal: "Z"
        }
      ]
    }],
    Digit: [{
      or: [
        {
          literal: "0"
        }, {
          literal: "1"
        }, {
          literal: "2"
        }, {
          literal: "3"
        }, {
          literal: "4"
        }, {
          literal: "5"
        }, {
          literal: "6"
        }, {
          literal: "7"
        }, {
          literal: "8"
        }, {
          literal: "9"
        }
      ]
    }],
    Number: [{
      symbol: "Digit",
      repeter: "+",
      optional: true
    }]
  };
  module.exports = function(grammarDef, done){
    var lines, this$ = this;
    lines = filter(function(it){
      return it[0] !== '#' && it.length;
    })(
    grammarDef.toString().split('\n'));
    each(gramLineDecl, lines);
    return done(null, import$(stdGram, gramItems));
  };
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);