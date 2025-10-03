from playwright.sync_api import Page, expect

def test_verify_all_changes(page: Page):
    """
    This test verifies the changes made to the home, credit, and savings pages.
    """

    # 1. Verify Home page
    page.goto("http://localhost:3001")
    expect(page).to_have_title("Finans")
    page.screenshot(path="jules-scratch/verification/home-page.png")

    # 2. Verify Credit page
    credit_link = page.get_by_role("link", name="Kredi Hesaplayıcıya Git")
    credit_link.click()
    expect(page).to_have_url("http://localhost:3001/credit")
    expect(page.get_by_role("heading", name="Kredi Hesaplama Aracı")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/credit-page.png")

    # 3. Verify Savings page
    page.goto("http://localhost:3001")
    savings_link = page.get_by_role("link", name="Tasarruf Planlayıcı")
    savings_link.click()
    expect(page).to_have_url("http://localhost:3001/savings")
    expect(page.get_by_role("heading", name="Tasarruf Planlayıcı")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/savings-page.png")