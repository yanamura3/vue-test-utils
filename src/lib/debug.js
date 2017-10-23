// @flow

import has from 'lodash/has'

export function debugNode (node: VNode, depth: number) {
  const indent = `${' '.repeat(depth * 2)}`
  let _node = node

  // component
  if (node.componentInstance) {
    _node = node.componentInstance._vnode
  }

  // text node
  if (_node.elm instanceof Text) { // eslint-disable-line no-undef
    return `${indent}${_node.text}`
  }

  const tag = _node.tag
  const className = has(_node.data, 'staticClass') ? ` class="${_node.data.staticClass}"` : ``
  const beforeProps = has(_node.data, 'attrs') ? ' ' : ''
  const props = has(_node.data, 'attrs') ? attributesToString(_node.data.attrs) : ''
  const children = _node.children || []
  const childrenStr = children.length ? childrenToString(children, depth) : ''
  const closeIndent = children.length ? indent : ''
  return `${indent}<${tag}${className}${beforeProps}${props}>${childrenStr}${closeIndent}</${tag}>`
}

function attributesToString (attributes: {[string]: any}) {
  return Object.keys(attributes).map(k => {
    return `${k}=${propString(attributes[k])}`
  }).join(' ')
}

function propString (prop: any) {
  switch (typeof prop) {
    case 'string':
      return `"${prop}"`
    case 'number':
    case 'boolean':
      return `${prop}`
    case 'object':
      return `{{...}}`
    default:
      return `"${prop}"`
  }
}

function childrenToString (children: Array<VNode>, depth: number) {
  return '\n' + children.map(v => {
    return debugNode(v, depth + 1)
  }).join('\n') + '\n'
}
