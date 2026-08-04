import { describe, it, expect, vitest } from 'vitest'
import { mount } from '@vue/test-utils'
import DiaLog from '../DiaLog.vue';
import { createTestingPinia } from '@pinia/testing';

describe('dialog', () => {
  it('close mentality', async () => {
    const wrapper = mount(DiaLog, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vitest.fn,
            stubActions: false,
          }),
        ],
      },
    });

    wrapper.vm.changeState(true);
    await wrapper.vm.$nextTick()

    expect(wrapper.find(".bg-shadow").exists()).toBe(true);

    await wrapper.find(".bg-shadow").trigger('click');
    expect(wrapper.find(".bg-shadow").exists()).toBe(false);

    wrapper.vm.changeState(true);
    await wrapper.vm.$nextTick()

    await wrapper.find(".close").trigger('click');
    expect(wrapper.find(".bg-shadow").exists()).toBe(false);
  });

});
