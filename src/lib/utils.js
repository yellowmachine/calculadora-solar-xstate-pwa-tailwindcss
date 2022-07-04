export function isHeader(line){
    return !/^ES\d+/.test(line)
}
  
export function dropWhile(arr, func){
  while (arr.length > 0 && func(arr[0])) arr = arr.slice(1);
  return arr;
}

export function splitLines(str){
  let lines = str.split(/\r?\n/)
  lines = dropWhile(lines, isHeader)
  if(lines.length > 0 && lines[lines.length-1] === '')
    lines.pop()
  return lines
}

export function csv2mapa(r){
  let ret = splitLines(r).reduce(function(total, line){
    let fields = line.split(';')
    let a = parseFloat(fields[3])
    let b = parseFloat(fields[4])
    total[fields[1].slice(5)] = [a, b]
    return total
  }, {})
  return ret
}

export function mapacsv2array(m, vector){
  let aux = Object.values(m)
  let media = aux.reduce(function(total, actual){
    total = total + actual[0]
    return total
  }, 0)
  media = media / (aux.length || 1)
  return vector.map(function(x){
    let v = m[x] || [media, 0]
    return v
  })
}

export function popWhile(arr, func){
  let ret = {header: [], tail: null}
  while (arr.length > 0 && func(arr[0])){
    ret.header.push(arr[0])
    arr = arr.slice(1);
  }
  ret.tail = arr;
  return ret;
}