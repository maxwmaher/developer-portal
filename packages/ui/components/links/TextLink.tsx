import { HStack, Heading, HeadingProps, Link, LinkProps, Text, TextProps } from '@chakra-ui/react';
import { mdiArrowRight } from '@mdi/js';
import Icon from '@mdi/react';

type TextLinkProps = TextProps &
  HeadingProps &
  LinkProps & {
    href?: string;
    text: string;
    hideIcon?: boolean;
    isHeading?: boolean;
  };

export const TextLink = ({ href, text, isHeading, hideIcon = false, ...rest }: TextLinkProps) => {
  if (isHeading)
    return (
      <Heading size="lg" {...rest}>
        <TextWithLink href={href} text={text} hideIcon={hideIcon} />
      </Heading>
    );

  return (
    <Text {...rest}>
      <TextWithLink href={href} text={text} hideIcon={hideIcon} />
    </Text>
  );
};

const TextWithLink = ({ href, text, hideIcon }: TextLinkProps) => (
  <HStack as={'span'}>
    <Link href={href} color={'primary'} fontWeight={'semibold'}>
      {text}
    </Link>
    {!hideIcon && <Icon path={mdiArrowRight} size={0.8} />}
  </HStack>
);
