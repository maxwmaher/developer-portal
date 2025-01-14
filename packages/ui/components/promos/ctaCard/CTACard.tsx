import { Button, Card, CardBody, Heading, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { mdiArrowRight } from '@mdi/js';
import { Icon } from '@mdi/react';
import NextLink from 'next/link';
import { ButtonLink } from 'ui/components/links/ButtonLink';
import { CTACardProps } from './types';

export const CTACard = ({ description, href, linkText, title, link2Text, link2href }: CTACardProps): JSX.Element => (
  <Card variant="filled" size={'lg'}>
    <CardBody>
      <Heading as="h2" mb={4} fontSize={'5xl'}>
        {title}
      </Heading>
      <Text variant={'large'} mb={6}>
        {description}
      </Text>
      <Button size={'lg'} variant={'solid'} rightIcon={<Icon path={mdiArrowRight} size={0.8} />}>
        <Link href={href} as={NextLink} color={useColorModeValue('white', 'black !important')}>
          {linkText}
        </Link>
      </Button>

      {link2href && link2Text && <ButtonLink href={link2href} text={link2Text} size={'xl'} />}
    </CardBody>
  </Card>
);
