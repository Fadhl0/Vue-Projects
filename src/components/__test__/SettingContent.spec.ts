import { describe, it, expect, vitest } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing';
import SettingContent from '../SettingContent.vue';


describe('Settings', () => {
  it('correct content according to to active tab', async () => {
    const wrapper = mount(SettingContent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vitest.fn,
            stubActions: false,
            initialState: {
              location: {
                country: 'Syria',
                state: 'Aleppo',
                city: '',
                locationTarget: ['10', '30'],
              },
              clac: ""
            }
          }),
        ],
      },
      data: () => ({
        activeTab: 1
      })
    });

    expect(wrapper.find(".adhan").classes().includes('active')).toBe(false);
    expect(wrapper.find(".calcu").classes().includes('active')).toBe(true);
    expect(wrapper.find(".hijri").classes().includes('active')).toBe(false);

    await wrapper.find(".adhan").trigger('click');

    expect(wrapper.find(".adhan").classes().includes('active')).toBe(true);
    expect(wrapper.find(".calcu").classes().includes('active')).toBe(false);
    expect(wrapper.find(".hijri").classes().includes('active')).toBe(false);

    await wrapper.find(".hijri").trigger('click');
    expect(wrapper.find(".adhan").classes().includes('active')).toBe(false);
    expect(wrapper.find(".calcu").classes().includes('active')).toBe(false);
    expect(wrapper.find(".hijri").classes().includes('active')).toBe(true);

    expect(wrapper.find(".route-path").text().includes("Syria / Aleppo")).toBe(true); // first route-path

  });

});
