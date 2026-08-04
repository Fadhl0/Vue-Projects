import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import InputForm from '../InputForm.vue';

const mockOptions = [
  { name: 'Saudi Arabia', id: 1, },
  { name: 'Egypt', id: 2 },
  { name: 'Palestine', id: 3 },
];

describe('InputForm', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(InputForm, {
      props: {
        disable: false,
        placeholder: '',
      },
    });
    const input = wrapper.find('input');

    expect(input.element.disabled).toBe(false);
    expect(input.attributes('placeholder')).toBe('');
    expect(wrapper.find('.tick').isVisible()).toBe(false);
    expect(wrapper.find('.menu').exists()).toBe(false);
  });

  it('respects disable and placeholder props', () => {
    const wrapper = mount(InputForm, {
      props: {
        disable: true,
        placeholder: 'Select Location...',
      },
    });

    const input = wrapper.find('input');
    expect(input.element.disabled).toBe(true);
    expect(input.attributes('placeholder')).toBe('Select Location...');
  });

  it('opens menu on focus and closes on blur', async () => {
    const wrapper = mount(InputForm, {
      props: {
        disable: false,
        placeholder: '',
        options: mockOptions,
      },
    });


    const input = wrapper.find('input');
    expect(input.element.disabled).toBe(false);
    await input.trigger('focus');

    expect(wrapper.find('.menu').exists()).toBe(true);
    expect(input.classes()).toContain('active');
    expect(wrapper.findAll('.item')).toHaveLength(3);

    await input.trigger('blur');

    expect(wrapper.find('.menu').exists()).toBe(false);
    expect(input.classes()).not.toContain('active');
  });

  it('filters options based on input (case-unsenstive', async () => {
    const wrapper = mount(InputForm, {
      props: {
        options: mockOptions,
        placeholder: '',
        disable: false
      },
    });

    const input = wrapper.find('input');
    await input.trigger('focus');

    await input.setValue('saudi');

    const items1 = wrapper.findAll('.item');
    expect(items1).toHaveLength(1);
    expect(items1[0]?.text()).toBe('Saudi Arabia');

    await input.setValue('e');

    const items2 = wrapper.findAll('.item');
    expect(items2).toHaveLength(2);
    expect(items2[0]?.text()).toBe('Egypt');
  });

  it('selects an item on mousedown and emits select event', async () => {
    const wrapper = mount(InputForm, {
      props: {
        options: mockOptions,
        placeholder: '',
        disable: false
      },
    });

    const input = wrapper.find('input');
    await input.trigger('focus');

    const secondItem = wrapper.findAll('.item')[1];
    await secondItem?.trigger('mousedown');

    expect(wrapper.emitted('select')).toBeTruthy();
    expect(wrapper.emitted('select')![0]).toEqual([{ name: 'Egypt', id: 2 }]);

    expect((input.element.value)).toBe('Egypt');
    expect(wrapper.find('.tick').isVisible()).toBe(true);
    expect(wrapper.find('.menu').exists()).toBe(false);
    expect(wrapper.vm.selected).toEqual({ name: 'Egypt', id: 2 });
  });

  it('resets input state when resetInput() is called', async () => {
    const wrapper = mount(InputForm, {
      props: {
        options: mockOptions,
        placeholder: '',
        disable: false
      },
    });

    const input = wrapper.find('input');
    await input.trigger('focus');
    await wrapper.find('.item').trigger('mousedown');

    wrapper.vm.resetInput();
    await wrapper.vm.$nextTick();

    expect(input.element.value).toBe('');
    expect(wrapper.find('.tick').isVisible()).toBe(false);
    expect(wrapper.vm.selected).toBeNull();
  });
});
