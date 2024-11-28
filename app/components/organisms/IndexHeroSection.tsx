import { Box, Container, Group, Image, Text } from '@mantine/core';
import { Link } from '@remix-run/react';

import { GitHubIcon, LinkedInIcon } from '~/components/atoms/Icon';

import styles from './IndexHeroSection.module.css';

export const IndexHeroSection = () => {
  return (
    <Container classNames={{ root: styles.root }}>
      <Box>
        <Image
          src="/images/avatar.jpg"
          alt="Profile Picture"
          classNames={{ root: styles.profilePictureImage }}
        />
      </Box>

      <Box className={styles.titleWrapper}>
        <Text classNames={{ root: styles.title }}>
          Software engineer, designer, and amateur photographer.
        </Text>

        <Text c="dimmed" classNames={{ root: styles.subtitle }}>
          I’m Irving, a software engineer and designer based in Ho Chi Minh
          City. Beside the full-time job at Axon, I’m also the co-founder of a
          small studio, where we develop apps that help regular people to enjoy
          the technology on their own terms.
        </Text>
      </Box>

      <Box className={styles.socialIconsWrapper}>
        <Group gap="md">
          <Link
            to="https://linkedin.com/in/irvingdinh"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon className={styles.socialIcon} />
          </Link>

          <Link
            to="https://github.com/irvingdinh"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon className={styles.socialIcon} />
          </Link>
        </Group>
      </Box>
    </Container>
  );
};
