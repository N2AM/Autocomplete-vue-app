import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import AutocompleteSearch from "../../components/AutocompleteSearch.vue";

describe("Cities Autocomplete", () => {
  it("renders properly with focus on the search input field", () => {
    const wrapper = mount(AutocompleteSearch, {
      attachTo: document.body,
    });
    // const entityName = Object.keys(wrapper.vm.props.entity)[0];
    // expect(wrapper.text()).toContain(
    //   `Type the name of a ${entityName} to search`
    // );
    const input = wrapper.find("input").element;
    expect(input).toBe(document.activeElement);
  });

  it.skip(`Capture key presses from a text input and use 
  the current value of the input to match items in the list with less than 3 characters`, async () => {
    const wrapper = mount(Autocomplete);

    const textInput = wrapper.find('input[type="text"]');
    await textInput.setValue("a");

    expect(wrapper.vm.searchTerm.value).toBe("a");
    expect(wrapper.vm.searchCities.value).toStrictEqual(undefined);
  });

  it.skip(`Output the results under the input field
   as soon as you type at least 3 characters with no result`, async () => {
    const wrapper = mount(Autocomplete);

    const textInput = wrapper.find('input[type="text"]');
    await textInput.setValue("aaa");

    expect(wrapper.vm.searchTerm.value).toBe("aaa");
    expect(wrapper.vm.searchCities).toStrictEqual([]);
    wrapper.find('[data-testid="base-tile-icon"]');
    expect(wrapper.find('[data-testid="not-found"]').text()).contain(
      "No result found"
    );
  });

  it.skip(`Output the results under the input field
   as soon as you type at least 3 characters with a result and result counts`, async () => {
    const wrapper = mount(Autocomplete);

    const textInput = wrapper.find('input[type="text"]');
    await textInput.setValue("santiago");

    expect(wrapper.vm.searchTerm.value).toBe("santiago");
    expect(wrapper.vm.searchCities).toStrictEqual(["santiago"]);
    expect(wrapper.find('[data-testid="result-counts"]').text()).contain(
      wrapper.vm.searchCities.length
    );
  });

  it.skip(`Output the results under the input field
   as soon as you type at least 3 characters with multiple results and result counts`, async () => {
    const wrapper = mount(Autocomplete);

    const textInput = wrapper.find('input[type="text"]');
    await textInput.setValue("san");

    expect(wrapper.vm.searchTerm.value).toBe("san");
    expect(wrapper.vm.searchCities).toStrictEqual([
      "san jose",
      "santiago",
      "san francisco",
      "santa rosa",
      "san juan",
      "thousand oaks",
    ]);
    expect(wrapper.find('[data-testid="result-counts"]').text()).contain(6);
  });
});

describe.skip("Books Autocomplete", () => {
  it("renders properly", () => {
    const wrapper = mount(Autocomplete);
    expect(wrapper.text()).toContain("Type the name of a book to search");
  });
});
