require! fs

gram-items = {}

gram-symbol-repeter = ->
  repeter: it[*-1]
  symbol: it[0 til -1]*''

gram-line-parse = ->
  | it.0 is '"'           =>
    # log 'line parse' it, literal: it[1 til -1]*''
    literal: it[1 til -1]*''
  | it[*-1] in <[ + * ]>  => gram-symbol-repeter it
  | _                     => symbol: it

gram-or = ->
  res = []
  i = 0
  while i < it.length
    if it[i + 1]?.symbol is '|'
      $or = [it[i]]
      i++
      while it[i]?.symbol? and it[i].symbol is '|'
        $or.push it[i + 1]
        i += 2
      res.push or: $or
    else
      res.push it[i]
      i++
  res

gram-escape-space = ->
  res = new Buffer it.length
  open = false
  for l, i in it
    if l is '"'
      open = !open
    if open and l is ' '
      res.writeUInt8 1, i
    else
      res.writeUInt8 l.charCodeAt(0), i
  res.toString!replace /\\n/g, '\n'

gram-unescape-space = ->
  it |> map ->
    | '\u0001' in it  => it.replace /\001/g, ' '
    | _               => it

gram-line-decl = ->
  parts = it.split \=
  gram-items[parts.0] = gram-or map gram-line-parse, gram-unescape-space gram-escape-space(parts.1).split ' '

module.exports = (filename, done) ->
  fs.read-file filename, (err, buff) ->
    return done err if err?

    lines = buff.to-string!split \\n |> filter (.0 isnt '#' and it.length)

    each gram-line-decl, lines
    done null, gram-items
    # inspect gram-items
