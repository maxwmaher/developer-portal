import { Flex, FlexProps } from '@chakra-ui/react';

export const ContentSection = (props: FlexProps) => (
  <Flex
    as="section"
    id="contentSection"
    direction="column"
    alignItems="center"
    justifyContent="flex-start"
    color="black"
    _dark={{
      color: 'white',
    }}
    transition="all 0.15s ease-out"
    {...props}
  />
);
