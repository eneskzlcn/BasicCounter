import { mount } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'

describe('Counter', () => {
  
  //is there a counter comp rendered.
  test('is a Vue instance', () => {
    const wrapper = mount(Counter)
    expect(wrapper.vm).toBeTruthy()
  })
  //is there a increment button
  test('is a an increment button', async() => {
    const wrapper = mount(Counter)
    const inc_btn = await wrapper.find('#incrementBTN')
    expect(inc_btn).toBeTruthy()
  })
  //is there a decrement button
  test('is a decrement button', async() => {
    const wrapper = mount(Counter)
    const dec_btn = await wrapper.find('#decrementBTN')
    expect(dec_btn).toBeTruthy()
  })
  //is there a reset button
  test('is a reset button', async() => {
    const wrapper = mount(Counter)
    const res_btn = await wrapper.find('#resetBTN')
    expect(res_btn).toBeTruthy()
  })
  //is increment func. runs when click to increment btn
  test('runs the increment method on click',async() =>{
    const wrapper = mount(Counter)
    const clickHandler = jest.fn()
    await wrapper.setMethods({counting : clickHandler})
    await wrapper.find('#incrementBTN').trigger('click')
    expect(clickHandler).toHaveBeenCalled()
  })
  // is the initial value of counter == 0 ?
  test('is the initial value of counte == 0',async() =>{
    const wrapper = mount(Counter)
    expect(wrapper.vm.counter).toBe(0);
  })

  //is decrement func. runs when click to increment btn
  test('runs the decrement method on click',async() =>{
    const wrapper = mount(Counter)
    const clickHandler = jest.fn()
    await wrapper.setMethods({counting : clickHandler})
    await wrapper.find('#decrementBTN').trigger('click')
    expect(clickHandler).toHaveBeenCalled()
  })
    //is reset func. runs when click to reset btn

  test('runs the decrement method on click',async() =>{
    const wrapper = mount(Counter)
    const clickHandler = jest.fn()
    await wrapper.setMethods({counting : clickHandler})
    await wrapper.find('#decrementBTN').trigger('click')
    expect(clickHandler).toHaveBeenCalled()
  })
  test('runs the reset method on click.',async() =>{
    const wrapper = mount(Counter);
    const clickHandler = jest.fn()
    await wrapper.setMethods({reset : clickHandler})
    await wrapper.find('#resetBTN').trigger('click')
    expect(clickHandler).toHaveBeenCalled()
  })
})
