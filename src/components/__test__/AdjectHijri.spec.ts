import { describe, it, expect, vitest } from 'vitest'
import { mount } from '@vue/test-utils'
import AdjestHijri from '../AdjestHijri.vue'
import { createTestingPinia } from "@pinia/testing";
import { useAdjectStore } from '@/stores/adjestTime'


describe('Adjest Hijri Tab', () => {

  it('adject tags render', () => {
    const wrapper = mount(AdjestHijri, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vitest.fn
        })]
      }
    })
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('.adject').exists()).toBeTruthy();
    expect(wrapper.findAll('button').length === 2).toBeTruthy();
  })

  it('adject value render correctly', async () => {
    const wrapper = mount(AdjestHijri, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vitest.fn,
          stubActions: false, // allow store action to work
          initialState: {
            adject: { adject: 0 }
          }
        })]
      }
    })

    expect(wrapper.find('.increament').text()).toBe("+");
    expect(wrapper.find('.decreament').text()).toBe("-");

    const storage = useAdjectStore();
    expect(wrapper.find('.adject').text()).toBe(String(storage.getAdject));

    await wrapper.find('.increament').trigger('click')
    await wrapper.find('.decreament').trigger('click')
    await wrapper.find('.increament').trigger('click')
    await wrapper.find('.increament').trigger('click')

    expect(wrapper.find('.adject').text()).toBe(String(storage.getAdject));
    expect(wrapper.find('.adject').text()).toBe("2");

  })
})
