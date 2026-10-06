import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test.describe('Language Switching', () => {
    test('switches the homepage language using URL', async ({ page }) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', {
          name: 'Find your next stay',
        }),
      ).toBeVisible();

      await page.goto('/fr');

      await expect(
        page.getByRole('heading', {
          name: 'Trouvez votre prochain séjour',
        }),
      ).toBeVisible();
    });

    test('switches language from English to French using URL', async ({ page }) => {
      await page.goto('/about');

      await expect(page.getByText('Welcome to our About page', { exact: false })).toBeVisible();

      await page.goto('/fr/about');

      await expect(
        page.getByText('Bienvenue sur notre page À propos', { exact: false }),
      ).toBeVisible();
    });
  });
});
