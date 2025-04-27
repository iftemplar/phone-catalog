import { fetchPhones, fetchPhoneById } from "./api";

describe("API tests", () => {
  it("fetches a list of phones", async () => {
    const phones = await fetchPhones();
    expect(Array.isArray(phones)).toBe(true);
    expect(phones.length).toBeGreaterThan(0);

    const phone = phones[0];
    expect(phone).toHaveProperty("id");
    expect(phone).toHaveProperty("brand");
    expect(phone).toHaveProperty("name");
    expect(phone).toHaveProperty("basePrice");
  });

  it("fetches a single phone by ID", async () => {
    const phones = await fetchPhones();
    const phone = await fetchPhoneById(phones[0].id);

    expect(phone).toHaveProperty("id", phones[0].id);
    expect(phone).toHaveProperty("name");
    expect(phone).toHaveProperty("basePrice");
  });
});
