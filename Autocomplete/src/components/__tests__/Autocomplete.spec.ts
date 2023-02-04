import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Autocomplete from "../../components/Autocomplete.vue";

describe("Cities Autocomplete", () => {
  it("renders properly", () => {
    const wrapper = mount(Autocomplete);
    expect(wrapper.text()).toContain("Type the name of a city to search");
  });
});

describe("Books Autocomplete", () => {
  it("renders properly", () => {
    const wrapper = mount(Autocomplete);
    expect(wrapper.text()).toContain("Type the name of a book to search");
  });
});
