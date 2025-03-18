import { isEmpty } from "lodash";
import { Box, Container, Heading, Text, Skeleton } from "@chakra-ui/react";

export function HeroSkeleton() {
  return <Skeleton height="580px" />;
}

function Hero({
  className,
  kicker,
  title,
  content,
  color,
  bgColor,
  bgImage,
  ...props
}: {
  className: string;
  kicker: string;
  title: string;
  content: string;
  color: string;
  bgColor: string;
  bgImage: { url: string };
}) {
  return (
    <Box
      as="section"
      className={`wp-resources-pro-hero ${className}`}
      position="relative"
      p="80px 30px"
      backgroundColor={bgColor ? bgColor : "gray.100"}
      backgroundImage={!isEmpty(bgImage) ? bgImage.url : undefined}
      bgRepeat="no-repeat"
      bgPosition="center"
      bgSize="cover"
      {...props}
    >
      <Container className="wp-resources-pro-hero__container" maxW="1440px">
        <Box
          className="wp-resources-pro-hero__row"
          display={["block", "block", "flex"]}
          alignItems="center"
        >
          <Box
            className="wp-resources-pro-hero__col"
            flexBasis="50%"
            maxW="600px"
          >
            {kicker && (
              <Text
                className="wp-resources-pro-hero__kicker"
                color={color ? color : "#222222"}
                fontSize={["22px", "28px", "32px"]}
                fontWeight={300}
                m={0}
              >
                {kicker}
              </Text>
            )}

            {title && (
              <Heading
                as="h1"
                className="wp-resources-pro-hero__title"
                color={color ? color : "#222222"}
                fontSize={["40px", "50px", "60px"]}
                fontWeight={700}
                m="0 0 1rem"
              >
                {title}
              </Heading>
            )}

            {content && (
              <Box
                className="wp-resources-pro-hero__content"
                color={color ? color : "#222222"}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;
