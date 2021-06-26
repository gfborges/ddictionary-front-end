import EntrySearchCard from '@/components/Entry/EntrySearchCard'
import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'

describe('EntrySearchCard', () => {
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })
  it('is Vue instance', () => {
    const props = {
      entry: 'Title',
      group: 'Group',
      definition: 'Definitions',
    }
    const wrapper = mount(EntrySearchCard, {
      vuetify,
      props,
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
