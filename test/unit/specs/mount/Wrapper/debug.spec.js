import { compileToFunctions } from 'vue-template-compiler'
import mount from '~src/mount'
import Component from '~resources/components/component.vue'
import ComponentWithChild from '~resources/components/component-with-child.vue'
import ComponentWithoutName from '~resources/components/component-without-name.vue'
import ComponentWithProps from '~resources/components/component-with-props.vue'
import ComponentWithNestedChildren from '~resources/components/component-with-nested-children.vue'
import ComponentWithSlots from '~resources/components/component-with-slots.vue'
import ComponentWithVFor from '~resources/components/component-with-v-for.vue'

describe.only('debug', () => {
  it('returns HTML string when template only contains one element', () => {
    const compiled = compileToFunctions('<div></div>')
    const wrapper = mount(compiled)

    expect(wrapper.debug()).to.equal('<div></div>')
  })
  it('returns HTML string when template only contains one element with class', () => {
    const compiled = compileToFunctions('<div class="foo"></div>')
    const wrapper = mount(compiled)

    expect(wrapper.debug()).to.equal('<div class="foo"></div>')
  })
  it('returns HTML string when template only contains one element with id', () => {
    const compiled = compileToFunctions('<div id="bar"></div>')
    const wrapper = mount(compiled)

    expect(wrapper.debug()).to.equal('<div id="bar"></div>')
  })
  it('returns HTML string when template contains nested elements', () => {
    const compiled = compileToFunctions('<div><div><p></p><p></p></div></div>')
    const wrapper = mount(compiled)

    expect(wrapper.debug()).to.equal(
      '<div>\n' +
      '  <div>\n' +
      '    <p></p>\n' +
      '    <p></p>\n' +
      '  </div>\n' +
      '</div>'
    )
  })
  it('returns HTML string when use simple component', () => {
    const wrapper = mount(Component)

    expect(wrapper.debug()).to.equal(
      '<div></div>'
    )
  })
  it('returns HTML string when use component with child', () => {
    const wrapper = mount(ComponentWithChild)

    expect(wrapper.debug()).to.equal(
      '<div>\n' +
      '  <span>\n' +
      '    <div></div>\n' +
      '  </span>\n' +
      '</div>'
    )
  })
  it('returns HTML string when use component without name', () => {
    const wrapper = mount(ComponentWithoutName)

    expect(wrapper.debug()).to.equal(
      '<div></div>'
    )
  })
  it('returns HTML string when use component without name', () => {
    const wrapper = mount(ComponentWithProps, {
      propsData: {
        prop1: 1,
        prop2: 'hello'
      }
    })

    expect(wrapper.debug()).to.equal(
      '<div>\n' +
      '  <p class="prop-1">\n' +
      '    1\n' +
      '  </p>\n' +
      '   \n' +
      '  <p class="prop-2">\n' +
      '    hello\n' +
      '  </p>\n' +
      '</div>'
    )
  })
  it('returns HTML string when use component with nexted children', () => {
    const wrapper = mount(ComponentWithNestedChildren)

    expect(wrapper.debug()).to.equal(
      '<div>\n' +
      '  <span>\n' +
      '    <div>\n' +
      '      <span>\n' +
      '        <div></div>\n' +
      '      </span>\n' +
      '    </div>\n' +
      '     \n' +
      '    <div></div>\n' +
      '  </span>\n' +
      '</div>'
    )
  })
  it('returns HTML string when use component with slots', () => {
    const wrapper = mount(ComponentWithSlots, {
      slots: {
        default: '<div class="foo"></div>'
      }
    })

    expect(wrapper.debug()).to.equal(
      '<div class="container">\n' +
      '  <header></header>\n' +
      '   \n' +
      '  <main>\n' +
      '    <div class="foo"></div>\n' +
      '  </main>\n' +
      '   \n' +
      '  <footer></footer>\n' +
      '</div>'
    )
  })
  it('returns HTML string when use component with vfor', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const wrapper = mount(ComponentWithVFor, { propsData: { items }})

    expect(wrapper.debug()).to.equal(
      '<div>\n' +
      '  <div></div>\n' +
      '  <div></div>\n' +
      '  <div></div>\n' +
      '</div>'
    )
  })
})
