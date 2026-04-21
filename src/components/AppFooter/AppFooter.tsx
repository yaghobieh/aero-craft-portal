import { Flex, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { AEROCRAFT_GITHUB_URL, AEROCRAFT_VERSION } from '@const/routes.const';

export function AppFooter() {
  const { t } = useI18n();
  return (
    <Flex direction="row" align="center" justify="between" className="ac-app-footer">
      <Typography variant="caption" color="muted" className="ac-app-footer-meta">
        {t.footer.partOf}
      </Typography>
      <Flex direction="row" align="center" gap={3}>
        <a href={`${AEROCRAFT_GITHUB_URL}/blob/main/CHANGELOG.md`} className="ac-app-footer-link" target="_blank" rel="noreferrer">
          <Typography variant="caption" color="muted">{t.footer.changelogLink}</Typography>
        </a>
        <Typography variant="caption" color="muted" className="ac-app-footer-meta">
          MIT · AeroCraft v{AEROCRAFT_VERSION}
        </Typography>
      </Flex>
    </Flex>
  );
}
