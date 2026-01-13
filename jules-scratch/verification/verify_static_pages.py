from playwright.sync_api import Page, expect

def test_verify_static_pages(page: Page):
    """
    This test verifies the static HTML pages served by the Python web server.
    It navigates to each page using http://localhost:8080 and takes a screenshot.
    """

    base_url = "http://localhost:8080"

    # 1. Verify Home page
    page.goto(f"{base_url}/index.html")
    expect(page.get_by_role("heading", name="Finansal Geleceğinize Yön Verin")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/home-page.png")

    # 2. Verify Credit page
    page.goto(f"{base_url}/credit.html")
    expect(page.get_by_text("İhtiyaç Kredisi Tutarı")).to_be_visible()
    page.get_by_role("button", name="Yeniden Hesapla").click()
    page.screenshot(path="jules-scratch/verification/credit-page.png")

    # 3. Verify Savings page
    page.goto(f"{base_url}/savings.html")
    expect(page.get_by_role("heading", name="Tasarruf Planlayıcı")).to_be_visible()
    page.get_by_role("button", name="Hesapla").click()
    page.screenshot(path="jules-scratch/verification/savings-page.png")