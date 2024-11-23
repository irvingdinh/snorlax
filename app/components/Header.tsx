import { ActionIcon, Box, Button, Container, Group, Text } from '@mantine/core';
import { Link, useLocation } from '@remix-run/react';

import { GitHubIcon, LinkedInIcon } from '~/components/Icon';

import styles from './Header.module.css';

export const Header = () => {
  return (
    <Box className={styles.HeaderRoot}>
      <Container fluid style={{ position: 'relative', width: '100%' }}>
        <Group justify="space-between">
          <Box>
            <Text component={Link} to="/" fw="900">
              Irving Dinh
            </Text>
          </Box>

          <Group display={{ base: 'none', md: 'flex' }} gap="xs">
            <ActionIcon
              component={Link}
              to="https://linkedin.com/in/irvingdinh"
              target="_blank"
              variant="subtle"
              color="gray"
              aria-label="My LinkedIn profile"
              size="lg"
            >
              <LinkedInIcon style={{ width: '70%', height: '70%' }} />
            </ActionIcon>

            <ActionIcon
              component={Link}
              to="https://github.com/irvingdinh"
              target="_blank"
              variant="subtle"
              color="gray"
              aria-label="My GitHub profile"
              size="lg"
            >
              <GitHubIcon style={{ width: '70%', height: '70%' }} />
            </ActionIcon>
          </Group>
        </Group>

        <Box
          display={{ base: 'none', md: 'flex' }}
          className={styles.LinksContainer}
        >
          <Group gap="xs">
            <LinkItem to="/about" label="About" />
            <LinkItem to="/tools" label="Tools" />
          </Group>
        </Box>
      </Container>
    </Box>
  );
};

const LinkItem = ({ to, label }: { to: string; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Button
      component={Link}
      to={to}
      variant={isActive ? 'light' : 'subtle'}
      color="gray"
      p="xs"
      size="sm"
    >
      {label}
    </Button>
  );
};
